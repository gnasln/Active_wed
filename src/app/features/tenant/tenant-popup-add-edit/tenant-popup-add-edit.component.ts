import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalComponent, NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { createTenantModel } from '../../../core/model/tenant.model';
import moment from 'moment';
import { TenantService } from '../../../core/api/tenant.service';
import { Store } from '@ngrx/store';
import { loadTenant } from '../../../store/Tenant.action';
import { PopupAddMemberComponent } from './popup-add-member/popup-add-member.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tenant-popup-add-edit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzModalComponent,
    NzModalModule,
    NzIconModule,
    NzRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInput,
    MatLabel,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    PopupAddMemberComponent,
  ],
  templateUrl: './tenant-popup-add-edit.component.html',
  styleUrl: './tenant-popup-add-edit.component.scss'
})
export class TenantPopupAddEditComponent implements OnInit{
  @Input() isVisiblePopUpCreateOrgnization: boolean = true;
  @Input() idTenant: any = '';
  @Output() visiblePopUpCreateOrgnization = new EventEmitter<boolean>();
  @Output() tenantCreated = new EventEmitter<any>(); 
  @Output() tenantUpdated = new EventEmitter<any>(); 

  listMember: any = [];
  listMemberName: any = [];
  isConfirmLoading = false;
  _store = inject(Store);
  today: any = '';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private tenantService: TenantService,
    private message: NzMessageService,
  ) {
    this.today = new Date();
  }
  ngOnInit(): void {
    if (this.idTenant) {
      this.getDetailTenant();
    }
  }

  public form: FormGroup = this.fb.group({
    tenantTitle: [null, Validators.required],
    member: [null, Validators.required],
    description: [null],
  });

  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );

  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  handleDataPopUpAddMember(e: any) {
    if (!e || !e.members || !e.membersName) {
      console.error('Invalid member data received');
      return;
    }

    this.visiblePopUpAddMember = e.isVisible;
    
    // Ensure we have matching arrays
    const members = e.members || [];
    const memberNames = e.membersName || [];
    
    if (members.length !== memberNames.length) {
      console.error('Mismatch between members and member names');
      return;
    }

    this.form.patchValue({
      member: members.map((memberId: any, index: number) => ({
        memberId: memberId,
        memberName: memberNames[index]
      })),
    });

    this.listMemberName = memberNames;
    this.listMember = members.map((memberId: any) => ({
      member: memberId,
      img: '../../../../assets/img/avatar.png',
    }));
    
    this.cdr.detectChanges();
  }
  handleOpenPopUpAddMember() {
    this.visiblePopUpAddMember = true;
  }

  getDetailTenant(){
    this.tenantService.getDetailTenant(this.idTenant).subscribe(res => {
      if (res && res.data) {
        this.form.patchValue({
          tenantTitle: res.data.name,
          description: res.data.description
        });

        if (res.data.memberNames && res.data.memberIds) {
          this.listMemberName = res.data.memberNames;
          this.listMember = res.data.memberIds.map((memberId: any) => ({
            member: memberId,
            img: '../../../../assets/img/avatar.png',
          }));
        // Cập nhật dataMember để truyền vào component con
        this.dataMember = this.listMember.map((member: any, index: number) => ({
          userId: res.data.memberIds[index],
          userName: res.data.memberNames[index]
        }));
        }
        
        this.cdr.detectChanges();
      }
    })
  }

  handleOk(): void {
    // Kiểm tra form hợp lệ trước khi submit
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity();
        }
      });
      this.message.error(this.translate.instant('Toast.checkRequiredFields'));
      return;
    }

    this.isConfirmLoading = true;
    const body: createTenantModel = {
      name: this.form.get('tenantTitle')?.value,
      description: this.form.get('description')?.value,
      memberIds: this.listMember.map((member: any) => member.member),
      memberNames: this.listMemberName
    };
    if (this.idTenant) {
      body['id'] = this.idTenant;
      body['owner'] = this.userInfor.sub;
      body['ownerName'] = this.userInfor.name;
    }
    if (this.idTenant) {
      this.tenantService.updateTenant(body).subscribe({
        next: (data) => {
          this.tenantUpdated.emit(data.data);
          this.visiblePopUpCreateOrgnization.emit(false);
          this.message.success('Cập nhật thành công!');
        },
        error: () => {
          this.message.error('Cập nhật thất bại!');
        },
        complete: () => {
          this.isConfirmLoading = false;
        }
      });
    } else {
      this.tenantService.createTenant(body).subscribe({
        next: (data) => {
          this.tenantCreated.emit(data.data); 
          this.visiblePopUpCreateOrgnization.emit(false);
          this.message.success('Tạo mới  thành công!');
        },
        error: () => {
          this.message.error('Tạo mới thất bại!');
        },
        complete: () => {
          this.isConfirmLoading = false;
        }
      });
    }
  }

  handleCancel(): void {
    this.visiblePopUpCreateOrgnization.emit(false);
  }
}

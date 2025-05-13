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
    console.log('Received data from popup-add-member:', e);
    if (!e) {
      console.error('No data received from popup');
      return;
    }

    this.visiblePopUpAddMember = e.isVisible;
    
    // Kiểm tra dữ liệu thành viên nhận được
    const members = e.members || [];
    const memberNames = e.membersName || [];
    
    if (members.length !== memberNames.length) {
      console.error('Mismatch between members and member names');
      return;
    }

    // Cập nhật form 
    this.form.patchValue({
      member: members
    });

    // Cập nhật danh sách thành viên
    this.listMemberName = memberNames;
    this.listMember = members.map((memberId: any, index: number) => ({
      member: memberId,
      img: '../../../../assets/img/avatar.png',
    }));
    
    this.cdr.detectChanges();
  }
  handleOpenPopUpAddMember() {
    this.visiblePopUpAddMember = true;
  }

  logFormValue() {
    console.log('Current form values:', {
      tenantTitle: this.form.get('tenantTitle')?.value,
      description: this.form.get('description')?.value
    });
  }

  getDetailTenant(){
    console.log('Getting tenant details for ID:', this.idTenant);
    this.tenantService.getDetailTenant(this.idTenant).subscribe(res => {
      console.log('Tenant detail response from API:', res);
      if (res && res.data) {
        console.log('Setting form values from API response:', {
          name: res.data.name,
          description: res.data.description
        });
        this.form.patchValue({
          tenantTitle: res.data.name,
          description: res.data.description
        });
        // Cập nhật danh sách thành viên
        if (res.data.memberNames && res.data.memberIds) {
          this.listMemberName = res.data.memberNames;
          this.listMember = res.data.memberIds.map((memberId: any) => ({
            member: memberId,
            img: '../../../../assets/img/avatar.png',
          }));
          
          // Cập nhật dataMember để truyền cho popup-add-member
          this.dataMember = res.data.memberIds.map((memberId: any, index: number) => ({
            userId: memberId,
            userName: res.data.memberNames[index]
          }));
        }
      }
    })
  }

  handleOk(): void {
    // Kiểm tra form hợp lệ
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

    // Log giá trị form trước khi gửi đi
    console.log('Form values before submission:', {
      tenantTitle: this.form.get('tenantTitle')?.value,
      description: this.form.get('description')?.value,
      memberList: this.listMember,
      memberNames: this.listMemberName
    });

    this.isConfirmLoading = true;
    
    // Xây dựng body request một cách rõ ràng
    const tenantName = this.form.get('tenantTitle')?.value;
    const description = this.form.get('description')?.value;
    const memberIds = this.listMember.map((member: any) => member.member);

    // Đảm bảo giá trị đúng trước khi gửi
    console.log('Tenant name to be sent:', tenantName);
    
    const body: createTenantModel = {
      name: tenantName,
      tenantTitle: tenantName,
      description: description,
      memberIds: memberIds,
      memberNames: this.listMemberName
    };

    console.log('Request body being sent to API:', body);

    if (this.idTenant) {
      body['id'] = this.idTenant;
      body['owner'] = this.userInfor.sub;
      body['ownerName'] = this.userInfor.name;
      
      // Gọi API cập nhật
      this.tenantService.updateTenant(body).subscribe({
        next: (data) => {
          console.log('Response from updateTenant API:', data);
          
          // Kiểm tra xem tên đã được cập nhật trong response chưa
          if (data.data && data.data.name !== tenantName) {
            console.warn('API response contains old name! Expected:', tenantName, 'Got:', data.data.name);
            
            // Giải pháp tạm thời: Gán trực tiếp tên vào dữ liệu trả về từ API
            data.data.name = tenantName;
          }
          
          // Thực hiện làm mới dữ liệu
          this.tenantUpdated.emit(data.data);
          this.visiblePopUpCreateOrgnization.emit(false);
          this.message.success('Cập nhật thành công!');
          
          // Giải pháp thay thế: Làm mới dữ liệu tenant sau khi cập nhật
          this._store.dispatch(loadTenant());
          
          // Kiểm tra lại dữ liệu sau khi cập nhật
          setTimeout(() => {
            this.tenantService.getDetailTenant(this.idTenant).subscribe(res => {
              console.log('Verification - tenant detail after update:', res);
              if (res && res.data && res.data.name !== tenantName) {
                console.error('Verification failed: Tenant name not updated in database!');
              }
            });
          }, 1000);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật tenant:', err);
          this.message.error('Cập nhật thất bại!');
        },
        complete: () => {
          this.isConfirmLoading = false;
        }
      });
    } else {
      // Thêm thông tin owner cho tenant mới
      body['owner'] = this.userInfor.sub;
      body['ownerName'] = this.userInfor.name;
      
      // Gọi API tạo mới tenant
      this.tenantService.createTenant(body).subscribe({
        next: (data) => {
          console.log('Response from createTenant API:', data);
          
          // Thực hiện làm mới dữ liệu
          this.tenantCreated.emit(data.data);
          this.visiblePopUpCreateOrgnization.emit(false);
          this.message.success('Thêm tổ chức thành công!');
          
          // Làm mới dữ liệu tenant sau khi tạo mới
          this._store.dispatch(loadTenant());
        },
        error: (err) => {
          console.error('Lỗi khi tạo tenant:', err);
          this.message.error('Thêm tổ chức thất bại!');
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

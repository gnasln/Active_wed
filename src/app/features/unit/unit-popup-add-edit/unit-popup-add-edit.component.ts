import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PopupAddMemberComponent } from './popup-add-member/popup-add-member.component';
import {
  createUnitModel,
  updateUnitModel,
} from '../../../core/model/unit.model';
import { unitService } from '../../../core/api/unit.service';
import moment from 'moment';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Store } from '@ngrx/store';
import { loadUnits, loadUnitsSuccess } from '../../../store/Unit.action';
import { UnitPopupAddEditSubComponent } from '../unit-popup-add-edit-sub/unit-popup-add-edit-sub.component';
import { UnitPopupSubListComponent } from '../unit-popup-sub-list/unit-popup-sub-list.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-unit-popup-add-edit',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    NzRadioModule,
    FormsModule,
    CommonModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    PopupAddMemberComponent,
    NzButtonModule,
    NzPopconfirmModule,
    UnitPopupAddEditSubComponent,
    UnitPopupSubListComponent,
  ],
  templateUrl: './unit-popup-add-edit.component.html',
  styleUrl: './unit-popup-add-edit.component.scss',
})
export class UnitPopupAddEditComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() viewDetailUnit: boolean = false;
  @Input() idUnit: any;
  @Input() idTenant: any;
  @Input() idTaskDetail: any;
  @Input() idParentUnit: any;

  @Input() selectedTenant: any = null;
  @Input() selectedUnit: any = null;
  @Output() visibleList = new EventEmitter<boolean>();
  @Output() unitCreated = new EventEmitter<any>(); 
  @Output() unitChilCreated = new EventEmitter<any>(); 
  @Output() unitUpdated = new EventEmitter<any>(); 
  @Output() unitDeleted = new EventEmitter<any>();
  public updatedMemberChecked: any[] = [];
  deleteSuccess: string;
  updateSuccess: string;
  createSuccess: string;
  isConfirmLoading = false;
  _snackBar = inject(SnackbarService);
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private unitService: unitService,
    private translate: TranslateService,
    private message: NzMessageService,
  ) {}
  ngOnInit(): void {
    this.translate
      .get('Toast.createSuccess')
      .subscribe((value) => (this.createSuccess = value));
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.createSuccess')
        .subscribe((value) => (this.createSuccess = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));
    });
    if (this.idUnit && this.viewDetailUnit === true) {
      this.getDetailUnit();
    }
    this.getMemberOfUnit();
  }
  public form: FormGroup = this.fb.group({
    unitTitle: [null, Validators.required],
    member: [null, Validators.required],
    description: [null],
  });
  _store = inject(Store);
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );

  handleUnitIdDetail(idUnit: any): void {
    this.idParentUnit = idUnit;
  }

  handleOk(): void {
    // Kiểm tra form hợp lệ
    if (this.form.invalid) {
      console.log('Form validation failed:', this.form.errors);
      
      // Đánh dấu tất cả control là touched để hiển thị lỗi
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      
      // Thông báo lỗi
      this.message.error(this.translate.instant('Toast.checkRequiredFields'));
      return;
    }
    
    console.log('Creating unit with form values:', this.form.value);
    console.log('Member list before processing:', this.listMember);
    
    // Đảm bảo có thành viên
    if (!this.listMember || this.listMember.length === 0) {
      console.error('No members selected');
      this.message.error('Vui lòng thêm thành viên');
      return;
    }

    this.isConfirmLoading = true;
    
    // Xử lý memberIds để đảm bảo là chuỗi GUID đơn giản, không phải object
    let memberIds;
    try {
      memberIds = this.listMember.map((member: any) => {
        // Kiểm tra nếu member.member là object
        if (typeof member.member === 'object' && member.member !== null) {
          // Lấy userId từ object
          return member.member.userId || member.member.id || '';
        }
        // Nếu đã là string, trả về trực tiếp
        return member.member;
      });
      
      // Lọc ra các chuỗi không rỗng
      memberIds = memberIds.filter((id: string) => id && id.trim() !== '');
      
      console.log('Processed memberIds:', memberIds);
    } catch (error) {
      console.error('Error processing memberIds:', error);
      memberIds = [];
    }
    
    const body: createUnitModel = {
      name: this.form.get('unitTitle')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      managerId: this.userInfor?.sub,
      managerName: this.userInfor?.name,
      tenantId: this.idTenant,
      ...(this.idParentUnit && { parentUnitId: this.idParentUnit }),
      memberIds: memberIds,
      memberNames: this.listMemberName
    };
    
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0 || 
         (Array.isArray(body[key]) && body[key].length === 0)) {
        delete body[key];
      }
    });
    
    console.log('Sending unit creation request with body:', body);
    
    this.unitService.createUnit(body).subscribe({
      next: (data) => {
        console.log('Unit creation response:', data);
        
        if (!data || !data.data) {
          console.error('Invalid response from server');
          this.message.error('Lỗi khi tạo đơn vị: Phản hồi không hợp lệ từ máy chủ');
          this.isConfirmLoading = false;
          return;
        }
        
        // Emit event based on whether this is a parent or child unit
        if (this.idParentUnit) {
          console.log("Creating child unit for parent:", this.idParentUnit);
          this.unitChilCreated.emit(data.data);
        } else {
          console.log("Creating parent unit for tenant:", this.idTenant);
          this.unitCreated.emit(data.data);
        }
        
        this.visibleList.emit(false);
        this.message.success('Tạo đơn vị thành công!');
        this._store.dispatch(loadUnits());
      },
      error: (err) => {
        console.error('Error creating unit:', err);
        this.message.error('Lỗi khi tạo đơn vị: ' + (err.error?.message || err.message || 'Lỗi không xác định'));
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleList.emit(false);
  }
  statusList = [
    {
      label: 'Status 1',
      value: 1,
    },
    {
      label: 'Status 2',
      value: 2,
    },
    {
      label: 'Status 3',
      value: 3,
    },
  ];
  

  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  handleDataPopUpAddMember(e: any) {
    this.visiblePopUpAddMember = e.isVisible;
    this.form.patchValue({
      member: e.members.map((member: any) => ({
        memberId: member.userId,
        memberName: member.userName,
      })),
    });
    this.listMemberName = e.membersName;
    this.listMember = e.members.map((member: any) => ({
      member,
      img: '../../../../assets/img/avatar.png',
    }));
    this.cdr.detectChanges();
  }


  
  handleOpenPopUpAddMember() {
    this.visiblePopUpAddMember = true;
    // this.dataMember = this.form.get('member')?.value;
  }

  // handleEditUnit(e: any) {
  //   this.visiblePopUpAddMember = true;
  //   this.cdr.detectChanges();
  // }

  listMember: any = [];
  listMemberName = [];

  @ViewChildren('member') components: QueryList<UnitPopupAddEditComponent>;
  public memberCount: number;
  ngAfterViewChecked(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount = this.listMember.length - 4;
    this.cdr.detectChanges();
  }

  handleDeleteUnit() {
    this.unitService.deleteUnit(this.idUnit).subscribe(() => {
      this._snackBar.success(this.deleteSuccess);
      this.unitDeleted.emit(this.idUnit); 
      this._store.dispatch(loadUnits());
      this.visibleList.emit(false);
    });
  }
  handleEditUnit() {
    // Kiểm tra form hợp lệ
    if (this.form.invalid) {
      console.log('Form validation failed:', this.form.errors);
      
      // Đánh dấu tất cả control là touched để hiển thị lỗi
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      
      // Thông báo lỗi
      this.message.error(this.translate.instant('Toast.checkRequiredFields'));
      return;
    }
    
    console.log('Updating unit with form values:', this.form.value);
    
    // Xử lý memberIds để đảm bảo là chuỗi GUID đơn giản, không phải object
    let memberUnitIds;
    try {
      if (this.updatedMemberChecked.length > 0) {
        memberUnitIds = this.updatedMemberChecked.map((member: any) => member.userId);
      } else {
        memberUnitIds = this.listMember.map((member: any) => {
          // Kiểm tra nếu member.member là object
          if (typeof member.member === 'object' && member.member !== null) {
            // Lấy userId từ object
            return member.member.userId || member.member.id || '';
          }
          // Nếu đã là string, trả về trực tiếp
          return member.member;
        });
      }
      
      // Lọc ra các chuỗi không rỗng
      memberUnitIds = memberUnitIds.filter((id: string) => id && id.trim() !== '');
      
      console.log('Processed memberUnitIds:', memberUnitIds);
    } catch (error) {
      console.error('Error processing memberUnitIds:', error);
      memberUnitIds = [];
    }

    this.isConfirmLoading = true;
    
    const body: any = {
      id: this.idUnit,
      name: this.form.get('unitTitle')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      managerId: this.userInfor?.sub,
      managerName: this.userInfor?.name,
      tenantId: this.idTenant,
      ...(this.idParentUnit && { parentUnitId: this.idParentUnit }),
      memberUnitIds: memberUnitIds,
      memberUnitNames: this.updatedMemberChecked.length > 0 
        ? this.updatedMemberChecked.map((member: any) => member.userName)
        : this.listMemberName 
    };
    
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0 || 
         (Array.isArray(body[key]) && body[key].length === 0)) {
        delete body[key];
      }
    });
    
    console.log('Sending unit update request with body:', JSON.stringify(body));
    
    this.unitService.updateUnit(body).subscribe({
      next: (data) => {
        console.log('Unit update response:', data);
        
        if (!data || !data.data) {
          console.error('Invalid response from server');
          this.message.error('Lỗi khi cập nhật đơn vị: Phản hồi không hợp lệ từ máy chủ');
          this.isConfirmLoading = false;
          return;
        }
        
        // Emit event based on whether this is a parent or child unit
        if (this.idParentUnit && this.idUnit) {
          console.log("Updating child unit for parent:", this.idParentUnit);
          this.unitChilCreated.emit(data.data);
        } else {
          console.log("Updating parent unit:", this.idUnit);
          this.unitUpdated.emit(data.data);
        }
        
        this.message.success(this.translate.instant('Toast.updateSuccess'));
        
        // Đảm bảo cập nhật state trong Redux store
        this._store.dispatch(loadUnits());
        
        // Đóng popup
        this.visibleList.emit(false);
        
        // Đảm bảo UI được cập nhật
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 100);
      },
      error: (err) => {
        console.error('Error updating unit:', err);
        this.message.error('Lỗi khi cập nhật đơn vị: ' + (err.error?.message || err.message || 'Lỗi không xác định'));
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false;
      }
    });
  }

  getDetailUnit() {
    this.unitService.getDetailUnit(this.idUnit).subscribe((data) => {
      if(data && data.data){
        this.form.patchValue({
          unitTitle: data?.data.name,
          description: data?.data.description,
        });
        if (data.data.memberUnitNames && data.data.memberUnitIds) {
          this.listMemberName = data.data.memberUnitNames;
          this.listMember = data.data.memberUnitIds.map((memberId: any) => ({
            member: memberId,
            img: '../../../../assets/img/avatar.png',
          }));
        // Cập nhật dataMember để truyền vào component con
        this.dataMember = this.listMember.map((member: any, index: number) => ({
          userId: data.data.memberUnitIds[index],
          userName: data.data.memberUnitNames[index]
        }));
        }
        this.cdr.detectChanges();
      }
    });
  }
  getMemberOfUnit() {
    const body = { unitId: this.idUnit };
    this.unitService.getMember(body).subscribe((data) => {
      this.dataMember = data;
      this.form.patchValue({
        member: this.dataMember,
      });
      this.listMember = this.form.get('member')?.value.map((member: any) => ({
        member,
        img: '../../../../assets/img/avatar.png',
      }));
      this.cdr.detectChanges();
    });
  }

  visiblePopUpSubTaskList: boolean = false;
  handlevisiblePopUpSubTaskList(e: any) {
    this.visiblePopUpSubTaskList = e;
  }
  handleOpenPopUpSubTaskList(e: any) {
    console.log("22: ", e)
    this.visiblePopUpSubTaskList = true;
  }

  onMemberCheckedChange(updatedMembers: any[]) {
    this.updatedMemberChecked = updatedMembers;
  }
}

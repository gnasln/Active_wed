import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { PopupAddMemberComponent } from '../../unit/unit-popup-add-edit/popup-add-member/popup-add-member.component';
import { KeyResultService } from '../../../core/api/key-result.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import moment from 'moment';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-popup-add-edit-key-result',
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
    NzPopconfirmModule,
  ],
  templateUrl: './popup-add-edit-key-result.component.html',
  styleUrl: './popup-add-edit-key-result.component.scss',
})
export class PopupAddEditKeyResultComponent implements OnInit, OnChanges{
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() objectId: any;
  @Input() keyResultId: any = null;
  @Output() visiblePopUpAddEditKeyResult = new EventEmitter<boolean>();
  @Output() keyResultCreated = new EventEmitter<any>();
  @Output() keyResultUpdated = new EventEmitter<any>();
  @Output() keyResultDeleted = new EventEmitter<any>();
  isConfirmLoading = false;
  isDeleteLoading = false;
  priorityLevelHigh: string;
  priorityLevelMedium: string;
  priorityLevelLow: string;
  priorityLevelList: any = [];
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private keyResultService: KeyResultService,
    private message: NzMessageService,
  ) {}
  
  // Phát hiện khi keyResultId thay đổi để load dữ liệu
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges detected:", changes);
    
    // Nếu keyResultId thay đổi và có giá trị
    if (changes['keyResultId'] && changes['keyResultId'].currentValue && this.form) {
      console.log("keyResultId changed to:", changes['keyResultId'].currentValue);
      this.loadKeyResultDetails();
    }
    
    // Nếu isVisible thay đổi sang true, đảm bảo form được reset đúng cách
    if (changes['isVisible'] && changes['isVisible'].currentValue === true && !this.keyResultId) {
      console.log("Popup became visible, resetting form");
      this.form?.reset({
        scale: null,
        description: '',
        member: null,
        priorityLevel: null,
        deadline: null,
      });
    }
  }

  handleOk(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.createKeyResult();
  }

  createKeyResult() {
    const body = {
      title: this.form.get('scale')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      dueDate: this.form.get('deadline')?.value,
      objectTBId: this.objectId,
      memberIds: this.listMember.length ? this.listMember.map((member: any) => member.member) : [],
      memberNames: this.listMemberName
    }
    this.isConfirmLoading = true;
    this.keyResultService.createKeyResult(body).subscribe({
      next: (res: any) => {
        if(res.data) {
          this.keyResultCreated.emit(res.data);
          this.visiblePopUpAddEditKeyResult.emit(false);
          this.message.success(this.translate.instant('Toast.createSuccess'));
        }
      },
      error: (err: any) => {
        this.message.error(err);
      },
      complete: () => {
        this.isConfirmLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.visiblePopUpAddEditKeyResult.emit(false);
  }

  ngOnInit(): void {
    console.log("PopupAddEditKeyResult initialized with keyResultId:", this.keyResultId);
    console.log("ObjectId:", this.objectId);
    
    this.initForm();

    this.translate
      .get('PopUpAddEditObject.priorityHigh')
      .subscribe((value) => (this.priorityLevelHigh = value));
    this.translate
      .get('PopUpAddEditObject.priorityMedium')
      .subscribe((value) => (this.priorityLevelMedium = value));
    this.translate
      .get('PopUpAddEditObject.priorityLow')
      .subscribe((value) => (this.priorityLevelLow = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('PopUpAddEditObject.priorityHigh')
        .subscribe((value) => (this.priorityLevelHigh = value));
      this.translate
        .get('PopUpAddEditObject.priorityMedium')
        .subscribe((value) => (this.priorityLevelMedium = value));
      this.translate
        .get('PopUpAddEditObject.priorityLow')
        .subscribe((value) => (this.priorityLevelLow = value));
    });
    this.priorityLevelList = [
      {
        label: this.priorityLevelHigh,
        value: 1,
      },
      {
        label: this.priorityLevelMedium,
        value: 2,
      },
      {
        label: this.priorityLevelLow,
        value: 3,
      },
    ];

    // Load key result data if in edit mode
    if (this.keyResultId) {
      console.log("About to load key result details for ID:", this.keyResultId);
      this.loadKeyResultDetails();
    } else {
      console.log("Not loading key result details, no ID provided");
    }
    
    this.cdr.detectChanges();
  }

  initForm() {
    this.form = this.fb.group({
      scale: [null, Validators.required],
      description: [''],
      member: [null],
      priorityLevel: [null],
      deadline: [null, Validators.required],
    });
  }

  // Load key result details for editing
  loadKeyResultDetails() {
    console.log("Loading key result details for ID:", this.keyResultId);
    console.log("Object ID:", this.objectId);
    
    this.keyResultService.getKeyResultDetail(this.keyResultId).subscribe({
      next: (res: any) => {
        console.log("Response from getKeyResultDetail:", res);
        if (res.data) {
          const keyResultData = res.data;
          console.log("Key Result Data:", keyResultData);
          
          this.form.patchValue({
            scale: keyResultData.title,
            description: keyResultData.description,
            deadline: keyResultData.dueDate ? new Date(keyResultData.dueDate) : null
          });
          
          // Update member list if available
          if (keyResultData.memberIds && keyResultData.memberIds.length > 0) {
            this.listMember = keyResultData.memberIds.map((memberId: any) => ({
              member: memberId,
              img: '../../../../assets/img/avatar.png',
            }));
            this.listMemberName = keyResultData.memberNames || [];
          }
          
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        console.error("Error loading key result details:", err);
        this.message.error('Không thể tải thông tin kết quả chính');
      }
    });
  }

  // Edit key result implementation
  handleEditKeyResult(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    
    if (!this.keyResultId) {
      this.message.error('Không thể xác định kết quả chính cần sửa');
      return;
    }
    
    const body: any = {
      id: this.keyResultId,
      title: this.form.get('scale')?.value,
      description: this.form.get('description')?.value,
      objectTBId: this.objectId,
      dueDate: this.form.get('deadline')?.value ? moment(this.form.get('deadline')?.value).format('YYYY-MM-DD') : null,
      memberIds: this.listMember.length ? this.listMember.map((member: any) => member.member) : [],
      memberNames: this.listMemberName
    };

    this.isConfirmLoading = true;
    
    this.keyResultService.updateKeyResult(body).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.message.success('Cập nhật kết quả chính thành công!');
          this.keyResultUpdated.emit(res.data);
          this.visiblePopUpAddEditKeyResult.emit(false);
        }
      },
      error: (err: any) => {
        this.message.error(err?.error?.message || 'Có lỗi xảy ra khi cập nhật kết quả chính');
      },
      complete: () => {
        this.isConfirmLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Delete key result implementation
  handleDelete(): void {
    if (!this.keyResultId) {
      this.message.error('Không thể xác định kết quả chính cần xóa');
      return;
    }

    this.isDeleteLoading = true;
    this.keyResultService.deleteKeyResult(this.keyResultId).subscribe({
      next: (res: any) => {
        // Hiển thị thông báo thành công và đóng modal
        this.message.success('Xóa kết quả chính thành công!');
        
        // Emit sự kiện xóa với ID của key result để parent component cập nhật danh sách
        this.keyResultDeleted.emit(this.keyResultId);
        
        // Đóng popup
        this.visiblePopUpAddEditKeyResult.emit(false);
      },
      error: (err: any) => {
        console.error("Error deleting key result:", err);
        this.message.error(err?.error?.message || 'Có lỗi xảy ra khi xóa kết quả chính');
      },
      complete: () => {
        this.isDeleteLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
  
  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  handleDataPopUpAddMember(e: any) {
    this.visiblePopUpAddMember = e.isVisible;
    console.log('Received data from popup-add-member:', e);
    
    // Lưu thông tin thành viên vào form và danh sách
    if (e.members && e.members.length > 0) {
      // Cập nhật listMember với định dạng đúng
      this.listMember = e.members.map((member: any) => ({
        member: member.memberId || member.userId, // Ưu tiên memberId (dành cho keyResult)
        img: '../../../../assets/img/avatar.png',
      }));
      
      // Cập nhật danh sách tên
      this.listMemberName = e.membersName || [];
      
      // Cập nhật form
      this.form.patchValue({
        member: this.listMember
      });
      
      console.log("Updated members:", this.listMember);
      console.log("Updated member names:", this.listMemberName);
    } else {
      this.listMember = [];
      this.listMemberName = [];
      this.form.patchValue({
        member: null
      });
    }
    
    this.cdr.detectChanges();
  }
  handleOpenPopUpAddMember() {
    console.log("Opening member popup for keyResult. Current objectId:", this.objectId);
    
    if (!this.objectId) {
      console.error("No objectId provided for keyResult. Cannot fetch members.");
      this.message.error("Không thể mở danh sách thành viên vì thiếu thông tin đối tượng.");
      return;
    }
    
    this.visiblePopUpAddMember = true;
    
    // Format member data correctly for the popup
    if (this.listMember && this.listMember.length > 0) {
      // Map listMember to correct format for popup - sử dụng memberId thay vì userId
      this.dataMember = this.listMember.map((member: any, index: number) => {
        // Make sure we have a valid member ID
        const memberId = typeof member.member === 'string' ? member.member : 
                         (member.member?.memberId || member.member);
        
        // Get corresponding username or use index as fallback
        const memberName = this.listMemberName[index] || `Member ${index + 1}`;
        
        console.log(`Formatted member ${index}:`, { memberId: memberId, memberName: memberName });
        
        return {
          memberId: memberId,
          memberName: memberName
        };
      });
    } else {
      this.dataMember = [];
    }
    
    console.log("Data members for popup:", this.dataMember);
    console.log("Object ID being passed to popup:", this.objectId);
  }

  handleEditUnit(e: any) {
    this.visiblePopUpAddMember = true;
    this.cdr.detectChanges();
  }

  listMember: any = [];
  listMemberName = [];
  @ViewChildren('member') components: QueryList<PopupAddEditKeyResultComponent>;
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
    const selectOption = document.querySelectorAll(
      '.ant-select-item-option-content',
    );
    selectOption.forEach((option: any) => {
      if (option.innerText === 'High' || option.innerText === 'Cao') {
        option.classList.add('text-[#EE2E2E]');
      } else if (option.innerText === 'Medium' || option.innerText === 'Vừa') {
        option.classList.add('text-[#FFB800]');
      } else if (option.innerText === 'Low' || option.innerText === 'Thấp') {
        option.classList.add('text-[#10D70C]');
      }
    });
  }
}

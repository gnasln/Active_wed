import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
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
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ObjectService } from '../../../core/api/object.service';
import { createObjectModel } from '../../../core/model/object.model';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-popup-add-edit-object',
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
  templateUrl: './popup-add-edit-object.component.html',
  styleUrl: './popup-add-edit-object.component.scss',
})
export class PopupAddEditObjectComponent {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() selectedTenant: any = null;
  @Input() selectedUnit: any = null;
  @Input() objectId: any = null;
  @Output() visibleListObject = new EventEmitter<boolean>();
  @Output() objectCreated = new EventEmitter<void>();
  isConfirmLoading = false;
  isDeleteLoading = false;
  priorityLevelHigh: string;
  priorityLevelMedium: string;
  priorityLevelLow: string;
  priorityLevelList: any = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private objectService: ObjectService,
    private message: NzMessageService,
  ) {}

  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleListObject.emit(false);
  }

  // Cập nhật phương thức ngOnInit để xử lý chế độ edit
  ngOnInit(): void {
    console.log('Initializing popup-add-edit-object with objectId:', this.objectId);
    
    // Reset form và dữ liệu thành viên khi khởi tạo
    if (!this.objectId) {
      // Chỉ reset khi tạo mới, không reset khi edit
      this.listMember = [];
      this.listMemberName = [];
    }
    
    // Các khởi tạo hiện có
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
    
    // Thêm logic xử lý để load dữ liệu khi ở chế độ edit
    if (this.objectId) {
      console.log('Loading object details for ID:', this.objectId);
      this.objectService.getObjectDetail(this.objectId).subscribe(
        (res: any) => {
          if (res.data) {
            const objectData = res.data;
            console.log('Object details loaded:', objectData);
            
            // Cập nhật form với dữ liệu từ API
            this.form.patchValue({
              target: objectData.title,
              description: objectData.description,
              priorityLevel: objectData.priority
            });
            
            // Cập nhật danh sách thành viên nếu có
            if (objectData.memberIds && objectData.memberIds.length > 0) {
              this.listMember = objectData.memberIds.map((memberId: any) => ({
                member: memberId,
                img: '../../../../assets/img/avatar.png',
              }));
              this.listMemberName = objectData.memberNames || [];
            }
            
            this.cdr.detectChanges();
          }
        },
        (err: any) => {
          console.error('Error loading object details:', err);
          this.message.error('Không thể tải thông tin object');
        }
      );
    }
    
    this.cdr.detectChanges();
  }

  // Cập nhật phương thức handleOk để xử lý cả tạo mới và cập nhật
  handleOk(): void {
    // Kiểm tra từng trường cụ thể và hiển thị thông báo lỗi tương ứng
    let hasError = false;
    let errorFields = [];

    // Kiểm tra trường target (tên mục tiêu)
    if (!this.form.get('target')?.value) {
      this.form.get('target')?.markAsTouched();
      this.form.get('target')?.setErrors({ 'required': true });
      hasError = true;
      errorFields.push('Tên mục tiêu');
    }

    // Kiểm tra trường priorityLevel (độ ưu tiên)
    if (!this.form.get('priorityLevel')?.value) {
      this.form.get('priorityLevel')?.markAsTouched();
      this.form.get('priorityLevel')?.setErrors({ 'required': true });
      hasError = true;
      errorFields.push('Độ ưu tiên');
    }

    // Kiểm tra thành viên - Sử dụng this.listMember thay vì form.get('member')
    if (!this.listMember || this.listMember.length === 0) {
      hasError = true;
      errorFields.push('Thành viên');
    }

    // Hiển thị thông báo lỗi cụ thể nếu form không hợp lệ
    if (hasError) {
      this.message.error(`Vui lòng điền đầy đủ các trường bắt buộc: ${errorFields.join(', ')}`);
      return;
    }

    // Log form values để debug
    console.log('Form values:', {
      target: this.form.get('target')?.value,
      description: this.form.get('description')?.value,
      priorityLevel: this.form.get('priorityLevel')?.value,
      memberCount: this.listMember?.length || 0
    });

    // Xử lý member IDs để đảm bảo chỉ gửi các chuỗi Guid đơn giản
    const memberIds = this.listMember.map((member: any) => {
      // Kiểm tra nếu member.member là đối tượng có userId
      if (member.member && typeof member.member === 'object' && member.member.userId) {
        return member.member.userId;
      }
      // Nếu member.member là chuỗi Guid, sử dụng trực tiếp
      else if (typeof member.member === 'string') {
        return member.member;
      }
      // Trường hợp khác, log và bỏ qua
      else {
        console.error('Invalid member format:', member);
        return null;
      }
    }).filter((id: string | null) => id !== null); // Lọc bỏ các giá trị null

    console.log('Processed memberIds:', memberIds);

    const body: createObjectModel = {
      title: this.form.get('target')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      unitId: this.idUnit,
      priority: this.form.get('priorityLevel')?.value,
      memberIds: memberIds,
      memberNames: this.listMemberName
    };

    // Log thông tin trước khi gửi để debug
    console.log('Request body being sent to API:', body);
    
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    
    this.isConfirmLoading = true;
    
    this.objectService.createObject(body).subscribe({
      next: (res: any) => {
        if(res.data) {
          this.message.success('Tạo đối tượng thành công!');
          console.log('Object created successfully, emitting objectCreated event');
          this.objectCreated.emit();
          this.visibleListObject.emit(false);
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        console.error('Error creating object:', err);
        this.message.error(err?.error?.message || 'Có lỗi xảy ra khi tạo đối tượng');
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false;
      }
    });
  }

  public form: FormGroup = this.fb.group({
    target: [null, Validators.required],
    description: [''],
    priorityLevel: [null, Validators.required]
  });
  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  listMember: any = [];
  listMemberName = [];
  @ViewChildren('member') components: QueryList<PopupAddEditObjectComponent>;
  handleDataPopUpAddMember(e: any) {
    this.visiblePopUpAddMember = e.isVisible;
    
    console.log('Received data from popup-add-member:', e);
    
    if (e.members && e.members.length > 0) {
      // Cập nhật form với định dạng đúng
      this.form.patchValue({
        member: e.members
      });
      
      // Cập nhật danh sách thành viên
      this.listMemberName = e.membersName || [];
      this.listMember = e.members.map((member: any) => ({
        member: member.userId, // Lưu trữ chỉ userId thay vì cả đối tượng
        img: '../../../../assets/img/avatar.png',
      }));
      
      console.log('Updated member list:', this.listMember);
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
    this.visiblePopUpAddMember = true;
    
    // Chuyển đổi listMember sang định dạng phù hợp cho popup thành viên
    if (this.listMember && this.listMember.length > 0) {
      this.dataMember = this.listMember.map((item: any, index: number) => ({
        userId: typeof item.member === 'string' ? item.member : item.member?.userId || item.member,
        userName: this.listMemberName[index] || ''
      }));
    } else {
      this.dataMember = [];
    }
    
    console.log('Data members for popup:', this.dataMember);
  }

  handleEditUnit(e: any) {
    this.visiblePopUpAddMember = true;
    this.cdr.detectChanges();
  }

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

  // Thêm phương thức mới cho trường hợp chỉnh sửa
  handleEditObject(): void {
    console.log("Cập nhật object");
    
    // Kiểm tra từng trường cụ thể và hiển thị thông báo lỗi tương ứng
    let hasError = false;
    let errorFields = [];

    // Kiểm tra trường target (tên mục tiêu)
    if (!this.form.get('target')?.value) {
      this.form.get('target')?.markAsTouched();
      this.form.get('target')?.setErrors({ 'required': true });
      hasError = true;
      errorFields.push('Tên mục tiêu');
    }

    // Kiểm tra trường priorityLevel (độ ưu tiên)
    if (!this.form.get('priorityLevel')?.value) {
      this.form.get('priorityLevel')?.markAsTouched();
      this.form.get('priorityLevel')?.setErrors({ 'required': true });
      hasError = true;
      errorFields.push('Độ ưu tiên');
    }

    // Kiểm tra thành viên - Sử dụng this.listMember thay vì form.get('member')
    if (!this.listMember || this.listMember.length === 0) {
      hasError = true;
      errorFields.push('Thành viên');
    }

    // Hiển thị thông báo lỗi cụ thể nếu form không hợp lệ
    if (hasError) {
      this.message.error(`Vui lòng điền đầy đủ các trường bắt buộc: ${errorFields.join(', ')}`);
      return;
    }

    // Log form values để debug
    console.log('Form values for update:', {
      target: this.form.get('target')?.value,
      description: this.form.get('description')?.value,
      priorityLevel: this.form.get('priorityLevel')?.value,
      memberCount: this.listMember?.length || 0
    });

    // Xử lý member IDs để đảm bảo chỉ gửi các chuỗi Guid đơn giản
    const memberIds = this.listMember.map((member: any) => {
      // Kiểm tra nếu member.member là đối tượng có userId
      if (member.member && typeof member.member === 'object' && member.member.userId) {
        return member.member.userId;
      }
      // Nếu member.member là chuỗi Guid, sử dụng trực tiếp
      else if (typeof member.member === 'string') {
        return member.member;
      }
      // Trường hợp khác, log và bỏ qua
      else {
        console.error('Invalid member format:', member);
        return null;
      }
    }).filter((id: string | null) => id !== null); // Lọc bỏ các giá trị null

    console.log('Processed memberIds for update:', memberIds);
    
    const body: any = {
      id: this.objectId,
      title: this.form.get('target')?.value,
      description: this.form.get('description')?.value,
      unitId: this.idUnit,
      priority: this.form.get('priorityLevel')?.value,
      memberIds: memberIds,
      memberNames: this.listMemberName
    };

    // Log thông tin trước khi gửi để debug
    console.log('Update request body being sent to API:', body);

    this.isConfirmLoading = true;
    
    this.objectService.updateObject(body).subscribe({
      next: (res: any) => {
        console.log('Update response:', res);
        if (res.data) {
          this.message.success('Cập nhật đối tượng thành công!');
          this.objectCreated.emit();
          this.visibleListObject.emit(false);
        }
      },
      error: (err: any) => {
        console.error('Update error:', err);
        this.message.error(err?.error?.message || 'Có lỗi xảy ra khi cập nhật đối tượng');
      },
      complete: () => {
        this.isConfirmLoading = false;
      }
    });
  }

  handleDelete(): void {
    if (!this.objectId) {
      this.message.error('No object selected to delete');
      return;
    }

    this.isDeleteLoading = true;
    this.objectService.deleteObject(this.objectId).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.message.success('Xóa đối tượng thành công!');
          this.objectCreated.emit();
          this.visibleListObject.emit(false);
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        this.message.error(err);
        this.isDeleteLoading = false;
      },
      complete: () => {
        this.isDeleteLoading = false;
      }
    });
  }
}

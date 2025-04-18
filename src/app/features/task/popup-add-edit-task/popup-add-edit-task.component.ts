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
  inject,
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
// import { PopupAddMemberComponent } from '../../taskName/taskName-popup-add-edit/popup-add-member/popup-add-member.component';
import { PopupEditTaskHistoryComponent } from './popup-edit-task-history/popup-edit-task-history.component';
import { MainComponent } from '../../../layouts/main/main.component';
import { ToDOService } from '../../../core/api/todo.service';
import {
  createToDoModel,
  updateToDoModel,
} from '../../../core/model/toDo.model';
import moment from 'moment';
import { PopupAddMemberComponent } from '../../unit/unit-popup-add-edit/popup-add-member/popup-add-member.component';
import { UnitListComponent } from '../../unit/unit-list/unit-list.component';
import { Store } from '@ngrx/store';
import { loadTodos } from '../../../store/ToDo.action';
import { PriorityLevel, TodoStatus } from '../../../core/enums/todo';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { PopupSubTaskListComponent } from '../popup-sub-task-list/popup-sub-task-list.component';

@Component({
  selector: 'app-popup-add-edit-task',
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
    PopupEditTaskHistoryComponent,
    NzPopconfirmModule,
    PopupSubTaskListComponent,
  ],
  templateUrl: './popup-add-edit-task.component.html',
  styleUrl: './popup-add-edit-task.component.scss',
})
export class PopupAddEditTaskComponent implements OnInit, AfterViewChecked {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() idParentTask: any;
  @Input() idTaskDetail: any;
  @Input() objectId: any;
  @Output() visibleList = new EventEmitter<boolean>();
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskUpdated = new EventEmitter<any>();
  isConfirmLoading = false;
  priorityLevelHigh: string;
  priorityLevelMedium: string;
  priorityLevelLow: string;
  DueDate: string;
  deleteSuccess: string;
  updateSuccess: string;
  createSuccess: string;
  priorityLevelList: any = [];

  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  handleOk(): void {
    const body: createToDoModel = {
      title: this.form.get('taskName')?.value,
      description: this.form.get('description')?.value,
      priority: this.form.get('priorityLevel')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      modifiedDate: moment().local().format('YYYY-MM-DD'),
      dueDate: moment(this.form.get('deadline')?.value)
        .local()
        .format('YYYY-MM-DD'),
      owner: this.userInfor?.sub,
      ownerName: this.userInfor?.name,
      assigner: this.userInfor.sub,
      assignee: this.form.get('member')?.value
        ? this.form.get('member')?.value[0]?.userId
        : null,
      assigneeName: this.form.get('member')?.value
        ? this.form.get('member')?.value[0]?.userName
        : null,
      unitId: this.idUnit,
      status: TodoStatus.New,
      memberIds: this.listMember.map((member: any) => member.member),
      memberName: this.listMemberName
    };

    if (this.idParentTask) {
      body['parentTodoItemId'] = this.idParentTask;
    }

    if (this.objectId) {
      body['objectId'] = this.objectId;
      console.log("Đang tạo task với objectId:", this.objectId);
    } else {
      console.log("Không có objectId được truyền vào popup task");
    }

    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    if (
      moment(this.form.get('deadline')?.value).startOf('day') <
      moment().startOf('day')
    ) {
      this._snackBar.error('DueDate phải >= ngày hiện tại');
      return;
    }

    this.todoService.createToDo(body).subscribe((res) => {
      MainComponent.getData();
      this._snackBar.success(this.createSuccess);
      console.log("Data Task trả về: ", res)
      this._store.dispatch(loadTodos());
      this.visibleList.emit(false);
    });
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this._store.dispatch(loadTodos());
    this.visibleList.emit(false);
  }
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private todoService: ToDOService,
  ) {}
  _snackBar = inject(SnackbarService);
  _store = inject(Store);
  ngOnInit(): void {
    this.translate
      .get('PopUpAddEditTask.priorityHigh')
      .subscribe((value) => (this.priorityLevelHigh = value));
    this.translate
      .get('PopUpAddEditTask.priorityMedium')
      .subscribe((value) => (this.priorityLevelMedium = value));
    this.translate
      .get('PopUpAddEditTask.priorityLow')
      .subscribe((value) => (this.priorityLevelLow = value));
    this.translate
      .get('Toast.createSuccess')
      .subscribe((value) => (this.createSuccess = value));
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.translate
      .get('Toast.DueDate')
      .subscribe((value) => (this.DueDate = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('PopUpAddEditTask.priorityHigh')
        .subscribe((value) => (this.priorityLevelHigh = value));
      this.translate
        .get('PopUpAddEditTask.priorityMedium')
        .subscribe((value) => (this.priorityLevelMedium = value));
      this.translate
        .get('PopUpAddEditTask.priorityLow')
        .subscribe((value) => (this.priorityLevelLow = value));
      this.translate
        .get('Toast.createSuccess')
        .subscribe((value) => (this.createSuccess = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));
      this.translate
        .get('Toast.DueDate')
        .subscribe((value) => (this.DueDate = value));
    });
    this.priorityLevelList = [
      {
        label: this.priorityLevelHigh,
        value: PriorityLevel.High,
      },
      {
        label: this.priorityLevelMedium,
        value: PriorityLevel.Medium,
      },
      {
        label: this.priorityLevelLow,
        value: PriorityLevel.Low,
      },
    ];
    this.cdr.detectChanges();
    if (this.idTaskDetail) {
      this.getTaskDetail();
    }
  }

  public form: FormGroup = this.fb.group({
    taskName: [null, Validators.required],
    description: [null],
    member: [null, Validators.required],
    priorityLevel: [null, Validators.required],
    deadline: [null, Validators.required],
    taskInfor: [null],
  });
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
    this.dataMember = this.form.get('member')?.value;
  }

  handleEditUnit(e: any) {
    this.visiblePopUpAddMember = true;
    this.cdr.detectChanges();
  }

  listMember: any = [];
  listMemberName = [];
  @ViewChildren('member') components: QueryList<PopupAddEditTaskComponent>;
  public memberCount: number;
  ngAfterViewChecked(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount = this.listMember?.length - 4;
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
  visiblePopUpEditTaskHistory: boolean = false;
  idTask: string;
  handlevisibleEditTaskHistory(e: any) {
    this.visiblePopUpEditTaskHistory = e;
  }
  handleOpenEditTaskHistory(e: any) {
    this.idTask = e;
    this.visiblePopUpEditTaskHistory = true;
  }
  getTaskDetail() {
    this.todoService.getToDoDetail(this.idTaskDetail).subscribe((data) => {
      this.idUnit = data.unitId;
      this.form.patchValue({
        taskName: data.title,
        description: data.description,
        priorityLevel: data.priority,
        deadline: data.dueDate,
        taskInfor: data.taskInfor,
        member:
          data.assignee && data.assigneeName
            ? [{ userId: data.assignee, userName: data.assigneeName }]
            : null,
      });
      this.listMember = this.form.get('member')?.value.map((member: any) => ({
        member,
        img: '../../../../assets/img/avatar.png',
      }));
    });
  }
  handleEditTask() {
    this.isConfirmLoading = true;
    
    const body: updateToDoModel = {
      id: this.idTaskDetail,
      title: this.form.get('taskName')?.value,
      description: this.form.get('description')?.value,
      priority: this.form.get('priorityLevel')?.value,
      modifiedDate: moment().local().format('YYYY-MM-DD'),
      dueDate: moment(this.form.get('deadline')?.value)
        .local()
        .format('YYYY-MM-DD'),
      assigner: this.userInfor.sub,
      assignee: this.form.get('member')?.value
        ? this.form.get('member')?.value[0]?.userId
        : null,
      assigneeName: this.form.get('member')?.value
        ? this.form.get('member')?.value[0]?.userName
        : null,
    };
    
    if (
      moment(this.form.get('deadline')?.value).startOf('day') <
      moment().startOf('day')
    ) {
      this._snackBar.error(this.DueDate);
      this.isConfirmLoading = false;
      return;
    }
    
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    
    this.todoService.updateToDo(body).subscribe(
      (data) => {
        this._snackBar.success(this.updateSuccess);
        console.log("Task updated successfully:", data);
        
        // Đảm bảo dữ liệu trả về đã đủ trường cần thiết cho component cha
        const updatedTask = {
          id: this.idTaskDetail,
          ...data, // Dữ liệu từ API trả về
          ...body, // Dữ liệu từ form (phòng khi API không trả về đầy đủ)
        };
        
        // Cập nhật store global
        this._store.dispatch(loadTodos());
        
        // Đóng popup
        this.visibleList.emit(false);
        
        // Emit sự kiện đã cập nhật
        this.taskUpdated.emit(updatedTask);
        
        this.isConfirmLoading = false;
      },
      (error) => {
        console.error('Error updating task:', error);
        this._snackBar.error('Có lỗi xảy ra khi cập nhật nhiệm vụ');
        this.isConfirmLoading = false;
      }
    );
  }
  handleDeleteTask() {
    this.isConfirmLoading = true;
    this.todoService.deleteToDo(this.idTaskDetail).subscribe(
      (response) => {
        this._snackBar.success(this.deleteSuccess);
        this._store.dispatch(loadTodos());
        
        // Đóng popup sau khi xóa thành công
        this.visibleList.emit(false);
        this.isConfirmLoading = false;
        
        // Gửi sự kiện xóa thành công qua output event
        this.taskDeleted.emit(this.idTaskDetail);
      },
      (error) => {
        console.error('Error deleting task:', error);
        this._snackBar.error('Có lỗi xảy ra khi xóa nhiệm vụ');
        this.isConfirmLoading = false;
      }
    );
  }

  visiblePopUpSubTaskList: boolean = false;
  handlevisiblePopUpSubTaskList(e: any) {
    this.visiblePopUpSubTaskList = e;
  }
  handleOpenPopUpSubTaskList(e: any) {
    // this.idTask = e;
    this.visiblePopUpSubTaskList = true;
  }
}

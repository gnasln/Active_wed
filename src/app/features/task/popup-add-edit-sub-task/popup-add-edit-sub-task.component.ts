import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { loadTodos } from '../../../store/ToDo.action';
import {
  createToDoModel,
  updateToDoModel,
} from '../../../core/model/toDo.model';
import moment from 'moment';
import { PriorityLevel, TodoStatus } from '../../../core/enums/todo';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToDOService } from '../../../core/api/todo.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Store } from '@ngrx/store';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PopupAddMemberComponent } from '../../unit/unit-popup-add-edit/popup-add-member/popup-add-member.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-popup-add-edit-sub-task',
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
  templateUrl: './popup-add-edit-sub-task.component.html',
  styleUrl: './popup-add-edit-sub-task.component.scss',
})
export class PopupAddEditSubTaskComponent {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() idTaskDetail: any;
  @Input() idTaskParent: any;
  @Input() reloadAfterClose: boolean = false;

  @Output() visibleList = new EventEmitter<boolean>();
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
    console.log('Button ok clicked!');
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
        ? this.form.get('member')?.value[0].userId
        : null,
      assigneeName: this.form.get('member')?.value
        ? this.form.get('member')?.value[0].userName
        : null,
      unitId: this.idUnit,
      status: TodoStatus.New,
    };
    if (
      moment(this.form.get('deadline')?.value).startOf('day') <
      moment().startOf('day')
    ) {
      this._snackBar.error('DueDate phải >= ngày hiện tại');
      return;
    }
    if (this.idTaskParent) {
      body.parentTodoItemId = this.idTaskParent;
    }
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    this.todoService.createToDo(body).subscribe((res) => {
      this._snackBar.success(this.createSuccess);
      // UnitListComponent.getData(this.todoService);

      this.visibleList.emit(false);
    });
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
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
    console.log(this.idTaskParent);

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
    } else {
      this.getTaskParrenDetail();
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
    this.form.patchValue({ member: e.members });
    this.listMember = this.form.get('member')?.value.map((member: any) => ({
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
  @ViewChildren('member') components: QueryList<PopupAddEditSubTaskComponent>;
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
      this.getTaskParrenDetail(data.parentTodoItemId);
    });
  }
  handleEditTask() {
    const body: updateToDoModel = {
      id: this.idTaskDetail,
      title: this.form.get('taskName')?.value,
      description: this.form.get('description')?.value,
      priority: this.form.get('priorityLevel')?.value,
      modifiedDate: moment().local().format('YYYY-MM-DD'),

      assignee: this.form.get('member')?.value
        ? this.form.get('member')?.value[0].userId
        : null,
      assigneeName: this.form.get('member')?.value
        ? this.form.get('member')?.value[0].userName
        : null,

      dueDate: moment(this.form.get('deadline')?.value)
        .local()
        .format('YYYY-MM-DD'),
    };
    if (
      moment(this.form.get('deadline')?.value).startOf('day') <
      moment().startOf('day')
    ) {
      this._snackBar.error(this.DueDate);
      return;
    }
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    this.todoService.updateToDo(body).subscribe((data) => {
      this._snackBar.success(this.updateSuccess);
      if (this.reloadAfterClose) {
        this._store.dispatch(loadTodos());
      }
      this.visibleList.emit(false);
    });
  }
  handleDeleteTask() {
    this.todoService.deleteToDo(this.idTaskDetail).subscribe(() => {
      this._snackBar.success(this.deleteSuccess);
      this._store.dispatch(loadTodos());
    });
  }
  visiblePopUpSubTaskList: boolean = false;
  handlevisiblePopUpSubTaskList(e: any) {
    this.visiblePopUpSubTaskList = e;
  }
  handleOpenPopUpSubTaskList(e: any) {
    // this.idTask = e;
    this.visiblePopUpSubTaskList = true;
  }
  getTaskParrenDetail(idTaskparren: any = this.idTaskParent) {
    this.todoService.getToDoDetail(idTaskparren).subscribe((data) => {
      this.idUnit = data.unitId;
      // if (!this.form.get('member')?.value) {
      //   this.form.patchValue({
      //     member: [{ userId: data.assignee, userName: data.assigneeName }],
      //   });

      // }
      // this.listMember = this.form.get('member')?.value.map((member: any) => ({
      //   member,
      //   img: '../../../../assets/img/avatar.png',
      // }));
    });
  }
}

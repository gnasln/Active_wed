import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ToDOService } from '../../../core/api/todo.service';
import moment from 'moment';
import { SubTaskItemComponent } from '../task-list/task-list-item/sub-task-item/sub-task-item.component';
import { TaskListItemComponent } from '../task-list/task-list-item/task-list-item.component';
import { PriorityLevel, TodoStatus } from '../../../core/enums/todo';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PopupAddEditTaskComponent } from '../popup-add-edit-task/popup-add-edit-task.component';
import { PopupAddEditSubTaskComponent } from '../popup-add-edit-sub-task/popup-add-edit-sub-task.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadTodos } from '../../../store/ToDo.action';

@Component({
  selector: 'app-popup-sub-task-list',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    NzRadioModule,
    CommonModule,
    TranslateModule,
    NzIconModule,
    TranslateModule,
    NzCheckboxModule,
    FormsModule,
    // PopupAddEditTaskComponent,
    PopupAddEditSubTaskComponent,
  ],
  templateUrl: './popup-sub-task-list.component.html',
  styleUrl: './popup-sub-task-list.component.scss',
})
export class PopupSubTaskListComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() idTaskDetail: any;
  @Output() visibleListPopUpSubTask = new EventEmitter<boolean>();
  idTaskParent: string;
  idTaskParentNoSend: string;
  dataList: any[];
  priorityLevelEnum: any = PriorityLevel;
  constructor(
    private toDoServices: ToDOService,
    private cdr: ChangeDetectorRef,
  ) {}
  _store = inject(Store);

  ngOnInit(): void {
    this.idTaskParentNoSend = this.idTaskDetail;
    this.getData(this.idTaskDetail);
  }
  handleCancel(): void {
    this.visibleListPopUpSubTask.emit(false);
  }
  checkedSuccesTask(data: any) {
    data.status = data.status !== 10 ? TodoStatus.Done : TodoStatus.New;
    this.toDoServices
      .updateToDo({ status: data.status, id: data.id })
      .subscribe((data) => {});
  }
  getData(id: string) {
    this.toDoServices.getToDoDetail(id).subscribe((data) => {
      this.dataList = data.subTodoItems?.map((item: any) => ({
        ...item,
        done: item.status === 10 ? true : false,
        dueDate: moment(item.dueDate).format('DD/MM/YYYY').toLocaleString(),
      }));
    });
  }

  visibleAddTask: boolean = false;
  handleOpenAddTask(idTaskDetail: string) {
    this.idTaskDetail = idTaskDetail;
    this.idTaskParent = '';

    this.visibleAddTask = true;
    this.cdr.detectChanges();
  }
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  handleOpenAddSubTaskToParrent(
    idTaskDetail: string = this.dataList[0]?.parentTodoItemId ||
      this.idTaskParentNoSend,
  ) {
    this.idTaskParent = idTaskDetail;
    this.idTaskDetail = '';
    this.visibleAddTask = true;
    this.cdr.detectChanges();
  }
  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
    this.getData(this.idTaskParentNoSend);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PopupChangeGroupComponent } from '../../../../group/popup-change-group/popup-change-group.component';
import { PopupAddEditTaskComponent } from '../../../popup-add-edit-task/popup-add-edit-task.component';
import { PriorityLevel, TodoStatus } from '../../../../../core/enums/todo';
import { ToDOService } from '../../../../../core/api/todo.service';
import { SnackbarService } from '../../../../../core/services/snackbar.service';
import { PopupAddEditSubTaskComponent } from '../../../popup-add-edit-sub-task/popup-add-edit-sub-task.component';

@Component({
  selector: 'app-sub-task-item',
  standalone: true,
  imports: [
    NzIconModule,
    TranslateModule,
    NzCheckboxModule,
    CommonModule,
    FormsModule,
    PopupChangeGroupComponent,
    PopupAddEditSubTaskComponent,
  ],
  templateUrl: './sub-task-item.component.html',
  styleUrl: './sub-task-item.component.scss',
})
export class SubTaskItemComponent implements OnInit {
  _snackBar = inject(SnackbarService);
  ngOnInit(): void {
    this.data = this.data.map((item: any) => ({
      ...item,
      done: item.status === 10 ? true : false,
      dueDate: moment(item.dueDate).local().format('DD/MM/YYYY'),
    }));
  }
  @Input() idTask: string = '1';
  @Input() data: any;
  idTaskDetail: any;
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  constructor(
    private cdr: ChangeDetectorRef,
    private toDoService: ToDOService,
  ) {}
  checkedSuccesTask(event: any) {
    event.status = event.status !== 10 ? TodoStatus.Done : TodoStatus.New;
    this.toDoService
      .updateToDo({ status: event.status, id: event.id })
      .subscribe((data) => {
        this._snackBar.success('Done');
      });
  }
  priorityLevelEnum: any = PriorityLevel;

  visiblePopUpChangeGroup: boolean = false;
  handleVisibleChangeGroup(e: boolean) {
    this.visiblePopUpChangeGroup = e;
  }
  handleOpenPopUpChangeGroup(idTaskDetail: string) {
    this.idTaskDetail = idTaskDetail;
    this.visiblePopUpChangeGroup = true;
    this.cdr.detectChanges();
  }
  visibleAddTask: boolean = false;
  handleOpenAddTask(idTaskDetail: string) {
    this.idTaskDetail = idTaskDetail;
    this.visibleAddTask = true;
    this.cdr.detectChanges();
  }
  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
  }
}

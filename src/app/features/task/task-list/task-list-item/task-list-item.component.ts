import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SubTaskItemComponent } from './sub-task-item/sub-task-item.component';
import { PriorityLevel, TodoStatus } from '../../../../core/enums/todo';
import { PopupAddEditTaskComponent } from '../../popup-add-edit-task/popup-add-edit-task.component';
import { PopupChangeGroupComponent } from '../../../group/popup-change-group/popup-change-group.component';
import { ToDOService } from '../../../../core/api/todo.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list-item',
  standalone: true,
  imports: [
    NzIconModule,
    TranslateModule,
    NzCheckboxModule,
    CommonModule,
    SubTaskItemComponent,
    PopupAddEditTaskComponent,
    PopupChangeGroupComponent,
    FormsModule,
  ],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss',
})
export class TaskListItemComponent implements OnInit {
  @Input() idTask: string = '1';
  @Input() data: any;
  idTaskDetail: string;
  priorityLevelEnum: any = PriorityLevel;
  _snackBar = inject(SnackbarService);
  constructor(
    private cdr: ChangeDetectorRef,
    private toDoService: ToDOService,
  ) {}
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  checkedSuccesTask(event: any) {
    console.log('success ', event);
    event.status = event.status !== 10 ? TodoStatus.Done : TodoStatus.New;
    this.toDoService
      .updateToDo({ status: event.status, id: event.id })
      .subscribe((data) => {
        this._snackBar.success('Done');
      });
  }
  ngOnInit(): void {
    console.log("Taskkk: ", this.data.owner);
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

  visiblePopUpChangeGroup: boolean = false;
  handleVisibleChangeGroup(e: boolean) {
    this.visiblePopUpChangeGroup = e;
  }
  handleOpenPopUpChangeGroup(idTaskDetail: string) {
    this.idTaskDetail = idTaskDetail;
    this.visiblePopUpChangeGroup = true;
    this.cdr.detectChanges();
  }
}

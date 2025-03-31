import { Component } from '@angular/core';
import { TaskListItemComponent } from '../task-list/task-list-item/task-list-item.component';
import { SubTaskItemComponent } from '../task-list/task-list-item/sub-task-item/sub-task-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { PopupAddEditTaskComponent } from '../popup-add-edit-task/popup-add-edit-task.component';
import moment from 'moment';

@Component({
  selector: 'app-popup-today-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ResizableModule,
    NzDropDownModule,
    NzIconModule,
    TranslateModule,
    NzCheckboxModule,
    MatSelectModule,
    TaskListItemComponent,
    SubTaskItemComponent,
    PopupAddEditTaskComponent,
  ],
  templateUrl: './popup-today-task-list.component.html',
  styleUrl: './popup-today-task-list.component.scss'
})
export class PopupTodayTaskListComponent {
  public style: object = {};
  public style2: object = {};
  // @Input() idTask: string = '1';
  data: any = [
    {
      priority: 0,
      subTask: {
        date: moment().format('DD/MM/YYYY'),
      },
    },
    {
      priority: 1,
    },
    {
      priority: 2,
    },
  ];
}

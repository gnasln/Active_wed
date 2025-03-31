import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';
import { SubTaskItemComponent } from './task-list-item/sub-task-item/sub-task-item.component';
import moment from 'moment';
import { PopupAddEditTaskComponent } from '../popup-add-edit-task/popup-add-edit-task.component';
import { getListToDoModel } from '../../../core/model/toDo.model';
import { ToDOService } from '../../../core/api/todo.service';
import { Store } from '@ngrx/store';
import { loadTodos } from '../../../store/ToDo.action';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
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
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  @Input() idTask: string = '1';
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
  dayList: any = [
    {
      value: 0,
      label: 'Tất cả',
    },
    {
      value: 1,
      label: 'Hôm nay',
    },
    {
      value: 2,
      label: 'Quá hạn',
    },
    {
      value: 3,
      label: 'Chưa tới hạn',
    },
  ]
  public style: object = {};
  public style2: object = {};
  sort: number = 0;
  body: getListToDoModel = {
    pageNumber: 1,
    pageSize: 30,
  };
  daySelect = new FormControl(0)

  constructor(
    private cdr: ChangeDetectorRef,
    private todoService: ToDOService,
  ) {}
  ngOnInit(): void {
    this._store.dispatch(loadTodos());
    this.getData();
  }
  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      overflow: 'hidden',
      width: `${event.rectangle.width}px`,
      'max-width': '100%',
    };
    this.style2 = {
      overflow: 'hidden',
      width: `calc(100% - ${event.rectangle.width}px)`,
    };
    if (Number(event.rectangle.width) < 24) {
      Object.assign(this.style, { padding: '0 1px' });
    }
    const containerBlock = document.querySelector(
      '#containerBlock',
    ) as HTMLElement;

    if (Number(event.rectangle.width) >= containerBlock.offsetWidth) {
      Object.assign(this.style2, { padding: '0 1px' });
    }
  }
  changeSort(idSort: number): void {
    this.sort = idSort;
    this.cdr.detectChanges();
  }
  idUnit: string;
  visibleList: boolean = false;
  handleVisibleList(e: boolean) {
    this.visibleList = e;
  }
  handleOpenAddTask() {
    this.visibleList = true;
    this.idUnit = '';
  }
  _store = inject(Store);

  getData() {
    // this.body = {
    //   ...this.body,
    //   unitId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   ownerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   assigner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    //   assignee: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    // };
    // this.todoService.getListToDo(this.body).subscribe((data) => {
    //   this.data = data.items;
    // });
    this._store.select('toDoReduce').subscribe((data: any) => {
      this.data = data.items?.map((item: any) => ({
        ...item,
        done: item.status === 10 ? true : false,
        dueDate: moment(item.dueDate).format('DD/MM/YYYY').toLocaleString(),
      }));
      console.log(data);
    });
  }
}

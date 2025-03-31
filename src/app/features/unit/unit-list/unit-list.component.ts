import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { UnitItemComponent } from './unit-item/unit-item.component';
import { UnitPopupAddEditComponent } from '../unit-popup-add-edit/unit-popup-add-edit.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { KeyResultItemComponent } from '../../key-result/key-result-item/key-result-item.component';
import { TaskListComponent } from '../../task/task-list/task-list.component';
import { TaskListItemComponent } from '../../task/task-list/task-list-item/task-list-item.component';
import moment from 'moment';
import { SubTaskItemComponent } from '../../task/task-list/task-list-item/sub-task-item/sub-task-item.component';
import { PopupAddEditTaskComponent } from '../../task/popup-add-edit-task/popup-add-edit-task.component';
import { MainComponent } from '../../../layouts/main/main.component';
import { getListToDoModel } from '../../../core/model/toDo.model';
import { ToDOService } from '../../../core/api/todo.service';
import { loadTodos } from '../../../store/ToDo.action';
import { GetListTodoBodyService } from '../../../core/services/get-list-todo-body.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { ObjectService } from '../../../core/api/object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ValueUnitService } from '../../../core/shared/value-unit.service';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [
    UnitItemComponent,
    UnitPopupAddEditComponent,
    CommonModule,
    NzIconModule,
    NzProgressModule,
    ResizableModule,
    NzDropDownModule,
    KeyResultItemComponent,
    TaskListItemComponent,
    SubTaskItemComponent,
    PopupAddEditTaskComponent,
    TranslateModule,
  ],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss',
})
export class UnitListComponent implements OnInit, OnDestroy {
  public style: object = {};
  public style2: object = {};
  public idParentTask: any;
  public listObjects: any = [];
  private pageSize: number = 2;
  public hasMoreData: boolean = true;
  sort: number = 0;
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
  data: any;
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  route: ActivatedRoute = inject(ActivatedRoute);
  UnitId = this.route.snapshot.params['id'];
  subscription: Subscription;
  constructor(
    private cdr: ChangeDetectorRef,
    public todoService: ToDOService,
    private GetListTodoBodyService: GetListTodoBodyService,
    private router: Router,
    private objectService: ObjectService,
    private message: NzMessageService,
    private valueUnitService: ValueUnitService,
  ) {
    this.valueUnitService.unitId$.subscribe(unitId => {
      // this.listObjectByUnit(unitId);
      this.UnitIdService = unitId
      if(this.UnitIdService) {
        this.listObjectByUnit();
      }
  });
  }
  ngOnDestroy(): void {
    this.GetListTodoBodyService.body.unitId = undefined;
    this.subscription.unsubscribe();
  }

  public UnitIdService: any;
  ngOnInit(): void {
    if (this.router.url.includes('othertask') && this.UnitId) {
      this.GetListTodoBodyService.body.unitId = this.UnitId;
      // this.listObjectByUnit(this.UnitIdService.toString());
    }
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('othertask')) {
          // body.unitId = this.UnitId;
          this.GetListTodoBodyService.body.unitId =
            this.route.snapshot.params['id'];
          this._store.dispatch(loadTodos());
          this.getData();
        } else {
          this.GetListTodoBodyService.body.unitId = undefined;
          this._store.dispatch(loadTodos());
          this.getData();
        }
      }
    });
    this._store.dispatch(loadTodos());
    this.getData();
  }
  idUnit: string;
  visibleList: boolean = false;
  handleVisibleList(e: boolean) {
    this.visibleList = e;
  }
  handleOpenList() {
    this.visibleList = true;
    this.idUnit = '';
  }

  handleEditUnit(e: any) {
    this.idUnit = e;
    this.visibleList = false;
    this.cdr.detectChanges();
  }
  _store = inject(Store);
  handleCount() {
    // const infor: initialStateInterface = {
    //   id: 1,
    // };
    // this._store.dispatch(setDataMenuAction({ data: infor }));
    MainComponent.getData();
  }
  listMember: any = [
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
  ];
  @ViewChildren('member') components: QueryList<UnitListComponent>;
  @ViewChildren('member1') components1: QueryList<UnitListComponent>;
  public memberCount: number;
  public memberCount1: number;
  ngAfterViewInit(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount1 = this.listMember.length - 4;
    Array.from(this.components1.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount1 = this.listMember.length - 4;
    this.cdr.detectChanges();
  }
  changeSort(idSort: number): void {
    this.sort = idSort;
    this.cdr.detectChanges();
  }
  visibleAddTask: boolean = false;
  handleOpenAddTask() {
    this.visibleAddTask = true;
    this.idUnit = this.route.snapshot.params['id'];
  }

  handleOpenAddSubTask(id: any) {
    this.idParentTask = id;
    this.visibleAddTask = true;
    this.idUnit = this.route.snapshot.params['id'];
  }

  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
  }
  idListTaskOpen: number = 0;
  handleOpenListOfTask(e: number) {
    this.idListTaskOpen = e;
    console.log(this.idListTaskOpen);

    this.cdr.detectChanges();
  }

  getData() {
    this._store.select('toDoReduce').subscribe((data: any) => {
      this.data = data.items?.map((item: any) => ({
        ...item,
        done: item.status === 10 ? true : false,
        dueDate: moment(item.dueDate).format('DD/MM/YYYY').toLocaleString(),
      }));
    });
  }

  listObjectByUnit(){
    const body = {
      unitId: this.UnitIdService,
      pageSize: this.pageSize,
      pageNumber: 1
    }
    this.objectService.listObjectByUnit(body).subscribe(res => {
      if (res.data){
        this.listObjects = res.data.items;
        this.cdr.detectChanges();
        if (res.data.items.length < this.pageSize ) {
          this.hasMoreData = false;
        }
      }
    }, (err) => {
      this.message.error(err);
    })
  }

  handleActive(id: string){
    console.log("ID: ", id)
  }

  loadMoreTasks() {
    this.GetListTodoBodyService.body.pageSize += 10;
    this._store.dispatch(loadTodos());
    this.getData();
  }

  loadMore() {
    this.pageSize++;
    this.listObjectByUnit();
  }
}

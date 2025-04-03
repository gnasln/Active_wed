import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { PopupAddEditObjectComponent } from '../../object/popup-add-edit-object/popup-add-edit-object.component';
import { UnitItemComponent } from './unit-item/unit-item.component';
import { UnitPopupAddEditComponent } from '../unit-popup-add-edit/unit-popup-add-edit.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

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
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TenantService } from '../../../core/api/tenant.service';
import { unitService } from '../../../core/api/unit.service';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [
    UnitItemComponent,
    UnitPopupAddEditComponent,
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule,
    NzProgressModule,
    ResizableModule,
    NzDropDownModule,
    KeyResultItemComponent,
    TaskListItemComponent,
    SubTaskItemComponent,
    PopupAddEditTaskComponent,
    TranslateModule,
    NzToolTipModule,
    NzPopconfirmModule,
      // Thêm PopupAddEditObjectComponent vào đây
    PopupAddEditObjectComponent
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
  // Thêm biến để điều khiển hiển thị PopupAddEditObjectComponent
editObjectVisible: boolean = false;
editingObjectId: string = '';
selectedUnitForEdit: any = null;
selectedTenantForEdit: any = null;

// Hàm xử lý khi click vào nút chỉnh sửa
showEditObjectPopup(object: any) {
  this.editingObjectId = object.id;
  this.selectedUnitForEdit = { id: object.unitId, name: this.selectedUnitName };
  this.selectedTenantForEdit = { id: this.valueUnitService.tenantIdSource, name: this.selectedTenantName };
  this.editObjectVisible = true;
}

// Hàm callback khi đóng popup
handleEditObjectClose(event: boolean) {
  this.editObjectVisible = event;
  if (!event) {
    // Refresh danh sách object sau khi chỉnh sửa
    this.listObjectByUnit();
  }
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
  data: any;
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  route: ActivatedRoute = inject(ActivatedRoute);
  UnitId = this.route.snapshot.params['id'];
  subscription: Subscription;
  selectedTenantName: string = '';
  selectedUnitName: string = '';
  editForm!: FormGroup;
  isEditModalVisible = false;
  currentObject: any;

  constructor(
    private cdr: ChangeDetectorRef,
    public todoService: ToDOService,
    private GetListTodoBodyService: GetListTodoBodyService,
    private router: Router,
    private objectService: ObjectService,
    private message: NzMessageService,
    private valueUnitService: ValueUnitService,
    private tenantService: TenantService,
    private unitService: unitService,
    private fb: FormBuilder,
  ) {
    this.valueUnitService.unitId$.subscribe(unitId => {
      this.UnitIdService = unitId;
      if(this.UnitIdService) {
        this.listObjectByUnit();
        // Get unit info
        this.unitService.getListUnitsByTenant(this.valueUnitService.tenantIdSource).subscribe(
          (res: any) => {
            const unit = res.data.find((u: any) => u.id === unitId);
            if (unit) {
              this.selectedUnitName = unit.name;
              this.cdr.detectChanges();
            }
          }
        );
      }
    });

    // Get tenant info
    if (this.valueUnitService.tenantIdSource) {
      this.tenantService.getDetailTenant(this.valueUnitService.tenantIdSource).subscribe(
        (res: any) => {
          if (res.data) {
            this.selectedTenantName = res.data.name;
            this.cdr.detectChanges();
          }
        }
      );
    }

    this.editForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      priority: [null],
      dueDate: [null],
      unitId: [''],
      memberIds: [[]],
      memberNames: [[]]
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
        console.log("Objects data:", res.data.items);
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

  handleEditObject(id: string) {
    this.idUnit = id;
    this.visibleList = true;
  }

  handleDeleteObject(id: string) {
    if (!id) {
      this.message.error('Không tìm thấy ID của đối tượng');
      return;
    }

    this.objectService.deleteObject(id).subscribe(
      (res: any) => {
        if (res.data) {
          // Xóa object khỏi danh sách hiện tại
          this.listObjects = this.listObjects.filter((obj: any) => obj.id !== id);
          this.message.success('Xóa đối tượng thành công');
          // Refresh lại danh sách
          this.listObjectByUnit();
          this.cdr.detectChanges();
        }
      },
      (err: any) => {
        this.message.error('Có lỗi xảy ra khi xóa đối tượng');
        console.error(err);
      }
    );
  }

  showEditModal(object: any) {
    this.currentObject = object;
    this.editForm.patchValue({
      id: object.id,
      title: object.title,
      description: object.description,
      priority: object.priority,
      dueDate: object.dueDate ? new Date(object.dueDate) : null,
      unitId: object.unitId,
      memberIds: object.memberIds,
      memberNames: object.memberNames
    });
    this.isEditModalVisible = true;
  }

  handleEditCancel() {
    this.isEditModalVisible = false;
    this.editForm.reset();
  }

  handleEditOk() {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      this.objectService.updateObject(formValue).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.message.success('Cập nhật thành công');
            // Update the object in the list
            const index = this.listObjects.findIndex((obj: any) => obj.id === formValue.id);
            if (index !== -1) {
              this.listObjects[index] = { ...this.listObjects[index], ...formValue };
            }
            this.isEditModalVisible = false;
            this.editForm.reset();
          } else {
            this.message.error('Cập nhật thất bại');
          }
        },
        error => {
          this.message.error('Có lỗi xảy ra khi cập nhật');
        }
      );
    }
  }
}

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
import { KeyResultService } from '../../../core/api/key-result.service';
import { PopupAddEditKeyResultComponent } from '../../key-result/popup-add-edit-key-result/popup-add-edit-key-result.component';
import { TaskOfKeyResultItemComponent } from '../../key-result/key-result-item/task-of-key-result-item/task-of-key-result-item.component';

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
    PopupAddEditObjectComponent,
    PopupAddEditKeyResultComponent,
    TaskOfKeyResultItemComponent
  ],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss',
})
export class UnitListComponent implements OnInit, OnDestroy {
  public style: object = {};
  public style2: object = {};
  public idParentTask: any;
  public idTaskEdit: string;
  public listObjects: any = [];
  private pageSize: number = 10;
  public hasMoreData: boolean = true;
  sort: number = 0;
  editObjectVisible: boolean = false;
  editingObjectId: string = '';
  selectedUnitForEdit: any = null;
  selectedTenantForEdit: any = null;

  showEditObjectPopup(object: any) {
    this.editingObjectId = object.id;
    this.selectedUnitForEdit = { id: object.unitId, name: this.selectedUnitName };
    this.selectedTenantForEdit = { id: this.valueUnitService.tenantIdSource, name: this.selectedTenantName };
    this.editObjectVisible = true;
  }

  handleEditObjectClose(event: boolean) {
    this.editObjectVisible = event;
    if (!event) {
      this.listObjectByUnit();
    }
  }

  handleObjectCreated() {
    console.log('UnitListComponent: Object created, refreshing list');
    this.listObjectByUnit();
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
    private keyResultService: KeyResultService
  ) {
    this.valueUnitService.unitId$.subscribe(unitId => {
      this.UnitIdService = unitId;
      if(this.UnitIdService) {
        this.listObjectByUnit();
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
    // Remove event listener
    document.removeEventListener('refresh-object-list', this.handleRefreshEvent);
    
    // Unsubscribe from all subscriptions
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    this.GetListTodoBodyService.body.unitId = undefined;
    this.subscription.unsubscribe();
  }

  public UnitIdService: any;
  ngOnInit(): void {
    // Add event listener for custom refresh event
    document.addEventListener('refresh-object-list', this.handleRefreshEvent);
    
    // Subscribe to object list refresh from the service
    this.refreshSubscription = this.valueUnitService.objectListRefresh$.subscribe(() => {
      console.log('UnitListComponent: Received refresh signal from service');
      this.listObjectByUnit();
    });
    
    if (this.router.url.includes('othertask') && this.UnitId) {
      this.GetListTodoBodyService.body.unitId = this.UnitId;
      this.GetListTodoBodyService.body.objectId = null;
    }
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('othertask')) {
          this.GetListTodoBodyService.body.unitId =
            this.route.snapshot.params['id'];
          this.GetListTodoBodyService.body.objectId = null;
          
          this._store.dispatch(loadTodos());
          this.getData();
          
          // Tải key results cho tất cả objects, chỉ load 1 lần
          if (this.listObjects && this.listObjects.length > 0) {
            this.listObjects.forEach((object: any) => {
              // Đây là lần đầu init, nên không cần force refresh
              this.loadKeyResultsForObject(object.id, false);
            });
          }
        } else {
          this.GetListTodoBodyService.body.unitId = undefined;
          this.GetListTodoBodyService.body.objectId = null;
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
    // Reset currentObjectId khi mở popup từ danh sách task khác
    this.currentObjectId = '';
    
    // Đảm bảo rằng body trong GetListTodoBodyService không có objectId
    this.GetListTodoBodyService.body.objectId = null;
    
    console.log("Mở popup add task từ task khác - không có objectId");
    this.cdr.detectChanges();
  }

  handleOpenAddSubTask(id: any) {
    this.idParentTask = id;
    this.visibleAddTask = true;
    this.idUnit = this.route.snapshot.params['id'];
  }

  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
    
    // Nếu đóng popup, xem xét việc tải lại dữ liệu task
    if (!e) {
      console.log("Đã đóng popup task, kiểm tra việc tải lại dữ liệu");
      
      // Nếu có objectId hiện tại và không nhận được sự kiện cập nhật/xóa
      // thì tải lại dữ liệu để đảm bảo tính nhất quán
      if (this.currentObjectId) {
        console.log("Tải lại dữ liệu task cho objectId:", this.currentObjectId);
        this.loadTasksForObject(this.currentObjectId, true);
      } else {
        // Nếu không có currentObjectId, tải lại danh sách task chung
        console.log("Tải lại dữ liệu task chung");
        this.GetListTodoBodyService.body.objectId = null;
        this._store.dispatch(loadTodos());
        this.getData();
      }
      
      // Reset idTaskEdit và idParentTask
      this.idTaskEdit = '';
      this.idParentTask = '';
    }
  }
  idListTaskOpen: number = 0;
  handleOpenListOfTask(e: number) {
    this.idListTaskOpen = e;
    console.log(this.idListTaskOpen);

    this.cdr.detectChanges();
  }

  getData() {
    console.log("Đang lấy dữ liệu task không thuộc object nào");
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
      pageNumber: 1,
      sortField: "title",  // Sắp xếp theo tên (title)
      isAsc: true  // Thứ tự tăng dần (A-Z)
    }
    this.objectService.listObjectByUnit(body).subscribe(res => {
      if (res.data){
        console.log("Objects data:", res.data.items);
        
        // Tạo mảng objects với thuộc tính expanded = false
        const objects = res.data.items.map((obj: any) => ({
          ...obj,
          expanded: false
        }));
        
        // Sắp xếp objects theo title (trường hợp API không hỗ trợ sắp xếp)
        this.listObjects = objects.sort((a: any, b: any) => {
          const titleA = a.title ? a.title.toLowerCase() : '';
          const titleB = b.title ? b.title.toLowerCase() : '';
          return titleA.localeCompare(titleB);
        });
        
        console.log("Sorted objects by title:", this.listObjects);
        
        // Sau khi load objects, pre-load key results và tasks cho tất cả
        this.loadInitialKeyResults();
        this.loadInitialTasks();
        
        this.cdr.detectChanges();
        if (res.data.items.length < this.pageSize ) {
          this.hasMoreData = false;
        }
      }
    }, (err) => {
      this.message.error(err);
    })
  }

  // Phương thức tải trước dữ liệu key results cho tất cả objects
  private loadInitialKeyResults() {
    if (this.listObjects && this.listObjects.length > 0) {
      // Sử dụng setTimeout để không block UI thread
      setTimeout(() => {
        this.listObjects.forEach((object: any) => {
          this.loadKeyResultsForObject(object.id, false);
        });
      }, 100);
    }
  }

  // Thêm phương thức tương tự để load tasks
  private loadInitialTasks() {
    if (this.listObjects && this.listObjects.length > 0) {
      // Sử dụng setTimeout để không block UI thread
      setTimeout(() => {
        this.listObjects.forEach((object: any) => {
          this.loadTasksForObject(object.id, false);
        });
      }, 200); // Delay thêm chút so với key results để không gọi API cùng lúc
    }
  }

  handleActive(id: string){
    console.log("ID: ", id)
  }

  loadMoreTasks() {
    this.GetListTodoBodyService.body.pageSize += 10;
    this._store.dispatch(loadTodos());
    this.getData();
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
          this.listObjects = this.listObjects.filter((obj: any) => obj.id !== id);
          this.message.success('Xóa đối tượng thành công');
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

  toggleObjectExpand(object: any) {
    // Nếu đối tượng chưa có thuộc tính expanded, thêm vào với giá trị mặc định là false
    if (object.expanded === undefined) {
      object.expanded = false;
    }
    // Đảo ngược trạng thái expanded
    object.expanded = !object.expanded;

    // Nếu đang mở object, tải key results và tasks cho object đó
    if (object.expanded) {
      // Khi toggle, chỉ load nếu chưa load bao giờ (đã có cơ chế đánh dấu loadedKeyResults và loadedTasks)
      this.loadKeyResultsForObject(object.id, false);
      this.loadTasksForObject(object.id, false);
    }
    this.cdr.detectChanges();
  }

  // Phương thức để lưu trữ và lấy danh sách key results và tasks cho object
  private objectKeyResults: { [objectId: string]: any[] } = {};
  private objectTasks: { [objectId: string]: any[] } = {};
  private loadedKeyResults: { [objectId: string]: boolean } = {}; // Đánh dấu đã load key results hay chưa
  private loadedTasks: { [objectId: string]: boolean } = {}; // Đánh dấu đã load tasks hay chưa

  // Tải key results cho object
  loadKeyResultsForObject(objectId: string, forceRefresh: boolean = false) {
    // Nếu đã load rồi thì không load nữa, trừ khi force refresh
    if (this.loadedKeyResults[objectId] && !forceRefresh) {
      return;
    }

    const body = {
      objectId: objectId,
      pageSize: 100,
      pageNumber: 1
    };
    this.keyResultService.listKeyResultByObject(body).subscribe(
      (res: any) => {
        if (res.data) {
          this.objectKeyResults[objectId] = res.data.items;
          this.loadedKeyResults[objectId] = true; // Đánh dấu đã load
          this.cdr.detectChanges();
        }
      },
      (err: any) => {
        this.message.error('Không thể tải danh sách kết quả chính');
        console.error(err);
      }
    );
  }

  // Tải tasks cho object
  loadTasksForObject(objectId: string, forceRefresh: boolean = false) {
    // Nếu đã load rồi thì không load nữa, trừ khi force refresh
    if (this.loadedTasks[objectId] && !forceRefresh) {
      console.log(`Đã load task cho objectId ${objectId} trước đó, bỏ qua`);
      return;
    }

    const body = {
      objectId: objectId,
      pageSize: 100,
      pageNumber: 1,
      sortField: "dueDate",  // Sắp xếp theo dueDate
      isAsc: true  // Thứ tự tăng dần
    };
    console.log(`Đang gọi API lấy task cho objectId: ${objectId}`, body);
    
    this.todoService.getListToDo(body).subscribe(
      (res: any) => {
        console.log(`Kết quả API task cho objectId ${objectId}:`, res);
        
        // Kiểm tra cấu trúc dữ liệu trả về
        let items;
        if (res.data && res.data.items) {
          // Cấu trúc { data: { items: [...] } }
          items = res.data.items;
        } else if (res.items) {
          // Cấu trúc { items: [...] }
          items = res.items;
        } else if (Array.isArray(res)) {
          // Cấu trúc mảng trực tiếp
          items = res;
        } else {
          console.error(`Cấu trúc dữ liệu API không đúng format cho objectId ${objectId}`, res);
          this.loadedTasks[objectId] = true; // Đánh dấu đã load, mặc dù không có dữ liệu
          this.objectTasks[objectId] = [];
          return;
        }
        
        // Xử lý dữ liệu
        const tasks = items.map((item: any) => ({
          ...item,
          isDone: item.isDone !== undefined ? item.isDone : item.status === 10,
          done: item.status === 10 ? true : false,
          dueDate: moment(item.dueDate).format('DD/MM/YYYY').toLocaleString()
        }));
        
        // Sắp xếp tasks theo dueDate tăng dần ngay khi nhận được từ API
        const sortedTasks = tasks.sort((a: any, b: any) => {
          const dateA = a.dueDate ? moment(a.dueDate, 'DD/MM/YYYY').valueOf() : Infinity;
          const dateB = b.dueDate ? moment(b.dueDate, 'DD/MM/YYYY').valueOf() : Infinity;
          return dateA - dateB;
        });
        
        this.objectTasks[objectId] = sortedTasks;
        this.loadedTasks[objectId] = true; // Đánh dấu đã load task
        console.log(`Đã lưu ${sortedTasks.length} task cho objectId ${objectId} (đã sắp xếp theo ngày):`, sortedTasks);
        
        this.cdr.detectChanges();
      },
      (err: any) => {
        this.message.error('Không thể tải danh sách công việc');
        console.error(`Lỗi khi gọi API task cho objectId ${objectId}:`, err);
      }
    );
  }

  getKeyResultsForObject(objectId: string): any[] {
    return this.objectKeyResults[objectId] || [];
  }

  getTasksForObject(objectId: string): any[] {
    const tasks = this.objectTasks[objectId] || [];
    
    // Log để debug trạng thái của các task
    if (tasks.length > 0) {
      console.log(`Tasks for object ${objectId}:`, tasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        isDone: t.isDone,
        dueDate: t.dueDate
      })));
    }
    
    // Sắp xếp task theo dueDate tăng dần
    return [...tasks].sort((a, b) => {
      // Chuyển đổi định dạng ngày DD/MM/YYYY về định dạng YYYY-MM-DD để so sánh
      const dateA = a.dueDate ? moment(a.dueDate, 'DD/MM/YYYY').valueOf() : Infinity;
      const dateB = b.dueDate ? moment(b.dueDate, 'DD/MM/YYYY').valueOf() : Infinity;
      return dateA - dateB; // Sắp xếp tăng dần
    });
  }

  visibleAddKeyResult: boolean = false;
  currentObjectId: string = '';
  
  handleOpenAddKeyResult(objectId: string) {
    this.currentObjectId = objectId;
    this.visibleAddKeyResult = true;
    this.cdr.detectChanges();
  }
  
  handleVisibleKeyResultAdd(visible: boolean) {
    this.visibleAddKeyResult = visible;
    if (!visible && this.currentObjectId) {
      // Khi đóng popup, luôn force refresh để cập nhật data mới nhất
      this.loadKeyResultsForObject(this.currentObjectId, true);
    }
  }

  handleOpenAddTaskForObject(objectId: string) {
    this.idUnit = this.UnitIdService;
    this.currentObjectId = objectId;
    this.visibleAddTask = true;
    console.log("Mở popup add task cho objectId:", objectId);
    this.cdr.detectChanges();
  }

  // Xử lý event khi Key Result được tạo
  handleKeyResultCreated(keyResult: any) {
    if (this.currentObjectId && keyResult) {
      console.log("Key Result created:", keyResult);
      // Thêm key result mới vào danh sách nếu chưa có
      if (!this.objectKeyResults[this.currentObjectId]) {
        this.objectKeyResults[this.currentObjectId] = [];
      }
      // Thêm key result mới vào đầu danh sách
      this.objectKeyResults[this.currentObjectId].unshift(keyResult);
      this.cdr.detectChanges();
    }
  }

  // Mở dialog tạo Key Result mới
  openKeyResultDialog(objectId: string) {
    // Lưu objectId hiện tại
    this.currentObjectId = objectId;
    
    // Hiển thị dialog/modal tạo Key Result
    alert("Chức năng đang được phát triển!\nTạo Key Result cho Object: " + objectId);
    
    // Code sau này sẽ mở component tạo Key Result
    // Ví dụ:
    // this.visibleAddKeyResult = true;
    // this.cdr.detectChanges();
  }

  onTaskUpdated(taskInfo: {id: string, status: number}, objectId: string) {
    console.log(`Task ${taskInfo.id} updated with status ${taskInfo.status} for object ${objectId}`);
    
    // Cập nhật trạng thái task trong danh sách hiện tại
    if (this.objectTasks[objectId]) {
      const taskToUpdate = this.objectTasks[objectId].find((t: any) => t.id === taskInfo.id);
      
      if (taskToUpdate) {
        console.log('Found task to update:', taskToUpdate);
        
        // Cập nhật trạng thái
        taskToUpdate.status = taskInfo.status;
        
        // Đặt isDone và done dựa trên status
        // status = 10 là đã hoàn thành
        taskToUpdate.isDone = taskToUpdate.status === 10;
        taskToUpdate.done = taskToUpdate.status === 10;
        
        console.log('Task updated locally:', taskToUpdate);
        
        // Tạo tham chiếu mới cho danh sách task để đảm bảo Angular phát hiện thay đổi
        this.objectTasks[objectId] = [...this.objectTasks[objectId]];
        this.objectTasks = { ...this.objectTasks };
        
        // Force detection change
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      } else {
        console.warn(`Task ${taskInfo.id} not found in local cache for object ${objectId}`);
      }
    }
    
    // Xem xét việc reload tất cả các task cho object này (tùy chọn, có thể comment nếu gây chậm)
    // Đảm bảo chỉ reload sau khi UI đã được cập nhật
    setTimeout(() => {
      this.loadTasksForObject(objectId, true);
    }, 1000);
  }

  openEditTaskPopup(taskId: string) {
    console.log('Opening edit popup for task', taskId);
    
    // Lưu ID task cần chỉnh sửa
    this.idParentTask = '';  // Reset ID parent task nếu có
    
    // Thiết lập ID task cần chỉnh sửa
    this.idTaskEdit = taskId;
    
    // Mở popup
    this.visibleAddTask = true;
    
    this.cdr.detectChanges();
  }

  handleTaskDeleted(taskId: string) {
    console.log(`Task ${taskId} deleted`);
    
    // Tìm và xóa task khỏi danh sách task của tất cả các object
    if (this.objectTasks) {
      for (const objectId in this.objectTasks) {
        const taskIndex = this.objectTasks[objectId].findIndex((t: any) => t.id === taskId);
        if (taskIndex !== -1) {
          console.log(`Removing task from object ${objectId}`);
          this.objectTasks[objectId].splice(taskIndex, 1);
          
          // Force refresh
          this.objectTasks = { ...this.objectTasks };
          this.cdr.detectChanges();
          break; // Khi đã tìm thấy và xóa task, thoát khỏi vòng lặp
        }
      }
    }
  }

  handleTaskUpdated(updatedTask: any) {
    console.log('Task updated:', updatedTask);
    
    // Kiểm tra dữ liệu nhận được
    if (!updatedTask || !updatedTask.id) {
      console.error('Invalid updated task data received:', updatedTask);
      return;
    }
    
    // Tìm và cập nhật task trong danh sách của object
    let foundAndUpdated = false;
    
    if (this.objectTasks) {
      for (const objectId in this.objectTasks) {
        const taskIndex = this.objectTasks[objectId].findIndex((t: any) => t.id === updatedTask.id);
        if (taskIndex !== -1) {
          console.log(`Updating task in object ${objectId}`);
          
          // Cập nhật task với dữ liệu mới, đảm bảo giữ lại các trường không có trong updatedTask
          const updatedTaskObject = {
            ...this.objectTasks[objectId][taskIndex],
            ...updatedTask,
            // Đảm bảo các trường derived được cập nhật
            title: updatedTask.title,
            description: updatedTask.description,
            priority: updatedTask.priority,
            isDone: updatedTask.status === 10,
            done: updatedTask.status === 10
          };
          
          // Cập nhật dueDate nếu có trong dữ liệu mới
          if (updatedTask.dueDate) {
            updatedTaskObject.dueDate = moment(updatedTask.dueDate).format('DD/MM/YYYY');
          }
          
          // Cập nhật vào mảng
          this.objectTasks[objectId][taskIndex] = updatedTaskObject;
          console.log('Task updated to:', updatedTaskObject);
          
          // Áp dụng cập nhật
          this.objectTasks[objectId] = [...this.objectTasks[objectId]];
          this.objectTasks = { ...this.objectTasks };
          
          // Force detection change
          this.cdr.markForCheck();
          this.cdr.detectChanges();
          
          foundAndUpdated = true;
          break; // Khi đã tìm thấy và cập nhật task, thoát khỏi vòng lặp
        }
      }
    }
    
    if (!foundAndUpdated) {
      console.warn(`Task ${updatedTask.id} not found in local cache`);
    }
    
    // Nếu đang có object ID hiện tại, reload tasks cho object đó sau một thời gian ngắn
    if (this.currentObjectId) {
      setTimeout(() => {
        this.loadTasksForObject(this.currentObjectId, true);
      }, 500);
    }
  }

  // Handle the custom refresh event
  private handleRefreshEvent = (event: any) => {
    console.log('UnitListComponent: Received refresh event', event.detail);
    this.listObjectByUnit();
  };
  
  // Track subscriptions
  private refreshSubscription: Subscription;
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ToDOService } from '../../../core/api/todo.service';
import {
  changeParentToDoModel,
  changeObjectToDoModel,
  getListToDoModel,
} from '../../../core/model/toDo.model';
import { Store } from '@ngrx/store';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { loadTodos } from '../../../store/ToDo.action';
import { Subscription } from 'rxjs';
import { ValueUnitService } from '../../../core/shared/value-unit.service';

@Component({
  selector: 'app-popup-change-group',
  standalone: true,
  imports: [
    CommonModule,
    NzModalComponent,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './popup-change-group.component.html',
  styleUrl: './popup-change-group.component.scss',
})
export class PopupChangeGroupComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() idTask: any;
  @Output() visibleChangeGroup = new EventEmitter<boolean>();
  isConfirmLoading = false;
  size: NzSelectSizeType = 'default';
  sub: Subscription;
  _store = inject(Store);
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private ToDoService: ToDOService,
    private translate: TranslateService,
    private valueUnitService: ValueUnitService,
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  updateSuccess: string;
  error: string;
  ngOnInit(): void {
    this.valueUnitService.childrenUnits$.subscribe(childrenUnits => this.UnitList = childrenUnits);
    console.log("heee: ", this.UnitList);
    this.getData();
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('Toast.Error')
      .subscribe((value) => (this.error = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('Toast.Error')
        .subscribe((value) => (this.error = value));
    });
    const UnitControl = this.form.get('Unit') as FormControl;
    this.sub = UnitControl.valueChanges.subscribe((value) => {
      const idUnit = value?.replaceAll('-', '');
      const body: getListToDoModel = {
        pageNumber: 1,
        pageSize: 100,
      };
      if (isNaN(Number(idUnit))) {
        body.objectId = value;
      }
      this.ToDoService.getListToDo(body).subscribe((data) => {
        this.toDoList = data.items;
        this.form.get('Task')?.reset();
        this.form.patchValue({ Task: this.parrentTodo });
      });
    });
  }
  public form: FormGroup = this.fb.group({
    Unit: [null],
    Task: [null],
  });
  UnitList: any = [];
  toDoList: any = [];
  parrentTodo: any;
  taskDetail: any;
  _snackbar = inject(SnackbarService);
  handleOk(): void {
    // this.ToDoService.getToDoDetail(this.form.get('Task')?.value).subscribe(
    //   (dataTask) => {
    //     const idUnit = dataTask.unitId?.replaceAll('-', '');
    //     if (
    //       !isNaN(Number(idUnit)) ||
    //       this.taskDetail.unitId === dataTask.unitId
    //     ) {
    //       const body: changeParentToDoModel = {
    //         id: this.idTask,
    //         parentId: this.form.get('Task')?.value,
    //       };
    //       const bodyChangeUnitId: changeUnitidToDoModel = {
    //         id: this.idTask,
    //         unitId: this.form.get('Unit')?.value,
    //       };
    //       if (this.form.get('Task')?.value) {
    //         this.ToDoService.changeParentToDo(body).subscribe((data) => {
    //           if (!this.form.get('Unit')?.value)
    //             this._snackbar.success(this.updateSuccess);
    //           this._store.dispatch(loadTodos());
    //         });
    //       }
    //       if (this.form.get('Unit')?.value) {
    //         this.ToDoService.changeUnitId(bodyChangeUnitId).subscribe(
    //           (data) => {
    //             this._snackbar.success(this.updateSuccess);
    //             this._store.dispatch(loadTodos());
    //           },
    //         );
    //       }
    //       console.log('Button ok clicked!');
    //       this.visibleChangeGroup.emit(false);
    //     } else {
    //       this._snackbar.error(this.error);
    //     }
    //   },
    // );
    const body: changeParentToDoModel = {
      id: this.idTask,
      parentId: this.form.get('Task')?.value,
    };
    const bodyChangeUnitId: changeObjectToDoModel = {
      id: this.idTask,
      objectId: this.form.get('Unit')?.value,
    };
    if (this.form.get('Task')?.value) {
      this.ToDoService.changeParentToDo(body).subscribe((data) => {
        if (!this.form.get('Unit')?.value)
          this._snackbar.success(this.updateSuccess);
        this._store.dispatch(loadTodos());
      });
    }
    if (this.form.get('Unit')?.value) {
      this.ToDoService.changeObjectId(bodyChangeUnitId).subscribe(
        (data) => {
          this._snackbar.success(this.updateSuccess);
          this._store.dispatch(loadTodos());
        },
      );
    }
    console.log('Button ok clicked!');
    this.visibleChangeGroup.emit(false);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleChangeGroup.emit(false);
  }

  getData() {
    this.ToDoService.getToDoDetail(this.idTask).subscribe((dataTask) => {
      this.taskDetail = dataTask;
      this._store.select('toDoReduce').subscribe((data: any) => {
        this.toDoList = data.items.filter(
          (item: any) => item.id !== dataTask.id && item.id,
        );
        this.form.patchValue({
          Task: dataTask.parentTodoItemId,
        });
        this.parrentTodo = dataTask.parentTodoItemId;
      });
      this._store.select('unitReduce').subscribe((data: any) => {
        this.UnitList = data?.data.name;
        this.form.patchValue({
          Unit: dataTask.unitId,
        });
        const idUnit = dataTask.unitId?.replaceAll('-', '');
        if (isNaN(Number(idUnit))) {
          this.form.get('Unit')?.disable();
        }
      });
    });
  }
}
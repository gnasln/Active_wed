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
import { ToDOService } from '../../../core/api/todo.service';
import moment from 'moment';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PriorityLevel, TodoStatus } from '../../../core/enums/todo';
import { FormsModule } from '@angular/forms';
import { PopupAddEditSubTaskComponent } from '../../task/popup-add-edit-sub-task/popup-add-edit-sub-task.component';
import { UnitPopupAddEditSubComponent } from '../unit-popup-add-edit-sub/unit-popup-add-edit-sub.component';
import { unitService } from '../../../core/api/unit.service';
import { UnitPopupAddEditComponent } from '../unit-popup-add-edit/unit-popup-add-edit.component';
@Component({
  selector: 'app-unit-popup-sub-list',
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
    UnitPopupAddEditSubComponent,
    UnitPopupAddEditComponent
  ],
  templateUrl: './unit-popup-sub-list.component.html',
  styleUrl: './unit-popup-sub-list.component.scss'
})
export class UnitPopupSubListComponent {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() idTaskDetail: any;
  @Output() visibleListPopUpSubTask = new EventEmitter<boolean>();
  idTaskParent: string;
  idTaskParentNoSend: string;
  dataList: any[];
  priorityLevelEnum: any = PriorityLevel;
  listSubUnits: any[];  
  constructor(
    private toDoServices: ToDOService,
    private cdr: ChangeDetectorRef,
    private unitService: unitService,
  ) {}
  _store = inject(Store);

  ngOnInit(): void {
    console.log("idUnit: ", this.idUnit);
    this.idTaskParentNoSend = this.idTaskDetail;
    this.getData(this.idTaskDetail);
    this.listSubUnit();
  }

  listSubUnit() {
    this.unitService.getListUnitByParentUnit(this.idUnit).subscribe(res => {
      this.listSubUnits = res.data;
      this.cdr.detectChanges();
      console.log("ChildrenUnits: ", this.listSubUnits)
    })
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
  // handleOpenAddSubTaskToParrent(
  //   idTaskDetail: string = this.dataList[0]?.parentTodoItemId ||
  //     this.idTaskParentNoSend,
  // ) {
  //   this.idTaskParent = idTaskDetail;
  //   this.idTaskDetail = '';
  //   this.visibleAddTask = true;
  //   this.cdr.detectChanges();
  //   console.log("okok")
  // }
  handleOpenAddSubUnitToParrent(){
    this.idTaskDetail = '';
    this.visibleAddTask = true;
    this.cdr.detectChanges();
    console.log("okok")
  }
  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
    this.getData(this.idTaskParentNoSend);
  }

  handleViewListUnitChil(unitId: any){
    const unitIndex = this.listSubUnits.findIndex((unitChil: any) => unitChil.id === unitId.id);
    if (unitIndex !== -1) {
      this.listSubUnits[unitIndex] = unitId;
    } else {
      this.listSubUnits.push(unitId);
    }
    this.cdr.detectChanges();
  }
}

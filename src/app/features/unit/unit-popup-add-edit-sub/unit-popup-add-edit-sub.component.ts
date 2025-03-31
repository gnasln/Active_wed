import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { loadTodos } from '../../../store/ToDo.action';
import {
  createToDoModel,
  updateToDoModel,
} from '../../../core/model/toDo.model';
import moment from 'moment';
import { PriorityLevel, TodoStatus } from '../../../core/enums/todo';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToDOService } from '../../../core/api/todo.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { Store } from '@ngrx/store';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { unitService } from '../../../core/api/unit.service';
import { loadUnits } from '../../../store/Unit.action';
import {
  createUnitModel,
  updateUnitModel,
} from '../../../core/model/unit.model';
import { PopupAddMemberComponent } from '../../unit/unit-popup-add-edit/popup-add-member/popup-add-member.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ValueUnitService } from '../../../core/shared/value-unit.service';

@Component({
  selector: 'app-unit-popup-add-edit-sub',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    NzRadioModule,
    FormsModule,
    CommonModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    PopupAddMemberComponent,
    NzPopconfirmModule,
  ],
  templateUrl: './unit-popup-add-edit-sub.component.html',
  styleUrl: './unit-popup-add-edit-sub.component.scss'
})
export class UnitPopupAddEditSubComponent {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() idUnitSubList: any;
  @Input() idTaskDetail: any;
  @Output() visibleList = new EventEmitter<boolean>();
  @Output() unitListChilCreated = new EventEmitter<any>(); 
  TenantIdService: any;
  deleteSuccess: string;
  updateSuccess: string;
  createSuccess: string;
  isConfirmLoading = false;
  _snackBar = inject(SnackbarService);
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private unitService: unitService,
    private translate: TranslateService,
    private message: NzMessageService,
    private valueUnitService: ValueUnitService,
  ) {
    this.TenantIdService = this.valueUnitService.tenantIdSource
  }
  ngOnInit(): void {
    this.translate
      .get('Toast.createSuccess')
      .subscribe((value) => (this.createSuccess = value));
    this.translate
      .get('Toast.updateSuccess')
      .subscribe((value) => (this.updateSuccess = value));
    this.translate
      .get('Toast.deleteSuccess')
      .subscribe((value) => (this.deleteSuccess = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('Toast.createSuccess')
        .subscribe((value) => (this.createSuccess = value));
      this.translate
        .get('Toast.updateSuccess')
        .subscribe((value) => (this.updateSuccess = value));
      this.translate
        .get('Toast.deleteSuccess')
        .subscribe((value) => (this.deleteSuccess = value));
    });
    if (this.idUnit) {
      this.getDetailUnit();
    }
    this.getMemberOfUnit();
  }
  public form: FormGroup = this.fb.group({
    unitTitle: [null, Validators.required],
    member: [null, Validators.required],
    description: [null],
  });
  _store = inject(Store);
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  handleOk(): void {
    const body: createUnitModel = {
      name: this.form.get('unitTitle')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      managerId: this.userInfor?.sub,
      managerName: this.userInfor?.name,
      memberIds: null,
      memberNames: null,
      parentUnitId: this.idUnitSubList,
      tenantId: this.TenantIdService
    };
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    this.unitService.createUnit(body).subscribe((data) => {
        this.unitListChilCreated.emit(data.data); 
        this.visibleList.emit(false);
        this.message.success('Create Unit success!');
        this.cdr.detectChanges();
    });
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleList.emit(false);
  }
  statusList = [
    {
      label: 'Status 1',
      value: 1,
    },
    {
      label: 'Status 2',
      value: 2,
    },
    {
      label: 'Status 3',
      value: 3,
    },
  ];

  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  handleDataPopUpAddMember(e: any) {
    this.visiblePopUpAddMember = e.isVisible;
    this.form.patchValue({
      member: e.members.map((member: any) => ({
        memberId: member.userId,
        memberName: member.userName,
      })),
    });
    this.listMember = e.members.map((member: any) => ({
      member,
      img: '../../../../assets/img/avatar.png',
    }));
    this.cdr.detectChanges();
  }
  handleOpenPopUpAddMember() {
    this.visiblePopUpAddMember = true;
    // this.dataMember = this.form.get('member')?.value;
  }

  // handleEditUnit(e: any) {
  //   this.visiblePopUpAddMember = true;
  //   this.cdr.detectChanges();
  // }

  listMember: any = [];
  @ViewChildren('member') components: QueryList<UnitPopupAddEditSubComponent>;
  public memberCount: number;
  ngAfterViewChecked(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount = this.listMember.length - 4;
    this.cdr.detectChanges();
  }

  handleDeleteUnit() {
    this.unitService.deleteUnit(this.idUnit).subscribe(() => {
      this._snackBar.success(this.deleteSuccess);
      this._store.dispatch(loadUnits());
      this.visibleList.emit(false);
    });
  }
  handleEditUnit() {
    const body: updateUnitModel = {
      id: this.idUnit,
      name: this.form.get('unitTitle')?.value,
      description: this.form.get('description')?.value,
      members: this.form.get('member')?.value,
    };
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    this.unitService.updateUnit(body).subscribe((data) => {
      this._store.dispatch(loadUnits());
    });
    const bodyAddMember: any = {
      unitId: this.idUnit,
      members: this.form.get('member')?.value,
    };
    this.unitService.addMemberToUnit(bodyAddMember).subscribe((data) => {});
    this.visibleList.emit(false);
  }

  getDetailUnit() {
    this.unitService.getDetailUnit(this.idUnit).subscribe((data) => {
      this.form.patchValue({
        unitTitle: data?.data.name,
        description: data?.data.description,
      });
    });
  }
  getMemberOfUnit() {
    const body = { unitId: this.idUnit };
    this.unitService.getMember(body).subscribe((data) => {
      this.dataMember = data;
      this.form.patchValue({
        member: this.dataMember,
      });
      this.listMember = this.form.get('member')?.value.map((member: any) => ({
        member,
        img: '../../../../assets/img/avatar.png',
      }));
      this.cdr.detectChanges();
    });
  }

  visiblePopUpSubTaskList: boolean = false;
  handlevisiblePopUpSubTaskList(e: any) {
    this.visiblePopUpSubTaskList = e;
  }
  handleOpenPopUpSubTaskList(e: any) {
    // this.idTask = e;
    console.log("okokok")
    this.visiblePopUpSubTaskList = true;
  }
}

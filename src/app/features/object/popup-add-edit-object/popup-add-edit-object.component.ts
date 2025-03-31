import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { PopupAddMemberComponent } from '../../unit/unit-popup-add-edit/popup-add-member/popup-add-member.component';
import moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ObjectService } from '../../../core/api/object.service';
import { createObjectModel } from '../../../core/model/object.model';

@Component({
  selector: 'app-popup-add-edit-object',
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
  ],
  templateUrl: './popup-add-edit-object.component.html',
  styleUrl: './popup-add-edit-object.component.scss',
})
export class PopupAddEditObjectComponent {
  @Input() isVisible: boolean = false;
  @Input() idUnit: any;
  @Input() selectedTenant: any = null; // Thêm input cho tenant
  @Input() selectedUnit: any = null;
  @Output() visibleListObject = new EventEmitter<boolean>();
  isConfirmLoading = false;
  priorityLevelHigh: string;
  priorityLevelMedium: string;
  priorityLevelLow: string;
  priorityLevelList: any = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private translate: TranslateService,
    private objectService: ObjectService,
    private message: NzMessageService,
  ) {}

  handleOk(): void {
    const body: createObjectModel = {
      title: this.form.get('target')?.value,
      description: this.form.get('description')?.value,
      createdDate: moment().local().format('YYYY-MM-DD'),
      unitId: this.idUnit,
      priority: this.form.get('priorityLevel')?.value,
      memberIds: this.listMember.map((member: any) => member.member),
      memberNames: this.listMemberName
    };
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === '' || body[key] === 0) {
        delete body[key];
      }
    });
    this.objectService.createObject(body).subscribe((res: any) => {
      if(res.data) {
        this.visibleListObject.emit(false);
        this.message.success('Create Object success!');
        this.cdr.detectChanges();
      }
    }, (err: any) => {
      this.message.error(err);
    })
    this.visibleListObject.emit(false);
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleListObject.emit(false);
  }

  ngOnInit(): void {
    this.translate
      .get('PopUpAddEditObject.priorityHigh')
      .subscribe((value) => (this.priorityLevelHigh = value));
    this.translate
      .get('PopUpAddEditObject.priorityMedium')
      .subscribe((value) => (this.priorityLevelMedium = value));
    this.translate
      .get('PopUpAddEditObject.priorityLow')
      .subscribe((value) => (this.priorityLevelLow = value));

    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('PopUpAddEditObject.priorityHigh')
        .subscribe((value) => (this.priorityLevelHigh = value));
      this.translate
        .get('PopUpAddEditObject.priorityMedium')
        .subscribe((value) => (this.priorityLevelMedium = value));
      this.translate
        .get('PopUpAddEditObject.priorityLow')
        .subscribe((value) => (this.priorityLevelLow = value));
    });
    this.priorityLevelList = [
      {
        label: this.priorityLevelHigh,
        value: 1,
      },
      {
        label: this.priorityLevelMedium,
        value: 2,
      },
      {
        label: this.priorityLevelLow,
        value: 3,
      },
    ];
    this.cdr.detectChanges();
  }

  public form: FormGroup = this.fb.group({
    title: [null, Validators.required],
    target: [null, Validators.required],
    member: [null, Validators.required],
    priorityLevel: [null, Validators.required],
    deadline: [null, Validators.required],
  });
  dataMember: any = [];
  visiblePopUpAddMember: boolean = false;
  // handleDataPopUpAddMember(e: any) {
  //   this.visiblePopUpAddMember = e.isVisible;
  //   this.form.patchValue({ member: e.members });
  //   this.listMember = this.form.get('member')?.value.map((member: any) => ({
  //     member,
  //     img: '../../../../assets/img/avatar.png',
  //   }));
  //   this.cdr.detectChanges();
  // }

  listMember: any = [];
  listMemberName = [];
  @ViewChildren('member') components: QueryList<PopupAddEditObjectComponent>;
  handleDataPopUpAddMember(e: any) {
    this.visiblePopUpAddMember = e.isVisible;
    this.form.patchValue({
      member: e.members.map((member: any) => ({
        memberId: member.userId,
        memberName: member.userName,
      })),
    });
    this.listMemberName = e.membersName;
    this.listMember = e.members.map((member: any) => ({
      member,
      img: '../../../../assets/img/avatar.png',
    }));
    this.cdr.detectChanges();
  }
  handleOpenPopUpAddMember() {
    this.visiblePopUpAddMember = true;
    this.dataMember = this.form.get('member')?.value;
  }

  handleEditUnit(e: any) {
    this.visiblePopUpAddMember = true;
    this.cdr.detectChanges();
  }


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
    const selectOption = document.querySelectorAll(
      '.ant-select-item-option-content',
    );
    selectOption.forEach((option: any) => {
      if (option.innerText === 'High' || option.innerText === 'Cao') {
        option.classList.add('text-[#EE2E2E]');
      } else if (option.innerText === 'Medium' || option.innerText === 'Vừa') {
        option.classList.add('text-[#FFB800]');
      } else if (option.innerText === 'Low' || option.innerText === 'Thấp') {
        option.classList.add('text-[#10D70C]');
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { unitService } from '../../../../core/api/unit.service';
import { Subject, debounce, debounceTime } from 'rxjs';
import { ObjectService } from '../../../../core/api/object.service';

@Component({
  selector: 'app-popup-add-member',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
  ],
  templateUrl: './popup-add-member.component.html',
  styleUrl: './popup-add-member.component.scss',
})
export class PopupAddMemberComponent implements OnInit {
  isConfirmLoading = false;
  @Input() isVisiblePopUpAddMember: boolean = false;
  @Input() dataMember: any = [];
  @Input() unitID: string;
  @Input() idTenant: string;
  @Input() objectId: string;
  @Input() type: string;
  @Output() data = new EventEmitter<any>();
  @Output() memberCheckedChange = new EventEmitter<any[]>();

  searchSubject = new Subject<string>();

  public searchQuery: string = '';
  public filteredListOfOption: any = [];
  public memberChecked: { userId: string; userName: string }[] = [];
  checked = true;

  selectedValue = null;
  public listOfOption: any = [];
  nzFilterOption = (): boolean => true;
  modeSelect: any;
  handleOk(): void {
    const members = this.memberChecked.map(member => member.userId);
    const membersName = this.memberChecked.map(member => member.userName);
    this.data.emit({
      isVisible: false,
      members: members,
      membersName: membersName
    });
  }


  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    if (this.dataMember) {
      this.data.emit({
        isVisible: false,
        members: [...this.dataMember],
      });
    } else {
      this.data.emit({
        isVisible: false,
        members: [],
      });
    }
  }
  memberList: any = [];
  searching = false;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private unitService: unitService,
    private objectService: ObjectService,
  ) {}
  ngOnInit(): void {
    if (this.type === 'task') {
      this.modeSelect = 'multiple';
    } else if (this.type === 'unit') {
      this.modeSelect = 'multiple';
    } else if (this.type === 'object') {
      this.modeSelect = 'multiple';
    } else if (this.type === 'keyResult') {
      this.modeSelect = 'multiple';
    }
    const idUnit = this.unitID?.replaceAll('-', '');
    this.getMembers();
    this.memberChecked = [...this.dataMember];
    console.log("Data MemberChecked ở OnInit: ", this.memberChecked)
  }


  public form: FormGroup = this.fb.group({
    members: [null, Validators.required],
  });
  bodyGetMember = {
    includeAllMemberForUnit: true,
    unitId: null,
  };
  getMembers() {
    if(this.unitID && this.type === 'unit' || this.unitID && this.type === 'task' || this.unitID && this.type === 'object'){
      const body = {
        unitId: this.unitID
      }
      this.unitService.getMemberUnitChil(body).subscribe((member) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        member.data.forEach((item: any) => {
          listOfOption.push({
            value: item.memberId,
            text: item.memberName
          });
        });
        this.listOfOption = listOfOption;
        this.filteredListOfOption = listOfOption; 
      });
    } else if(this.objectId && this.type === 'keyResult'){
      this.objectService.getMemberObject(this.objectId).subscribe((member) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        member.data.forEach((item: any) => {
          listOfOption.push({
            value: item.userId,
            text: item.userName
          });
        });
        this.listOfOption = listOfOption;
        this.filteredListOfOption = listOfOption; 
      })
    } else {
      this.unitService.getMemberUnitFather(this.idTenant).subscribe((member) => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        member.data.forEach((item: any) => {
          listOfOption.push({
            value: item.userId,
            text: item.userName
          });
        });
        this.listOfOption = listOfOption;
        this.filteredListOfOption = listOfOption; 
      });
    }
  }
  filterOptions(query: string): void {
    this.filteredListOfOption = this.listOfOption.filter((option: any) =>
      option.text.toLowerCase().includes(query.toLowerCase())
    );
  }
  search(value: string): void {
    this.searching = value.length > 0;
    this.searchQuery = value;
    this.filterOptions(value);
  }

  // onCheckboxChange(userId: string, userName: string, event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   const isChecked = inputElement.checked;
  
  //   if (isChecked) {
  //     if (!this.memberChecked.some(member => member.userId === userId)) {
  //       this.memberChecked.push({ userId, userName });
  //     }
  //   } else {
  //     this.memberChecked = this.memberChecked.filter(member => member.userId !== userId);
  //   }
  // }

  onCheckboxChange(value: string, text: string, event: any) {
    if (event.target.checked) {
      if (!this.memberChecked.some(member => member.userId === value)) {
        this.memberChecked.push({ userId: value, userName: text });
      }
    } else {
      this.memberChecked = this.memberChecked.filter(member => member.userId !== value);
    }
    this.emitMemberChecked();
  }
  
  isMemberChecked(userId: string): boolean {
    return this.dataMember.some((member: any) => member.userId === userId);
  }

  emitMemberChecked() {
    this.memberCheckedChange.emit(this.memberChecked);
  }
  
}

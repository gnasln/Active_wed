import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { unitService } from '../../../../core/api/unit.service';
import { HttpClient } from '@angular/common/http';
import { Subject, debounce, debounceTime } from 'rxjs';
@Component({
  selector: 'app-popup-add-member',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  styleUrl: './popup-add-member.component.scss'
})
export class PopupAddMemberComponent implements OnInit{
  isConfirmLoading = false;
  @Input() isVisiblePopUpAddMember: boolean = false;
  @Input() dataMember: any = [];
  @Input() unitID: string;
  @Input() type: string;
  @Output() data = new EventEmitter<any>();
  modeSelect: any;
  searchSubject = new Subject<string>();

  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  fullListOfOption: Array<{ value: string; text: string }> = [];
  // listOfOption: any = [];
  nzFilterOption = (): boolean => true;

  handleOk(): void {
    const selectedMembers = this.form.get('members')?.value || [];
    const selectedNames = selectedMembers.map((value: any) => {
      const option = this.fullListOfOption.find(opt => opt.value === value);
      return option ? option.text : null;
    }).filter((name: any) => name !== null);
    console.log("selectedNames: ", selectedNames)

    this.data.emit({
      isVisible: false,
      members: selectedMembers,
      membersName: selectedNames
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
    private httpClient: HttpClient
  ) {
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      if (!this.searching) {
        return;
      }
      this.unitService.getMemberTenant(value).subscribe(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.data.forEach((item: any) => {
          listOfOption.push({
            value: item.userId,
            text: item.userName
          });
        });
        this.listOfOption = listOfOption;
        console.log("listOfOption: ", this.listOfOption)

        this.fullListOfOption.push(...listOfOption);
        console.log("fullListOfOption: ", this.fullListOfOption)
      });
    });
  }
  // ngOnInit(): void {
  //   if (this.type === 'task') {
  //     this.modeSelect = 'default';
  //   } else if (this.type === 'unit') {
  //     this.modeSelect = 'multiple';
  //   }
  //   const idUnit = this.unitID?.replaceAll('-', '');
  //   if (!isNaN(Number(idUnit)) || !this.unitID) {
  //     // this.getMembers();
  //   } else {
  //     this.getMembersUnit();
  //   }

  //   if (this.dataMember && this.dataMember.length > 0) {
  //     console.log("this.DataMember: ", this.dataMember)
  //     this.form.patchValue({
  //       members: this.dataMember.map((member: any) => member.userId)
  //     });
  //     this.selectedValue = this.dataMember.map((member: any) => member.userId);
  //     this.cdr.detectChanges();
  //   }
  // }

  ngOnInit(): void {
    if (this.type === 'task') {
        this.modeSelect = 'default';
    } else if (this.type === 'unit') {
        this.modeSelect = 'multiple';
    }

    if (this.dataMember && this.dataMember.length > 0) {
        console.log("this.DataMember: ", this.dataMember);
        
        this.listOfOption = this.dataMember.map((member: any) => ({
            value: member.userId,
            text: member.userName
        }));

        this.fullListOfOption = [...this.listOfOption];

        this.form.patchValue({
            members: this.dataMember.map((member: any) => member.userId)
        });    
        this.selectedValue = this.dataMember.map((member: any) => member.userId);
        this.cdr.detectChanges(); 
    }
}


  public form: FormGroup = this.fb.group({
    members: [null, Validators.required],
  });


  search(value: string): void {
    this.searching = value.length > 0;
    this.searchSubject.next(value);
  }

  getMembersUnit() {
    const body = {
      unitId: this.unitID,
    };
    // this.unitService.getMember(body).subscribe((member:any) => {
    //   this.memberList = member.map((mem: any) => ({
    //     userId: mem.memberId,
    //     userName: mem.memberName,
    //   }));
    //   if (this.type === 'task') {
    //     const memberInit = this.dataMember?.map((m: any) => m.userId);

    //     this.form.patchValue({
    //       members: memberInit[0],
    //     });
    //   } else {
    //     const bodyGetMember = {
    //       includeAllMemberForUnit: true,
    //       unitId: null,
    //     };
    //     this.unitService.getMemberList(bodyGetMember).subscribe((member: any) => {
    //       this.memberList = member;

    //       const memberInit = this.dataMember?.map((m: any) => m.memberId);
    //       this.form.patchValue({
    //         members: memberInit,
    //       });
    //     });
    //   }
    // });
  }
}

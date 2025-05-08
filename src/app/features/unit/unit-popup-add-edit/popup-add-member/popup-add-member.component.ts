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

// Thêm định nghĩa interface cho thành viên
interface Member {
  userId?: string;
  userName?: string;
  memberId?: string;
  memberName?: string;
}

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
  @Output() memberCheckedChange = new EventEmitter<Member[]>();

  searchSubject = new Subject<string>();

  public searchQuery: string = '';
  public filteredListOfOption: any = [];
  public memberChecked: Member[] = [];
  checked = true;

  selectedValue = null;
  public listOfOption: any = [];
  nzFilterOption = (): boolean => true;
  modeSelect: any;
  handleOk(): void {
    console.log('handleOk called with memberChecked:', this.memberChecked);
    
    // Map memberNames dựa vào loại thành viên
    let membersName: string[] = [];
    
    if (this.type === 'keyResult') {
      // Sử dụng memberName nếu có
      membersName = this.memberChecked.map(member => member.memberName || '');
    } else {
      // Sử dụng userName nếu có
      membersName = this.memberChecked.map(member => member.userName || '');
    }
    
    this.data.emit({
      isVisible: false,
      members: this.memberChecked,
      membersName: membersName
    });
  }


  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    console.log('handleCancel called');
    
    // Trả về dữ liệu ban đầu (dataMember)
    let membersName: string[] = [];
    
    if (this.dataMember && this.dataMember.length > 0) {
      if (this.type === 'keyResult') {
        membersName = this.dataMember.map((member: any) => member.memberName || '');
      } else {
        membersName = this.dataMember.map((member: any) => member.userName || '');
      }
    }
    
    this.data.emit({
      isVisible: false,
      members: this.dataMember || [],
      membersName: membersName
    });
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
    
    // Khởi tạo dữ liệu thành viên đã chọn
    if (this.dataMember && this.dataMember.length > 0) {
      this.memberChecked = [...this.dataMember];
    } else {
      this.memberChecked = [];
    }
    
    console.log("Type:", this.type);
    console.log("Object ID:", this.objectId);
    console.log("Data MemberChecked ở OnInit:", this.memberChecked);
    
    // Lấy danh sách thành viên
    this.getMembers();
  }


  public form: FormGroup = this.fb.group({
    members: [null, Validators.required],
  });
  bodyGetMember = {
    includeAllMemberForUnit: true,
    unitId: null,
  };
  getMembers() {
    console.log('getMembers() called - Type:', this.type, ', ObjectId:', this.objectId, ', UnitID:', this.unitID);
    
    if(this.unitID && (this.type === 'unit' || this.type === 'task' || this.type === 'object')){
      const body = {
        unitId: this.unitID
      }
      console.log('Getting members from unit:', this.unitID);
      this.unitService.getMemberUnitChil(body).subscribe((member) => {
        console.log('Unit members response:', member);
        const listOfOption: Array<{ value: string; text: string }> = [];
        if (member && member.data) {
          member.data.forEach((item: any) => {
            listOfOption.push({
              value: item.memberId,
              text: item.memberName
            });
          });
        } else {
          console.error('Invalid member data format from getMemberUnitChil:', member);
        }
        this.listOfOption = listOfOption;
        this.filteredListOfOption = listOfOption; 
        console.log('Processed list of options:', this.listOfOption);
      });
    } else if(this.objectId && this.type === 'keyResult'){
      console.log('Getting members from object for keyResult:', this.objectId);
      this.objectService.getMemberObject(this.objectId).subscribe({
        next: (response) => {
          console.log('Object members response for keyResult:', response);
          const listOfOption: Array<{ value: string; text: string }> = [];
          
          // Xử lý phản hồi API
          if (response && response.data && Array.isArray(response.data)) {
            response.data.forEach((item: any) => {
              // Sử dụng memberId và memberName thay vì userId và userName
              const memberId = item.memberId || '';
              const memberName = item.memberName || 'Thành viên không có tên';
              
              if (memberId) {
                listOfOption.push({
                  value: memberId,
                  text: memberName
                });
                console.log('Added member:', { value: memberId, text: memberName });
              }
            });
          } else {
            console.error('Invalid member data format from getMemberObject:', response);
          }
          
          this.listOfOption = listOfOption;
          this.filteredListOfOption = listOfOption;
          console.log('Final list of options for keyResult:', this.listOfOption);
        },
        error: (err) => {
          console.error('Error fetching object members:', err);
        }
      });
    } else {
      console.log('Getting members from tenant:', this.idTenant);
      this.unitService.getMemberUnitFather(this.idTenant).subscribe((member) => {
        console.log('Tenant members response:', member);
        const listOfOption: Array<{ value: string; text: string }> = [];
        if (member && member.data) {
          member.data.forEach((item: any) => {
            listOfOption.push({
              value: item.userId,
              text: item.userName
            });
          });
        }
        this.listOfOption = listOfOption;
        this.filteredListOfOption = listOfOption; 
        console.log('Processed tenant members:', this.listOfOption);
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
      // Khi chọn thành viên
      if (!this.isMemberChecked(value)) {
        // Kiểm tra loại thành viên (memberId hoặc userId) dựa vào loại component
        if (this.type === 'keyResult') {
          // Key result sử dụng memberId và memberName
          this.memberChecked.push({ memberId: value, memberName: text });
        } else {
          // Các loại khác sử dụng userId và userName
          this.memberChecked.push({ userId: value, userName: text });
        }
      }
    } else {
      // Khi bỏ chọn thành viên
      this.memberChecked = this.memberChecked.filter(member => 
        !((member.userId === value) || (member.memberId === value))
      );
    }
    this.emitMemberChecked();
  }
  
  isMemberChecked(value: string): boolean {
    // Kiểm tra xem thành viên đã được chọn chưa
    // Hỗ trợ cả trường hợp memberId và userId
    return this.memberChecked.some((member: any) => 
      (member.userId === value) || (member.memberId === value)
    );
  }

  emitMemberChecked() {
    this.memberCheckedChange.emit(this.memberChecked);
  }
  
}

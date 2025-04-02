import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { rePassValidator } from '../../../../shared/validate/check-repass.directive';
import { ManagermentService } from '../../../../core/api/managerment.service';

interface UserData {
  id: string;
  userName: string;
  tenantName: string;
  email: string;
  numberPhone: string;
  roleUser: string;
  status: string;
  activationDate: string;
}

@Component({
  selector: 'app-user-management-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatLabel,
    CommonModule,
    NzModalComponent,
    NzModalModule,
    NzIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    TranslateModule,
    NzButtonModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzOptionComponent,
    NzDatePickerModule,
    NzInputModule
  ],
  templateUrl: './user-management-edit.component.html',
  styleUrl: './user-management-edit.component.scss'
})
export class UserManagementEditComponent implements OnInit {
  @Input() isVisiblePopUpEditManagement: boolean = true;
  @Input() userData: UserData | null = null;
  @Output() visiblePopUpEditManagement = new EventEmitter<boolean>();
  @Output() userUpdated = new EventEmitter<UserData>();

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private managermentService: ManagermentService,
  ) {
    this.editForm = this.fb.group({
      id: [''],
      userName: [{ value: '', disabled: true }],
      tenantName: [''],
      email: ['', [Validators.email]],
      numberPhone: [''],
      roleUser: [''],
      status: [''],
      activationDate: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    if (this.userData) {
      this.editForm.patchValue({
        id: this.userData.id,
        userName: this.userData.userName,
        tenantName: this.userData.tenantName,
        email: this.userData.email,
        numberPhone: this.userData.numberPhone,
        roleUser: this.userData.roleUser,
        status: this.userData.status,
        activationDate: this.userData.activationDate
      });
    }
  }

  handleOk(): void {
    if (this.editForm.valid) {
      // Get the current form values
      const formValues = this.editForm.getRawValue();
      
      // Create updated user object by merging existing data with form values
      const updatedUser: UserData = {
        ...this.userData, // Keep all existing values
        tenantName: formValues.tenantName || this.userData?.tenantName || '',
        email: formValues.email || this.userData?.email || '',
        numberPhone: formValues.numberPhone || this.userData?.numberPhone || '',
        roleUser: formValues.roleUser || this.userData?.roleUser || '',
        status: formValues.status || this.userData?.status || '',
        id: this.userData?.id || '',
        userName: this.userData?.userName || '',
        activationDate: this.userData?.activationDate || ''
      };

      this.managermentService.updateAccountManagement(updatedUser).subscribe({
        next: (response: UserData) => {
          this.message.success('User updated successfully');
          this.userUpdated.emit(response);
          this.visiblePopUpEditManagement.emit(false);
        },
        error: (error: any) => {
          this.message.error('Failed to update user');
          console.error('Error updating user:', error);
        }
      });
    } else {
      this.message.error('Please check your input');
    }
  }

  handleCancel(): void {
    this.visiblePopUpEditManagement.emit(false);
  }
}

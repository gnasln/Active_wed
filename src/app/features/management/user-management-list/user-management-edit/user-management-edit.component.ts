import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { rePassValidator } from '../../../../shared/validate/check-repass.directive';
import { ManagermentService } from '../../../../core/api/managerment.service';

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
  ],
  templateUrl: './user-management-edit.component.html',
  styleUrl: './user-management-edit.component.scss'
})
export class UserManagementEditComponent {
  @Input() isVisiblePopUpEditManagement: boolean = true;
  @Output() visiblePopUpEditManagement = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private managermentService: ManagermentService,
  ) {}

  handleOk(): void {
    this.visiblePopUpEditManagement.emit(false);
  }

  handleCancel(): void {
    this.visiblePopUpEditManagement.emit(false);
  }
}

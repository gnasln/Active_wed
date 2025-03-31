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
  selector: 'app-popup-add-user-account',
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
  templateUrl: './popup-add-user-account.component.html',
  styleUrl: './popup-add-user-account.component.scss'
})
export class PopupAddUserAccountComponent {
  @Input() isVisiblePopUpAddManagement: boolean = true;
  @Output() visiblePopUpAddManagement = new EventEmitter<boolean>();
  public hideOldPass: boolean = true;
  public hidePass: boolean = true;
  public hideRePass: boolean = true;

  public form: FormGroup = this.fb.group({ 
    userName: [null, Validators.required],
    password: [null, Validators.required],
    rePass: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private managermentService: ManagermentService,
  ) {}

  handleOk(): void {
    const body = {
      userName: this.form.get('userName')?.value,
      password: this.form.get('password')?.value,
      repassword: this.form.get('rePass')?.value
    }
    this.managermentService.addAccountManagementOwner(body).subscribe(res => {
      if(res) {
        this.message.success("Tạo tài khoản thành công")
        this.visiblePopUpAddManagement.emit(false);
      }
    }, (err) => {
      const errorMessage = err.error ? err.error.split('|')[1] : 'Có lỗi xảy ra';
      this.message.error(errorMessage);
    })
  }

  handleCancel(): void {
    this.visiblePopUpAddManagement.emit(false);
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }
  showOldPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassChangeOldPassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';
      this.hideOldPass = false;
    } else {
      inputPass.type = 'password';
      this.hideOldPass = true;
    }
  }
  showPass(e: any) {
    const inputPass = document.querySelector(
      '#inputPassChangePassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';
      this.hidePass = false;
    } else {
      inputPass.type = 'password';
      this.hidePass = true;
    }
  }
  showRePass(e: any) {
    const inputPass = document.querySelector(
      '#inputRePassChangePassword',
    ) as HTMLInputElement;
    if (inputPass?.type === 'password') {
      inputPass.type = 'text';

      this.hideRePass = false;
    } else {
      inputPass.type = 'password';
      this.hideRePass = true;
    }
  }
}

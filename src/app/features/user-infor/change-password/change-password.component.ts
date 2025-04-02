import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { rePassValidator } from '../../../shared/validate/check-repass.directive';
import { AccountService } from '../../../core/api/account.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { passWordValidator } from '../../../shared/validate/check-password.directive';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzModalComponent,
    NzModalModule,
    NzIconModule,
    NzRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInput,
    MatLabel,
    NzSelectModule,
    TranslateModule,
    NzButtonModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  @Input() isVisiblePopUpChangePassword: boolean = true;
  @Output() visiblePopUpChangePassword = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private message: NzMessageService,
  ) {}
  ngOnInit(): void {
    this.form
    .get('rePass')
    ?.addValidators(rePassValidator(this.form.get('password')?.value));
  }
  public isLoading: boolean = false;
  public errorMessage: string = '';
  public hideOldPass: boolean = true;
  public hidePass: boolean = true;
  public hideRePass: boolean = true;
  public form: FormGroup = this.fb.group({
    oldPassword: [null, Validators.required],
    password: [null, [Validators.required, passWordValidator(), this.differentFromOldPassword()]],
    rePass: [null, Validators.required],
  });

  private differentFromOldPassword() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const oldPassword = this.form?.get('oldPassword')?.value;
      if (oldPassword && control.value === oldPassword) {
        return { 'sameAsOldPassword': true };
      }
      return null;
    };
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
  }

  handleOk(): void {
    this.isLoading = true;
    if (this.form.invalid) {
      this.form.get('oldPassword')?.markAsTouched();
      this.form.get('password')?.markAsTouched();
      this.form.get('rePass')?.markAsTouched();
      this.isLoading = false;
      return;
    }
    const body = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.password,
      comfirmedPassword: this.form.value.rePass
    };
    this.accountService.changePassword(body).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.visiblePopUpChangePassword.emit(false);
        this.message.success('Đổi mật khẩu thành công!');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Mật khẩu cũ không chính xác';
        this.message.error(this.errorMessage);
      }
    });
  }

  handleCancel(): void {
    this.visiblePopUpChangePassword.emit(false);
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

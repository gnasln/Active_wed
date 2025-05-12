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
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AccountService } from '../../../core/api/account.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { passWordValidator } from '../../../shared/validate/check-password.directive';
import { rePassValidator } from '../../../shared/validate/check-repass.directive';

@Component({
  selector: 'app-pop-up-change-pass',
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
    MatInputModule,
    NzRadioModule,
  ],
  templateUrl: './pop-up-change-pass.component.html',
  styleUrl: './pop-up-change-pass.component.scss',
})
export class PopUpChangePassComponent {
  isConfirmLoading = false;
  @Input() isVisiblePopUpChangePass: boolean = false;
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private message: NzMessageService,
  ) {}

  public form: FormGroup = this.fb.group({
    password: [null, [Validators.required, passWordValidator()]],
    rePass: [null, Validators.required],
  });

  handleOk(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body = {
      password: this.form.get('password')?.value,
      repassword: this.form.get('rePass')?.value,
    }
    this.accountService.changePassword(body).subscribe(res => {
      this.message.success("Đổi mật khẩu thành công!")
      this.isVisiblePopUpOpen.emit(false);
    }, (err) => {
      this.message.error("Đổi mật khẩu không thành công!")
    })
  }

  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.isVisiblePopUpOpen.emit(false);
  }

  ngOnInit(): void {
    this.form
      .get('rePass')
      ?.addValidators(rePassValidator(this.form.get('password')?.value));
  }

  updateValidateRepass(e: any) {
    this.form.get('rePass')?.clearValidators();
    this.form.get('rePass')?.addValidators(rePassValidator(e.target.value));
    this.form.get('rePass')?.updateValueAndValidity();
  }

  hidePass: boolean = true;
  hideRePass: boolean = true;
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

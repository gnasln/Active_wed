import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
import { NgOtpInputConfig, NgOtpInputModule } from  'ng-otp-input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from '../../../core/api/account.service';
import { PopUpCheckEmailComponent } from '../pop-up-check-email/pop-up-check-email.component';

@Component({
  selector: 'app-pop-up-insert-otp',
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
    NgOtpInputModule
  ],
  templateUrl: './pop-up-insert-otp.component.html',
  styleUrl: './pop-up-insert-otp.component.scss',
})
export class PopUpInsertOTPComponent {
  isConfirmLoading = false;
  @ViewChild('ngOtpInput') ngOtpInputRef:any;
  @Input() isVisiblePopUpInsertOTP: boolean = false;
  @Input() email: string = '';
  @Output() isVisiblePopUpOpen = new EventEmitter<any>();

  otpConfig :NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: true,
    inputStyles:{
      'border-radius': '16px'
    },
    containerStyles:{
      'display':'flex'
    },
    inputClass:'each_input',
    containerClass:'all_inputs'
  };

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private accountService: AccountService,
  ) {}

  handleOk(): void {
    this.isConfirmLoading = true;
    const body = {
      email: this.email,
      otp: this.ngOtpInputRef.currentVal
    }
    if(this.ngOtpInputRef.currentVal === null || this.ngOtpInputRef.currentVal.length !== 6){
      this.message.error("Nhập đầy đủ mã OTP!")
      this.isConfirmLoading = false;
      return;
    } else {
      this.accountService.checkOTP(body).subscribe(res => {
        this.message.success("Xác thực OTP thành công!")
        this.isVisiblePopUpOpen.emit({
          thisPopUp: false,
          nextPopUp: true,
        })
        this.isConfirmLoading = false;
      }, (err) => {
        this.message.error("Mã OTP không hợp lệ!")
        this.isConfirmLoading = false;
      })
    }
  }
  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.isVisiblePopUpOpen.emit({
      thisPopUp: false,
      nextPopUp: false,
    });
  }


}

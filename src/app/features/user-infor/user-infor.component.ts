import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { phoneNumberValidator } from '../../shared/validate/check-phone-number.directive';
import { dateOfBirthValidator } from '../../shared/validate/check-dob.directive';
import { passWordValidator } from '../../shared/validate/check-password.directive';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { AccountService } from '../../core/api/account.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-user-infor',
  standalone: true,
  imports: [
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatFormField,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    ChangePasswordComponent
  ],
  templateUrl: './user-infor.component.html',
  styleUrl: './user-infor.component.scss',
})
export class UserInforComponent implements OnInit {
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  statusActive: string;
  statusBlock: string;
  statusList: any;
  public role: string;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private accountService: AccountService,
    private message: NzMessageService,
  ) {}
  isEdit: boolean = false;
  ngOnInit(): void {
    this.translate
      .get('userInforPage.statusActive')
      .subscribe((value) => (this.statusActive = value));
    this.translate
      .get('userInforPage.statusBlock')
      .subscribe((value) => (this.statusBlock = value));
    this.translate.onLangChange.subscribe((e) => {
      this.translate
        .get('userInforPage.statusActive')
        .subscribe((value) => (this.statusActive = value));
      this.translate
        .get('userInforPage.statusBlock')
        .subscribe((value) => (this.statusBlock = value));
    });
    this.statusList = [
      {
        label: this.statusActive,
        value: 1,
      },
      {
        label: this.statusBlock,
        value: 0,
      },
    ];
    this.role = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.role;
    if(this.role[0] === 'Administrator'){
      // this.formAccountInfor.get('statusAccount')?.disable();
    } else if(this.role[0] === 'User') {
      console.log("hhhh")
      this.formAccountInfor.get('statusAccount')?.disable();
    }
    this.formAccountInfor.get('activeDate')?.disable();
    this.viewInfoAccount();
    this.formAccountInfor.get('activeDate')?.disable();
    this.formAccountInfor.get('statusAccount')?.disable();
    this.formAccountInfor.get('username')?.disable();
    this.formAccountInfor.disable();
    this.formUserInfor.disable();
  }

  viewInfoAccount() {
    this.accountService.getViewInfo().subscribe(res => {
      const dataInfo = res.data
      this.formAccountInfor.patchValue({
        username: dataInfo.userName,
      })
      this.formUserInfor.patchValue({
        fullName: dataInfo.userName,
        // dateOfBirth: dataInfo.birthday,
        dateOfBirth: moment.utc(dataInfo.birthday).local(),
        email: dataInfo.email,
        phoneNumber: dataInfo.phoneNumber,
        address: dataInfo.address,
      })
    })
  }

  updateInfoAccount(){
    if (this.formUserInfor.valid && this.formAccountInfor.valid) {
      const body = {
        userName: this.formAccountInfor.get('username')?.value,
        birthday: moment(this.formUserInfor.get('dateOfBirth')?.value).utc().format(),
        email: this.formUserInfor.get('email')?.value,
        phone: this.formUserInfor.get('phoneNumber')?.value,
        address: this.formUserInfor.get('address')?.value
      }
      this.accountService.updateInfo(body).subscribe(res => {
        console.log("ACCOUNT: ", res)
        this.message.success(this.translate.instant('Toast.updateSuccess'));
        this.cdr.detectChanges();
      })
    } else {
      this.formUserInfor.markAllAsTouched();
      this.formAccountInfor.markAllAsTouched();
      this.translate.get('Toast.checkRequiredFields').subscribe(message => {
        this.message.error(message);
      });
    }
  }

  public formAccountInfor: FormGroup = this.fb.group({
    username: [null, Validators.required],
    statusAccount: [1, Validators.required],
    activeDate: [moment(), Validators.required],
  });
  public formUserInfor: FormGroup = this.fb.group({
    fullName: [null, Validators.required],
    phoneNumber: [null, [phoneNumberValidator(), Validators.required]],
    dateOfBirth: [null, [dateOfBirthValidator(), Validators.required]],
    email: [null, [Validators.email, Validators.required]],
    address: [null, Validators.required],
  });

  isVisiblePopUpChangePassword: boolean = false;
  handelVisiblePopUpChangePassword(e: boolean) {
    this.isVisiblePopUpChangePassword = e;
  }
  handelOpenPopUpChangePassword() {
    this.isVisiblePopUpChangePassword = true;
  }

  handleOpenPopupChangePw() {

  }

  handelEditInfor() {
    this.isEdit = true;
    this.formAccountInfor.enable();
    this.formUserInfor.enable();
    this.formAccountInfor.get('activeDate')?.disable();
    this.formAccountInfor.get('statusAccount')?.disable();
    this.formAccountInfor.get('username')?.disable();
    this.role = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.role;
    if(this.role[0] === 'Administrator'){
      // this.formAccountInfor.get('statusAccount')?.disable();
    } else if(this.role[0] === 'User') {
      console.log("hhhh")
      this.formAccountInfor.get('statusAccount')?.disable();
    }
  }
  handelCanEdit() {
    this.isEdit = false;
    this.formAccountInfor.disable();
    this.formUserInfor.disable();
  }
}

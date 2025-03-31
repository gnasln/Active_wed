import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShareTableModule } from '../../../shared/components/share-table/share-table.module';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PopupAddUserAccountComponent } from './popup-add-user-account/popup-add-user-account.component';
import { ManagermentService } from '../../../core/api/managerment.service';
import { UserManagementEditComponent } from './user-management-edit/user-management-edit.component';

@Component({
  selector: 'app-user-management-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ShareTableModule,
    RouterModule,
    NzIconModule,
    TranslateModule,
    PopupAddUserAccountComponent,
    UserManagementEditComponent,
  ],
  templateUrl: './user-management-list.component.html',
  styleUrl: './user-management-list.component.scss'
})
export class UserManagementListComponent implements OnInit{
  public isLoading: boolean = false;
  public totalCount: number = 0;
  public listUserManagements : any = [];
  public role: string;
  public params = {
    page: 1,
    pageSize:10
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private managermentService: ManagermentService,
  ){}

  ngOnInit(): void {
    this.role = JSON.parse(
      localStorage.getItem('id_token_claims_obj') || '{}',
    )?.role;
    console.log("Role: ", this.role[0])
    if(this.role[0] === 'Administrator'){
      console.log("Admin")
      this.viewListUserManager();
    } else if(this.role[0] === 'User') {
      console.log("User")
      this.viewListUserTenant();
    }
  }

  viewListUserManager() {
    this.isLoading = true;
    this.managermentService.getAllManagementOwner(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  viewListUserTenant() {
    this.isLoading = true;
    this.managermentService.getAllManagementTenant(this.params.page, this.params.pageSize).subscribe(res => {
      this.isLoading = false;
      this.listUserManagements = res.data;
      this.totalCount = res.totalItems;
    })
  }

  isVisiblePopUpAddManagement: boolean = false;
  handelVisiblePopUpAddManagement(e: boolean) {
    this.isVisiblePopUpAddManagement = e;
  }
  handelOpenPopUpAddManagement() {
    this.isVisiblePopUpAddManagement = true;
  }

  isVisiblePopUpEditManagement: boolean = false;
  handelVisiblePopUpEditManagement(e: boolean) {
    this.isVisiblePopUpEditManagement = e;
  }
  handelOpenPopUpEditManagement(id: string) {
    console.log("Id: ", id)
    this.isVisiblePopUpEditManagement = true;
  }

  changePage(e: number) {
    this.params.page = e;
    this.viewListUserManager();
  }
  changePageSize(e: number) {
    this.params.pageSize = e;
    this.viewListUserManager();
  }
}

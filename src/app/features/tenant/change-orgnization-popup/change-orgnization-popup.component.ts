import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TenantService } from '../../../core/api/tenant.service';

@Component({
  selector: 'app-change-orgnization-popup',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    CommonModule,
    TranslateModule,
    NzButtonModule,
    NzDropDownModule,
  ],
  templateUrl: './change-orgnization-popup.component.html',
  styleUrl: './change-orgnization-popup.component.scss',
})
export class ChangeOrgnizationPopupComponent implements OnInit{
  public pinnedTenantId: number | null = null;
  public hiddenTenants: Set<number> = new Set(); 
  @Input() isVisiblePopUpChangeOrgnization: boolean = true;
  @Output() visiblePopUpChangeOrgnization = new EventEmitter<boolean>();
  @Output() pinOrganization = new EventEmitter<number>();
  @Output() hideTenant = new EventEmitter<number>();
  isConfirmLoading = false;
  public tenants: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private tenantService: TenantService,
  ){}

  ngOnInit(): void {
    this.tenantService.getListTenant().subscribe(res => {
      this.tenants = res.data
    },
      (err) => {
        console.error(err);
      }
    )
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.visiblePopUpChangeOrgnization.emit(false);
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.visiblePopUpChangeOrgnization.emit(false);
  }

  showDisplayPin(tenantId: number): void {
    this.pinnedTenantId = this.pinnedTenantId === tenantId ? null : tenantId;
    this.pinOrganization.emit(this.pinnedTenantId ?? undefined);
  }  

  toggleVisibility(tenantId: number): void {
    if (this.hiddenTenants.has(tenantId)) {
      this.hiddenTenants.delete(tenantId); 
    } else {
      this.hiddenTenants.add(tenantId); 
    }
    this.hideTenant.emit(tenantId);
  }

}

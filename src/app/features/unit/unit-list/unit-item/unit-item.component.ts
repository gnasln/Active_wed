                                                                                                                                  import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { KeyResultItemSumaryComponent } from '../../../key-result/key-result-item-sumary/key-result-item-sumary.component';
import { PopupAddEditKeyResultComponent } from '../../../key-result/popup-add-edit-key-result/popup-add-edit-key-result.component';
import { ObjectService } from '../../../../core/api/object.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { KeyResultService } from '../../../../core/api/key-result.service';
import { PriorityLevel } from '../../../../core/enums/todo';

@Component({
  selector: 'app-unit-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzProgressModule,
    NzIconModule,
    KeyResultItemSumaryComponent,
    PopupAddEditKeyResultComponent,
  ],
  templateUrl: './unit-item.component.html',
  styleUrl: './unit-item.component.scss',
})
export class UnitItemComponent implements AfterViewInit, OnInit {
  private pageSize: number = 2;
  public hasMoreData: boolean = true;
  public listKeyResults: any = [];
  public idObject: String;
  public selectedKeyResultId: string | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  UnitId = this.route.snapshot.params['id'];
  @Output() edit = new EventEmitter<any>();
  @Input() data: any;
  @Input() unitName: string;
  @Input() dueDate: string;
  @Input() priority: number;
  priorityLevelEnum: any = PriorityLevel;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private keyResultService: KeyResultService,
    private message: NzMessageService,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('othertask') && this.UnitId && this.data) {
      this.loadKeyResultByObject();
    }
  }

  // Thêm nút "Xem thêm"
  loadKeyResultByObject() {
    const body = {
      objectId: this.data,
      pageSize: 100,
      pageNumber: 1
    }
    this.keyResultService.listKeyResultByObject(body).subscribe(res => {
      if (res.data){
        this.listKeyResults = res.data.items;
        this.cdr.detectChanges();
      }
    }, (err) => {
      this.message.error(err);
    })
  }

  handleKeyResultCreated(newKeyResult: any) {
    this.listKeyResults.push(newKeyResult);
    console.log("listKeyResults được push: ", this.listKeyResults)
    this.cdr.detectChanges();
  }
  
  handleKeyResultUpdated(updatedKeyResult: any) {
    const index = this.listKeyResults.findIndex((item: any) => item.id === updatedKeyResult.id);
    if (index !== -1) {
      this.listKeyResults[index] = updatedKeyResult;
    }
    this.selectedKeyResultId = null;
    this.cdr.detectChanges();
  }
  
  handleKeyResultDeleted(keyResultId: string) {
    console.log("Handling key result deleted, ID:", keyResultId);
    
    // Tìm vị trí của key result trong danh sách
    const index = this.listKeyResults.findIndex((item: any) => item.id === keyResultId);
    console.log("Found item at index:", index);
    
    if (index !== -1) {
      // Xóa key result khỏi danh sách
      this.listKeyResults.splice(index, 1);
      console.log("Updated list after deletion:", this.listKeyResults);
      
      // Reset selectedKeyResultId
      this.selectedKeyResultId = null;
      
      // Cập nhật giao diện
      this.cdr.detectChanges();
    } else {
      console.warn("Key result not found in list:", keyResultId);
    }
  }
  
  handleEditKeyResult(data: any) {
    console.log("Edit key result - data received:", data);
    console.log("Key Result ID:", data.keyResultId);
    console.log("Object ID:", data.objectId);
    this.selectedKeyResultId = data.keyResultId;
    this.idObject = data.objectId;
    this.visiblePopUpAddEditKeyResult = true;
  }

  listMember: any = [
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../../assets/img/avatar.png',
    },
  ];
  @ViewChildren('member') components: QueryList<UnitItemComponent>;
  public memberCount: number;
  ngAfterViewInit(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount = this.listMember.length - 4;
    this.cdr.detectChanges();
  }

  editClick(e: any) {
    this.edit.emit(this.data);
    e.stopPropagation();
  }
  deleteClick(e: any) {
    console.log('delete');
    e.stopPropagation();
  }
  detailClick() {
    this.router.navigate(['/unit/detail', this.data]);
  }

  handleOpenPopUpAddEditKeyResult(idObject: any) {
    this.idObject = idObject;
    this.selectedKeyResultId = null;
    console.log("Thôi nào: ", this.idObject)
    this.visiblePopUpAddEditKeyResult = true;
  }
  visiblePopUpAddEditKeyResult: boolean = false;
  handleVisiblePopUpAddEditKeyResult(e: any) {
    this.visiblePopUpAddEditKeyResult = e;
  }

  loadMore() {
    this.pageSize+=3;
    this.loadKeyResultByObject();
  }
}

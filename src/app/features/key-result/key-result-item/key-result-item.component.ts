import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TaskOfKeyResultItemComponent } from './task-of-key-result-item/task-of-key-result-item.component';
import { PopupAddEditTaskComponent } from '../../task/popup-add-edit-task/popup-add-edit-task.component';
import { PopupAddEditKeyResultComponent } from '../popup-add-edit-key-result/popup-add-edit-key-result.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-key-result-item',

  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzProgressModule,
    NzIconModule,
    TaskOfKeyResultItemComponent,
    PopupAddEditTaskComponent,
    PopupAddEditKeyResultComponent,
  ],
  templateUrl: './key-result-item.component.html',
  styleUrl: './key-result-item.component.scss',
})
export class KeyResultItemComponent implements AfterViewInit {
  @Input() keyResultData: any;
  @Input() objectId: any;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private message: NzMessageService
  ) {}
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
  @ViewChildren('member') components: QueryList<KeyResultItemComponent>;
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

  visibleAddTask: boolean = false;
  handleOpenAddTask() {
    this.visibleAddTask = true;
  }
  handleVisibleTaskAdd(e: boolean) {
    this.visibleAddTask = e;
  }
  
  // Edit key result
  visibleEditKeyResult: boolean = false;
  handleOpenEditKeyResult() {
    this.visibleEditKeyResult = true;
  }
  
  handleVisibleKeyResultEdit(e: boolean) {
    this.visibleEditKeyResult = e;
  }
  
  handleKeyResultUpdated(data: any) {
    this.keyResultData = data;
    this.cdr.detectChanges();
    this.message.success('Cập nhật kết quả chính thành công!');
  }
  
  handleKeyResultDeleted(keyResultId: string) {
    // You can emit an event to the parent component to remove this key result from the list
    this.message.success('Xóa kết quả chính thành công!');
  }
}

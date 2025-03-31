import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
  ],
  templateUrl: './key-result-item.component.html',
  styleUrl: './key-result-item.component.scss',
})
export class KeyResultItemComponent implements AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
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
}

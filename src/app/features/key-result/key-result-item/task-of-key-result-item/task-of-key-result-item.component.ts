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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-of-key-result-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzProgressModule,
    NzIconModule,
    NzCheckboxModule,
  ],
  templateUrl: './task-of-key-result-item.component.html',
  styleUrl: './task-of-key-result-item.component.scss',
})
export class TaskOfKeyResultItemComponent implements AfterViewInit {
  @Input() idTask: string;
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
  @ViewChildren('member') components: QueryList<TaskOfKeyResultItemComponent>;
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
  checkedSuccesTask(event: any) {
    console.log('success ', event[0]);
  }
}

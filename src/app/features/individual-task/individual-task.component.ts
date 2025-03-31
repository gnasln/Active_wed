import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UnitItemComponent } from '../unit/unit-list/unit-item/unit-item.component';
import { UnitPopupAddEditComponent } from '../unit/unit-popup-add-edit/unit-popup-add-edit.component';
import { KeyResultItemComponent } from '../key-result/key-result-item/key-result-item.component';

@Component({
  selector: 'app-individual-task',
  standalone: true,
  imports: [
    UnitItemComponent,
    UnitPopupAddEditComponent,
    CommonModule,
    NzIconModule,
    NzProgressModule,
    ResizableModule,
    NzDropDownModule,
    KeyResultItemComponent,
  ],
  templateUrl: './individual-task.component.html',
  styleUrl: './individual-task.component.scss',
})
export class IndividualTaskComponent {
  public style: object = {};
  public style2: object = {};
  sort: number = 0;
  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      overflow: 'hidden',
      width: `${event.rectangle.width}px`,
      'max-width': '100%',
    };
    this.style2 = {
      overflow: 'hidden',
      width: `calc(100% - ${event.rectangle.width}px)`,
    };
    if (Number(event.rectangle.width) < 24) {
      Object.assign(this.style, { padding: '0 1px' });
    }
    const containerBlock = document.querySelector(
      '#containerBlock',
    ) as HTMLElement;

    if (Number(event.rectangle.width) >= containerBlock.offsetWidth) {
      Object.assign(this.style2, { padding: '0 1px' });
    }
  }
  constructor(private cdr: ChangeDetectorRef) {
    // let keysPressed: any = {};
    // document.addEventListener('keydown', (event: any) => {
    //   keysPressed[event.keyCode] = true;
    //   console.log(keysPressed);
    //   if (keysPressed[16] && keysPressed[90]) {
    //     this.handleOpenList();
    //   }
    // });
    // document.addEventListener('keyup', (event: any) => {
    //   delete keysPressed[event.keyCode];
    //   console.log(keysPressed);
    // });
  }
  idUnit: string;
  visibleList: boolean = false;
  handleVisibleList(e: boolean) {
    this.visibleList = e;
  }
  handleOpenList() {
    this.visibleList = true;
    this.idUnit = '';
  }

  handleEditUnit(e: any) {
    this.idUnit = e;
    this.visibleList = false;
    this.cdr.detectChanges();
  }
  _store = inject(Store);

  listMember: any = [
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
    {
      img: '../../../../assets/img/avatar.png',
    },
  ];
  @ViewChildren('member') components: QueryList<IndividualTaskComponent>;
  @ViewChildren('member1') components1: QueryList<IndividualTaskComponent>;
  public memberCount: number;
  public memberCount1: number;
  ngAfterViewInit(): void {
    Array.from(this.components.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount1 = this.listMember.length - 4;
    Array.from(this.components1.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount1 = this.listMember.length - 4;
    this.cdr.detectChanges();
  }
  changeSort(idSort: number): void {
    this.sort = idSort;
    this.cdr.detectChanges();
  }
}

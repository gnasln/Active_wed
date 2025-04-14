import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-key-result-item-sumary',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzProgressModule],
  templateUrl: './key-result-item-sumary.component.html',
  styleUrl: './key-result-item-sumary.component.scss',
})
export class KeyResultItemSumaryComponent implements AfterViewInit {
  @Output() edit = new EventEmitter<any>();
  @Input() dataKeyResult: any;
  @Input() keyResultName: any;
  @Input() objectId: any;

  constructor(private cdr: ChangeDetectorRef) {}
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
  
  editKeyResult(event: Event) {
    event.stopPropagation();
    console.log("EditKeyResult called with:");
    console.log("dataKeyResult:", this.dataKeyResult);
    console.log("keyResultName:", this.keyResultName);
    
    // Truyền cả ID và tên của key result
    this.edit.emit({
      keyResultId: this.keyResultName.id,  // Sửa từ this.dataKeyResult thành this.keyResultName.id
      objectId: this.objectId
    });
  }
  
  @ViewChildren('member1') components1: QueryList<KeyResultItemSumaryComponent>;
  public memberCount: number;
  public memberCount1: number;
  ngAfterViewInit(): void {
    Array.from(this.components1.toArray()).forEach((x: any, index: number) => {
      if (x.nativeElement instanceof HTMLElement) {
        const translate = index * 10;
        x.nativeElement.style.transform = `translateX(-${translate}px)`;
      }
    });
    this.memberCount = this.listMember.length - 4;
    this.cdr.detectChanges();
  }
}

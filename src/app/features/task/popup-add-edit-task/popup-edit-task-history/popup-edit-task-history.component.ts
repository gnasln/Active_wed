import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { ToDOService } from '../../../../core/api/todo.service';

@Component({
  selector: 'app-popup-edit-task-history',
  standalone: true,
  imports: [
    NzModalModule,
    NzIconModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NzButtonModule,
    NzSelectModule,
    PopupEditTaskHistoryComponent,
  ],
  templateUrl: './popup-edit-task-history.component.html',
  styleUrl: './popup-edit-task-history.component.scss',
})
export class PopupEditTaskHistoryComponent implements OnInit{
  @Input() isVisiblePopUpEditTaskHistory: boolean = true;
  @Input() idTask: any;
  @Output() visibleEditTaskHistory = new EventEmitter<boolean>();
  isConfirmLoading = false;
  public listHistory: any = [];
  public hasMoreData: boolean = true;
  private pageSize: number = 2;
  private pageNumber: number = 1;

  handleOk(): void {
    this.visibleEditTaskHistory.emit(false);
  }

  size: NzSelectSizeType = 'default';
  handleCancel(): void {
    this.visibleEditTaskHistory.emit(false);
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private todoService: ToDOService,
  ) {}
  ngOnInit(): void {
    this.viewListHistory();
  }

  viewListHistory() {
    const body: any = {
      todoId: this.idTask,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    }
    this.todoService.viewHistory(body).subscribe(res => {
      this.listHistory = res.items;
      console.log("Res task: ", this.listHistory)
      this.cdr.detectChanges();
      if (res.items.length < this.pageSize) {
        this.hasMoreData = false;
      }
    },  
      (err) => {

      }
    )
  }

  loadMore() {
    this.pageSize++;
    this.viewListHistory();
  }
}

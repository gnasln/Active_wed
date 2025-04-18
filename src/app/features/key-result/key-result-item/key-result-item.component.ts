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
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PopupAddEditKeyResultComponent } from '../popup-add-edit-key-result/popup-add-edit-key-result.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToDOService } from '../../../core/api/todo.service';
import { TaskOfKeyResultItemComponent } from './task-of-key-result-item/task-of-key-result-item.component';
import moment from 'moment';

@Component({
  selector: 'app-key-result-item',

  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzProgressModule,
    NzIconModule,
    PopupAddEditKeyResultComponent,
    TaskOfKeyResultItemComponent,
  ],
  templateUrl: './key-result-item.component.html',
  styleUrl: './key-result-item.component.scss',
})
export class KeyResultItemComponent implements OnInit, AfterViewInit {
  @Input() keyResultData: any;
  @Input() objectId: any;
  @Output() taskUpdated = new EventEmitter<any>();
  
  tasks: any[] = []; // Danh sách task thuộc key result
  totalTask: number = 0;
  totalTaskDone: number = 0;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private message: NzMessageService,
    private todoService: ToDOService,
  ) {}
  
  ngOnInit(): void {
    // Khi component được khởi tạo, lấy dữ liệu task nếu có objectId và keyResultId
    if (this.objectId && this.keyResultData?.id) {
      this.loadTasks();
    }
  }
  
  loadTasks() {
    // Gọi API lấy các task thuộc key result này
    const body = {
      objectId: this.objectId,
      pageSize: 20,
      pageNumber: 1,
      keyResultId: this.keyResultData?.id // Nếu API hỗ trợ filter theo keyResultId
    };
    
    this.todoService.getListToDo(body).subscribe(
      (response: any) => {
        if (response && response.items) {
          this.tasks = response.items.map((item: any) => ({
            ...item,
            done: item.status === 10 ? true : false,
            dueDate: moment(item.dueDate).format('DD/MM/YYYY')
          }));
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
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

  // Edit key result
  visibleEditKeyResult: boolean = false;
  handleOpenEditKeyResult() {
    this.visibleEditKeyResult = true;
  }
  
  handleVisibleKeyResultEdit(e: boolean) {
    this.visibleEditKeyResult = e;
    
    // Nếu đóng popup edit, tải lại danh sách task
    if (!e) {
      this.loadTasks();
    }
  }
  
  handleKeyResultUpdated(data: any) {
    this.keyResultData = data;
    this.cdr.detectChanges();
    this.message.success('Cập nhật kết quả chính thành công!');
    
    // Tải lại danh sách task sau khi cập nhật
    this.loadTasks();
  }
  
  handleKeyResultDeleted(keyResultId: string) {
    // You can emit an event to the parent component to remove this key result from the list
    this.message.success('Xóa kết quả chính thành công!');
  }

  onTaskUpdated(taskInfo: { id: string; status: number; isDone?: boolean }) {
    console.log('Task updated in key-result-item:', taskInfo);
    
    // Tìm và cập nhật task trong danh sách hiện tại
    if (this.tasks && this.tasks.length > 0) {
      const taskToUpdate = this.tasks.find(task => task.id === taskInfo.id);
      
      if (taskToUpdate) {
        console.log('Updating task in key-result-item:', taskToUpdate);
        
        // Cập nhật trạng thái
        taskToUpdate.status = taskInfo.status;
        
        // Đặt isDone và done dựa trên status
        // status = 10 là đã hoàn thành
        taskToUpdate.isDone = taskToUpdate.status === 10;
        taskToUpdate.done = taskToUpdate.status === 10;
        
        // Tạo tham chiếu mới cho mảng tasks để kích hoạt change detection
        this.tasks = [...this.tasks];
        
        // Cập nhật tổng số tasks hoàn thành
        this.updateTaskCount();
        
        // Force change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    }
    
    // Nếu cần, có thể gọi lại API để lấy danh sách task mới nhất
    // Đảm bảo chỉ reload sau một thời gian ngắn để UI có thể cập nhật trước
    setTimeout(() => {
      this.getTasksOfKeyResult();
    }, 1500);
    
    // Emit event để thông báo cho các component cha
    this.taskUpdated.emit(taskInfo);
  }
  
  /**
   * Cập nhật số lượng task đã hoàn thành và tổng số task
   */
  private updateTaskCount() {
    if (this.tasks && this.tasks.length > 0) {
      this.totalTask = this.tasks.length;
      this.totalTaskDone = this.tasks.filter(task => task.isDone || task.status === 10).length;
    } else {
      this.totalTask = 0;
      this.totalTaskDone = 0;
    }
  }

  getTasksOfKeyResult() {
    // Tương tự như loadTasks nhưng đảm bảo dữ liệu mới nhất
    this.loadTasks();
  }
}

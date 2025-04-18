import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Router } from '@angular/router';
import { ToDOService } from '../../../../core/api/todo.service';
import { PopupAddEditTaskComponent } from '../../../task/popup-add-edit-task/popup-add-edit-task.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';

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
    PopupAddEditTaskComponent
  ],
  templateUrl: './task-of-key-result-item.component.html',
  styleUrl: './task-of-key-result-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskOfKeyResultItemComponent implements OnInit {
  @Input() idTask: string;
  @Input() taskData: any;
  @Input() objectId: string;
  @Output() taskUpdated = new EventEmitter<{ id: string; status: number; isDone: boolean }>();
  @Output() openEditPopup = new EventEmitter<string>();
  @Input() task: any;

  public taskTitle: string = 'Task1';
  public taskDueDate: string = '05/04/2024';
  public isChecked: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private todoService: ToDOService,
    private zone: NgZone,
    private message: NzMessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateTaskData();
  }

  // Phương thức cập nhật dữ liệu hiển thị từ taskData
  updateTaskData(): void {
    if (this.taskData) {
      this.taskTitle = this.taskData.title || 'Task1';
      this.taskDueDate = this.taskData.dueDate || '05/04/2024';
      
      // Chỉ sử dụng status để xác định trạng thái checkbox
      // Mặc định status = 10 là đã hoàn thành
      this.isChecked = this.taskData.status === 10;
      
      if (!this.idTask && this.taskData.id) {
        this.idTask = this.taskData.id;
      }

      // Kích hoạt change detection
      this.cdr.detectChanges();
    }
  }

  getTaskDetail() {
    if (this.idTask) {
      this.todoService.getToDoDetail(this.idTask).subscribe(
        (data: any) => {
          if (data) {
            this.taskData = data;
            this.updateTaskData();
          }
        },
        (error) => {
          console.error('Error fetching task detail:', error);
        }
      );
    }
  }

  onCheckboxChange(event: any): void {
    console.log('Checkbox changed in task-of-key-result-item:', event);
    const checked = event.target ? event.target.checked : event;
    
    // Update status in the local data
    this.isChecked = checked;
    
    // Calculate the new status based on checked state (10 for done, 5 for in progress)
    const newStatus = checked ? 10 : 5;
    
    // Create update payload with only status field
    const updatePayload = {
      id: this.idTask || this.taskData?.id,
      status: newStatus
    };
    
    console.log('Sending update payload to API:', updatePayload);
    
    // Call API to update task status
    this.todoService.updateToDo(updatePayload).subscribe(
      (response) => {
        console.log('Task status updated successfully:', response);
        
        // Cập nhật status trong dữ liệu local
        if (this.taskData) {
          this.taskData.status = newStatus;
        }
        
        // Hiển thị thông báo thành công
        if (checked) {
          this.message.success('Hoàn thành công việc thành công!');
        } else {
          this.message.success('Hủy hoàn thành công việc thành công!');
        }
        
        // Emit event to parent component với isDone = checked để tương thích với interface
        this.taskUpdated.emit({
          id: this.taskData?.id || this.idTask,
          status: newStatus,
          isDone: checked // Giữ lại trường này để tương thích với EventEmitter interface
        });
      },
      (error) => {
        console.error('Error updating task status:', error);
        // Hiển thị thông báo lỗi
        this.message.error(error?.error?.message || 'Cập nhật trạng thái công việc thất bại');
        // Revert checkbox state on error
        this.isChecked = !checked;
        this.cdr.detectChanges();
      }
    );
  }

  // Phương thức mở popup chỉnh sửa task
  openEditTaskPopup(e: Event) {
    // Ngăn sự kiện click truyền xuống checkbox
    e.stopPropagation();
    
    // Emit sự kiện để component cha mở popup
    this.openEditPopup.emit(this.idTask);
  }

  getPriorityText(): string {
    if (!this.taskData || this.taskData.priority === undefined) {
      return '';
    }
    
    switch (this.taskData.priority) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return '';
    }
  }
}

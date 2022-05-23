import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskRequestService } from 'src/app/services/task-request.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  
  @Input() tasks : Task[];

  constructor(private taskRequestService: TaskRequestService) {
    this.tasks = []
   }

  ngOnInit(): void {
  }

  changeStatus(task: Task) {
    if (!task.id) {
      return;
    }

    if (task.done == false) {
      task.done = true;
    } else {
      task.done = false;
    }

    this.taskRequestService.updateTask(task.id, task).subscribe();
  }

  deleteTask(task: Task) {
    if (!task.id) {
      return;
    }
    this.taskRequestService.deleteTask(task.id).subscribe();

    let index = this.tasks.findIndex(item => item['id'] == task.id);
    this.tasks.splice(index, 1);

  }
}

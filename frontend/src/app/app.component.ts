import { Component, OnInit } from '@angular/core';
import { Task } from './model/task';
import { TaskRequestService } from './services/task-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dockerFrontendAngular';

  tasks!: Task[];

  constructor(private taskRequestService: TaskRequestService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.reloadList();
  }
  
  addTaskEventEmitter($event : any) {
    console.log($event);
    let newTask : Task = {
      description: $event.description,
      targetDate: new Date(),
      done: false,
    }
    this.taskRequestService.createTask(newTask).subscribe( _ => this.reloadList());
  }

  reloadList() {
    this.tasks = [];
    this.taskRequestService.getTaskList().subscribe(
      todos => {
        if (!todos) {
          return;
        }
        todos.forEach(todo => {
          let newTodo = {
            id: todo.id,
            description: todo.description,
            targetDate: todo.targetDate,
            done: todo.done,
          }
          this.tasks.push(newTodo);
        })
      }
    )
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  @Output() addTaskEventEmitter = new EventEmitter();
  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      description: ["", [Validators.required]]
    })
  }

  onKeyPress($event: any) {
    if (this.taskForm.valid) {
      this.addTaskEventEmitter.emit(this.taskForm.value);
      this.taskForm.patchValue({
        description: ''
      })
    } else {
      alert("enter required fields");
    }
  }
}

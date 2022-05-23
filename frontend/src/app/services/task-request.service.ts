import { Injectable } from '@angular/core';
// HTTP request
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../model/task';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskRequestService {

  backendApiUrl = environment.backendApiURL;

  constructor(private http: HttpClient) { }

  getTaskList() : Observable<Array<Task>> {
    const apiUrl = `${this.backendApiUrl}/todos`;
    return this.http.get<Array<Task>>(apiUrl);
  }

  createTask(task: Task) : Observable<Task> {
    const apiUrl = `${this.backendApiUrl}/todos`;
    return this.http.post<Task>(apiUrl, task);
  }

  updateTask(id: number, task: Task) : Observable<Task> {
    const apiUrl = `${this.backendApiUrl}/todos/${id}`;
    console.log(task);
    return this.http.put<Task>(apiUrl, task);
  } 

  deleteTask(id: number) : Observable<any> {
    const apiUrl = `${this.backendApiUrl}/todos/${id}`;
    return this.http.delete(apiUrl);
  }
}

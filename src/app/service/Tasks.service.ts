import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
// import { baseURL } from '../../environments/environment';
const baseURL = 'https://localhost:44334/api/';
import { Tasks } from '../classes/Tasks';
import { TasksAdd } from '../classes/TasksAdd';
@Injectable
  ({
    providedIn: 'root'
  })
export class TasksSevice {

  constructor(public http: HttpClient) { }

  AddTasks(c: TasksAdd) {
    debugger;
    this.http.post(baseURL + 'addTasks', c).subscribe();

  }
  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(baseURL + 'getAllTasks');

  }
  removeTasks(id: number) {
    this.http.delete(baseURL + 'removeTasks/' + id).subscribe(
    );
  }
  update(n: Tasks) {
    this.http.put(baseURL + 'updateTasks', n).subscribe();
  }

}

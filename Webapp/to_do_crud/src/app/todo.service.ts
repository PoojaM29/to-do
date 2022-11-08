import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  subjectNotifier: Subject<null> = new Subject<null>();
 
  constructor(private httpService: HttpClient) {

  }

  notifyAboutChange() {
    this.subjectNotifier.next(null);
  }

  getTodo() {
    let url = "http://localhost:3000/get";
    return this.httpService.get(url);
  }

  AddTodo(data) {
    let url = "http://localhost:3000/add";
    return this.httpService.post(url, data);
  }

  editTodo(data) {
    let url = "http://localhost:3000/update";
    return this.httpService.put(url, data);
  }
  removeTodo(id) {
    let url = "http://localhost:3000/delete/"+ id;
    return this.httpService.delete(url);
  }
}

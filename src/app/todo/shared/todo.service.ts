import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todolist: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.todolist = this.firebasedb.list('chats');
    return this.todolist;
  }

  
  addTitle(title: string, subtitle: string) {
    this.todolist.push({
      title: title,
      subtitle: subtitle,
      alvinIsWon: false,
      lawIsWon: false
    });
  }

  checkOrUncheckTitleAlvin($key: string, flag: boolean) {
    this.todolist.update($key, { alvinIsWon: flag });
  }

  checkOrUncheckTitleLaw($key: string, flag: boolean) {
    this.todolist.update($key, { lawIsWon: flag });
  }

  removeTitle($key: string) {
    this.todolist.remove($key);
  }
}

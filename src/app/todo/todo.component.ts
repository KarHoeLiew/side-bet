import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { FirebaseService } from './shared/firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  GameListArray: any[];
  @Output() isLogout = new EventEmitter<void>();

  constructor(private todoService: TodoService, public firebaseService: FirebaseService) { }

  ngOnInit() {
    this.todoService.getGameList().snapshotChanges()
      .subscribe(item => {
        this.GameListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.GameListArray.push(x);
        });
        // sort array ischecked false -> true
        // this.GameListArray.sort((a, b) => {
        //   return a.isChecked - b.isChecked;
        // });
      });
  }

  onAdd(gameName, dateTime, wager) {
    this.todoService.addGame(gameName.value, dateTime.value, wager.value);
    gameName.value = null;
    dateTime.value = null;
    wager.value = "";
  }

  alterCheckAlvin($key: string, isChecked) {
    this.todoService.checkOrUncheckTitleAlvin($key, !isChecked);
  }
  
  alterCheckLaw($key: string, isChecked) {
    this.todoService.checkOrUncheckTitleLaw($key, !isChecked);
  }

  //not yet used
  onDelete($key: string) {
    this.todoService.removeGame($key);
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}

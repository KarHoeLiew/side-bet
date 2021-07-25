import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        // sort array ischecked false -> true
        // this.toDoListArray.sort((a, b) => {
        //   return a.isChecked - b.isChecked;
        // });
      });
  }

  onAdd(itemTitle, itemSubtitle) {
    this.todoService.addTitle(itemTitle.value, itemSubtitle.value);
    itemTitle.value = null;
    itemSubtitle.value = null;
  }

  alterCheckAlvin($key: string, isChecked) {
    this.todoService.checkOrUncheckTitleAlvin($key, !isChecked);
  }
  
  alterCheckLaw($key: string, isChecked) {
    this.todoService.checkOrUncheckTitleLaw($key, !isChecked);
  }

  onDelete($key: string) {
    this.todoService.removeTitle($key);
  }
}

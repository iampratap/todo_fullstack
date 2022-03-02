import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private _rest: RestService, public _state: StateService) { }

  ngOnInit(): void {
    this.get_tasks();
  }

  markdone(e: any, id: number) {
    console.log(id, e);
    let status;
    if(e.target.checked === true){
      status = 1; 
    } else {
      status = 0
    }
    this._rest.done({ id: id, is_done: status}).subscribe(resp => {
      console.log(resp);
    } ,err => {
      console.log(err);
    })
  }



  delete(i: number) {
    if (confirm('Are you sure?')) {
      this._rest.delete({ id: this._state.todolist[i]['id'] }).subscribe(
        resp => {
          console.log(resp);
          this.get_tasks();
        }, err => {
          console.log(err);
        }
      );
    }
  }

  get_tasks() {
    this._rest.getAllTodo().subscribe((resp) => {
      console.log(resp);
      this._state.todolist = resp as any;
    }, (err) => {
      console.log(err);
    });
  }

}

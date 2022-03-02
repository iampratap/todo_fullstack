import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {
  index = -1;
  id = undefined;
  task = undefined;
  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _state: StateService,
    private _rest: RestService
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.index = params.index;
      this.id = this._state.todolist[this.index]['id'];
      this.task = this._state.todolist[this.index]['task'];
    })
  }

  update(){
    this._rest.update({id : this.id, task :this.task}).subscribe(
      resp => {
        console.log(resp);
        this._router.navigate(['/home','todolist']);
      },
      error => console.log(error)
    )
  }
}

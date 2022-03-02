import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';
import { RightSideBarComponent } from './common/right-side-bar/right-side-bar.component';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './home/todo-list/todo-list.component';
import { AddTodoComponent } from './home/add-todo/add-todo.component';
import { EditTodoComponent } from './home/edit-todo/edit-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RightSideBarComponent,
    HomeComponent,
    TodoListComponent,
    AddTodoComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateToDoComponent } from '../create-to-do/create-to-do.component';
import { TodoService } from '../todo.service'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  allTodos: any = [];
  displayedColumns: string[] = ['title', 'description', 'isDone','edit'];
  notifierSubscription: Subscription = this.api.subjectNotifier.subscribe(notified => {
    this.getTodolist();
  });
  constructor(private dialog: MatDialog,
    private api: TodoService) { }

  ngOnInit(): void {
    this.getTodolist();
  }

  getTodolist(){
    this.api.getTodo().subscribe((data) => {
      this.allTodos = data;
    });
  }
  openDialog(data) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px',
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    this.dialog.open(CreateToDoComponent, dialogConfig);
  }

  openConfirmDialog(data){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.api.removeTodo(data._id).subscribe(() => {
          this.api.notifyAboutChange();
        });
      }
    });
  }

  editTodo(row) {
    this.openDialog(row);
  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }
}

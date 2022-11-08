import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-create-to-do',
  templateUrl: './create-to-do.component.html',
  styleUrls: ['./create-to-do.component.scss']
})
export class CreateToDoComponent implements OnInit {
  breakpoint: any; // Breakpoint observer code
  title: any;
  description: any;
  addToDoForm: FormGroup;
  wasFormChanged = false;
  checked = false;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialog,
    private api: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.title = this.data?.title;
    this.description = this.data?.description;
    this.checked = this.data?.isDone;
    this.addToDoForm = this.fb.group({
      IdProof: null,
      todoTitle: [this.title, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      description: [this.description],
      checked:[this.checked]
    });

  }

  save() {
    this.markAsDirty(this.addToDoForm);
  }
  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  addTodo() {
    let data = {
      "_id": this.data?._id ? this.data?._id : '',
      "title": this.addToDoForm.controls['todoTitle'].value,
      "description": this.addToDoForm.controls['description'].value,
      "isDone": this.checked
    }
    if (this.data) {
      this.api.editTodo(data).subscribe(() => {
        this.dialogRef.closeAll();
        this.api.notifyAboutChange();
      });
    } else {
      delete data._id;
      delete data.isDone;
      this.api.AddTodo(data).subscribe(() => {
        this.dialogRef.closeAll();
        this.api.notifyAboutChange();
      });
    }
    
  }

  formChanged() {
    this.wasFormChanged = true;
  }

  close() {
    this.dialogRef.closeAll();
  }


}

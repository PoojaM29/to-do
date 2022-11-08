import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateToDoComponent } from './create-to-do.component';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';

describe('CreateToDoComponent', () => {
  let component: CreateToDoComponent;
  let fixture: ComponentFixture<CreateToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      declarations: [CreateToDoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.checked = false;
    expect(component).toBeTruthy();
  });

  it('it should call ngonit method', () => {
    component.ngOnInit();
    component.addToDoForm = new FormGroup({
      title: new FormControl("test", Validators.required),
      description: new FormControl("test")
    })
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaPythonEditorComponent } from './formula-python-editor.component';
import { FormulaPythonEditorService } from './formula-python-editor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

describe('FormulaPythonEditorComponent', () => {
  let component: FormulaPythonEditorComponent;
  let fixture: ComponentFixture<FormulaPythonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulaPythonEditorComponent],
      imports: [ReactiveFormsModule, MonacoEditorModule],
      providers: [FormulaPythonEditorService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaPythonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const input = fixture.debugElement.nativeElement.querySelector('ngx-monaco-editor');
    expect(input).toBeTruthy();
  });
});

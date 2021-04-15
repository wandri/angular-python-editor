import { NgModule } from '@angular/core';
import { FormulaPythonEditorComponent } from './formula-python-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';


@NgModule({
  declarations: [
    FormulaPythonEditorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MonacoEditorModule,
  ],
  exports: [
    FormulaPythonEditorComponent,
  ]
})
export class FormulaPythonEditorModule {
}

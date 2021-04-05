import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormulaInputComponent } from './formula-input/formula-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    FormulaInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

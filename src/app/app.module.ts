import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormulaInputComponent } from './formula-input/formula-input.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormulaInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: {
          container: '#edit-toolbar',
        },
      },
      format: 'object',
      scrollingContainer: null,
      placeholder: '',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

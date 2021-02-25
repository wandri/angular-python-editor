import {TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormulaInputComponent} from './formula-input/formula-input.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FormulaInputComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

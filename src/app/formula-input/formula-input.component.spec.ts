import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaInputComponent } from './formula-input.component';

describe('FormulaInputComponent', () => {
  let component: FormulaInputComponent;
  let fixture: ComponentFixture<FormulaInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormulaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.formulas = {
      ids: ['SUM', 'SOM', 'PROD'],
      item: {
        ['SUM']: { name: 'SUM' },
        ['PROD']: { name: 'PROD' },
        ['SOM']: { name: 'SOM' },
      }
    };
  }));

  it('should create', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    expect(input).toBeTruthy();
  });

  it('should display nothing when the user write something', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.dispatchEvent(new Event('input'));
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeFalsy();
  });

  it('should display 2 propositions if the first letter match', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(1);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'S';
    fixture.detectChanges();
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(2);
  });

  it('the matching is case sensitive', () => {
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 's';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeFalsy();
  });

  it('should filter the suggestion', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(2);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SU';
    input.dispatchEvent(new InputEvent('input', { data: 'U' }));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(1);
  });
  it('should suggest a SUM after a SUM', () => {
    spyOn(component, 'getCaretIndex').and.returnValue(6);
    const input = fixture.debugElement.nativeElement.querySelector('.cell-input');
    input.innerHTML = 'SUM(SO';
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    const otherContent = fixture.debugElement.nativeElement.querySelector('.suggestions');
    expect(otherContent).toBeTruthy();

    const suggestions: NodeList = otherContent.querySelectorAll('.suggestion');
    expect(suggestions.length).toEqual(1);
  });
});

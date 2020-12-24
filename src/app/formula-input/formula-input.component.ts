import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula } from '../interfaces/formula';
import { storedFormulas } from '../dataset/formula-list';
import { splitInputText, suggestionNameWithSpaceBeforeIfExistent } from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { storedVariables } from '../dataset/variable-list';
import { InputType, } from '../interfaces/type.enum';
import { Suggestion } from '../interfaces/suggestion';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaInputComponent implements OnInit {
  suggestions: Suggestion[] = [];
  formulaText: string;
  formulas: Store<Formula> = new Store<Formula>();
  variables: Store<Variable> = new Store<Variable>();
  types = InputType;
  formulaSyntax: string;

  suggestionFocusIndex: number = 0;

  @ViewChild('formulaInput', { static: true }) formulaElement: ElementRef;

  getCaretIndex: (element: Node) => number = getCaretIndex;

  get isEmptySuggestion(): boolean {
    return this.suggestions.length === 0;
  }

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  ngOnInit(): void {
    this.formulas.addAllAndSort(storedFormulas);
    this.variables.addAllAndSort(storedVariables);
  }

  onNameChange(): void {
    const text = this.formulaElement.nativeElement.innerHTML;
    let caretIndexToSlice = this.getInputCaretIndex();
    let isCaretOnBracket = text[caretIndexToSlice - 1] === '(';
    if (isCaretOnBracket) {
      caretIndexToSlice = caretIndexToSlice === 0 ? 0 : caretIndexToSlice - 1;
    }
    const formattedContents = text.slice(0, caretIndexToSlice).split(/[(\/+*-]/);
    const formattedContent = formattedContents[formattedContents.length - 1].trim();
    this.formulaSyntax = null;
    this.resetSuggestion();
    if (!!formattedContent) {
      this.buildSuggestionContents(isCaretOnBracket, formattedContent);
    }
    if (!this.isEmptySuggestion) {
      this.suggestionFocusIndex = 0;
    }
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  enterSelectedSuggestion(index: number): void {
    const isFormula = this.suggestions[index].type === InputType.FORMULA;
    const focusSuggestion = isFormula ? this.suggestions[index].formula : this.suggestions[index].variable;
    const inputElement = this.formulaElement.nativeElement;
    const { beforeContent, afterContent, focusContent } = splitInputText(inputElement.innerText, this.getInputCaretIndex());
    let formattedName = suggestionNameWithSpaceBeforeIfExistent(focusSuggestion.name, focusContent[0]);
    this.saveUserInput(`${beforeContent}${formattedName}(${afterContent}`);
    if (isFormula) {
      this.formulaSyntax = (focusSuggestion as Formula).syntax;
    }
    this.resetSuggestion();
    setTimeout(() => {
      setCaret(beforeContent.length + formattedName.length + 1, inputElement);
    }, 0);
  }

  selectSuggestion(index: number): void {
    if (!this.isEmptySuggestion) {
      this.enterSelectedSuggestion(index);
    }
  }

  getInputCaretIndex(): number {
    return this.getCaretIndex(this.formulaElement.nativeElement);
  }

  onKeyDown($event: KeyboardEvent): void {
    if (!this.isEmptySuggestion) {
      if ($event.key === 'ArrowDown') {
        $event.preventDefault();
        this.selectNextSuggestion();
      }
      if ($event.key === 'ArrowUp') {
        $event.preventDefault();
        this.selectPreviousSuggestion();
      }
      if ($event.key === 'Enter') {
        $event.preventDefault();
        this.enterSelectedSuggestion(this.suggestionFocusIndex);
      }
    }
  }

  preventEnterKey($event: KeyboardEvent): void {
    if (!this.isEmptySuggestion) {
      if ($event.key === 'Enter') {
        $event.preventDefault();
      }
    }
  }

  private resetSuggestion(): void {
    this.suggestions = [];
  }

  private selectPreviousSuggestion(): void {
    this.suggestionFocusIndex--;
    if (this.suggestionFocusIndex < 0) {
      this.suggestionFocusIndex = this.suggestions.length - 1;
    }
  }

  private buildSuggestionContents(isCaretOnBracket: boolean, formattedContent: string): void {
    let formulaSuggestionsNumber = 0;
    const suggestions = [];
    for (let name of this.formulas.ids) {
      if (isCaretOnBracket && name === formattedContent) {
        this.formulaSyntax = this.formulas.item[name].syntax;
        break;
      } else if (!isCaretOnBracket && name.startsWith(formattedContent)) {
        suggestions.push({ type: InputType.FORMULA, name, formula: this.formulas.item[name] });

        formulaSuggestionsNumber++;
        if (formulaSuggestionsNumber >= 10) {
          break;
        }
      }
    }
    let variableSuggestionsNumber = 0;
    for (let name of this.variables.ids) {
      if (!isCaretOnBracket && name.toLowerCase().startsWith(formattedContent.toLowerCase())) {
        suggestions.push({ type: InputType.VARIABLE, name, variable: this.variables.item[name] });

        variableSuggestionsNumber++;
        if (variableSuggestionsNumber >= 10) {
          break;
        }
      }
    }
    this.suggestions = suggestions;
  }

  private selectNextSuggestion(): void {
    this.suggestionFocusIndex++;
    if (this.suggestionFocusIndex >= this.suggestions.length) {
      this.suggestionFocusIndex = 0;
    }
  }

  private saveUserInput(fullFormulas: string): void {
    this.formulaText = fullFormulas;
    this.formulaElement.nativeElement.innerHTML = this.formulaText;
  }
}

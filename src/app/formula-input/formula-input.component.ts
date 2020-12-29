import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula } from '../interfaces/formula';
import { storedFormulas } from '../dataset/formula-list';
import {
  buildSyntax,
  findAllPossibleOperations,
  findFormulasOnCaretPosition,
  splitInputText,
  suggestionNameWithSpaceBeforeIfExistent
} from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { storedVariables } from '../dataset/variable-list';
import { InputType, } from '../interfaces/type.enum';
import { Suggestion } from '../interfaces/suggestion';
import { DomSanitizer } from '@angular/platform-browser';
import { FormulaJson } from '../interfaces/formula-json';

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
  formattedFormulaIntoObject: FormulaJson;
  suggestionFocusIndex: number = 0;

  @ViewChild('formulaInput', { static: true }) formulaElement: ElementRef;

  getCaretIndex: (element: Node) => number = getCaretIndex;
  savedCaretIndex = 0;

  get isEmptySuggestion(): boolean {
    return this.suggestions.length === 0;
  }

  constructor(private sanitizer: DomSanitizer) {
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.onKeyUp(event);
  }

  ngOnInit(): void {
    this.formulas.addAllAndSort(storedFormulas);
    this.variables.addAllAndSort(storedVariables);
  }

  onNameChange(): void {
    const innerHTML = this.formulaElement.nativeElement.innerHTML;
    const allPossibleOperations: { index: [number, number], operator: string }[] = findAllPossibleOperations(innerHTML, this.formulas.ids);
    let initialCaretIndex = this.getInputCaretIndex();
    const allCharactersBeforeCaret = innerHTML.slice(0, initialCaretIndex).split(/[()\/ ,+*-]/);
    const charactersJustBeforeCaret = allCharactersBeforeCaret[allCharactersBeforeCaret.length - 1];
    this.resetFormulaSyntax();
    this.resetSuggestion();
    if (!!charactersJustBeforeCaret) {
      let formulaSuggestionsNumber = 0;
      const suggestions = [];
      for (let name of this.formulas.ids) {
        if (name.startsWith(charactersJustBeforeCaret)) {
          suggestions.push({ type: InputType.FORMULA, name, formula: this.formulas.item[name] });
          formulaSuggestionsNumber++;
          if (formulaSuggestionsNumber >= 10) {
            break;
          }
        }
      }
      let variableSuggestionsNumber = 0;
      for (let name of this.variables.ids) {
        if (name.toLowerCase().startsWith(charactersJustBeforeCaret.toLowerCase())) {
          suggestions.push({ type: InputType.VARIABLE, name, variable: this.variables.item[name] });
          variableSuggestionsNumber++;
          if (variableSuggestionsNumber >= 10) {
            break;
          }
        }
      }
      this.suggestions = suggestions;
    }
    if (this.isEmptySuggestion) {
      const formulasOnCaretPosition: { index: [number, number], operator: string }[] = findFormulasOnCaretPosition(initialCaretIndex, allPossibleOperations);
      const onFormulaWithClosingBracket = formulasOnCaretPosition.length > 0;
      if (onFormulaWithClosingBracket) {
        const formulaPosition = formulasOnCaretPosition[0];
        const syntax = this.formulas.item[formulaPosition.operator].syntax;
        const syntaxParameter = this.formulas.item[formulaPosition.operator].syntaxParameter;
        let formattedSyntax = buildSyntax(formulaPosition, innerHTML, initialCaretIndex, syntax, syntaxParameter);
        this.formulaSyntax = this.sanitizer.sanitize(SecurityContext.HTML, formattedSyntax);
      }
    }
    if (!this.isEmptySuggestion) {
      this.suggestionFocusIndex = 0;
    }
    this.generateFormulaJSON(innerHTML, allPossibleOperations);
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  registerPreviousSelection(): void {
    this.savedCaretIndex = this.getInputCaretIndex();
  }

  enterSelectedSuggestion(index: number, caretIndex: number): void {
    const suggestion = this.suggestions[index];
    const isFormula = suggestion.type === InputType.FORMULA;
    const focusSuggestion = isFormula ? suggestion.formula : suggestion.variable;
    const inputElement = this.formulaElement.nativeElement;
    const {
      beforeContent,
      afterContent,
      focusContent
    } = splitInputText(inputElement.innerText, caretIndex);
    let formattedName = suggestionNameWithSpaceBeforeIfExistent(focusSuggestion.name, focusContent[0]);
    let contentToWrite = `${beforeContent}${formattedName}${afterContent}`;
    if (isFormula) {
      if (suggestion.formula.syntaxParameter.length === 0) {
        contentToWrite = `${beforeContent}${formattedName}()${afterContent}`;
      } else {
        contentToWrite = `${beforeContent}${formattedName}(${afterContent}`;
      }
    }
    this.saveUserInput(contentToWrite);
    this.resetSuggestion();
    if (isFormula) {
      this.formulaSyntax = (focusSuggestion as Formula).syntax;
    }
    setTimeout(() => {
      let nextCaretPosition = beforeContent.length + formattedName.length;
      if (isFormula) {
        if (suggestion.formula.syntaxParameter.length === 0) {
          nextCaretPosition += 2;
        } else {
          nextCaretPosition += 1;
        }
      }
      setCaret(nextCaretPosition, inputElement);
    }, 0);
  }

  selectSuggestion(index: number): void {
    if (!this.isEmptySuggestion) {
      this.enterSelectedSuggestion(index, this.savedCaretIndex);
    }
  }

  getInputCaretIndex(): number {
    return this.getCaretIndex(this.formulaElement.nativeElement);
  }

  preventEnterKey($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      $event.preventDefault();
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

  private resetFormulaSyntax(): void {
    this.formulaSyntax = null;
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.onNameChange();
    }
  }

  private onKeyDown($event: KeyboardEvent): void {
    if (!this.isEmptySuggestion) {
      if ($event.key === 'ArrowDown') {
        $event.preventDefault();
        this.selectNextSuggestion();
      }
      if ($event.key === 'ArrowUp') {
        $event.preventDefault();
        this.selectPreviousSuggestion();
      }
      if ($event.key === 'Enter' || $event.key === 'Tab') {
        $event.preventDefault();
        this.enterSelectedSuggestion(this.suggestionFocusIndex, this.getInputCaretIndex());
      }
    }
  }

  private generateFormulaJSON(innerHTML: string, allPossibleOperations: { index: [number, number]; operator: string }[]) {
    const formattedFormulaIntoObject = null;
    this.formattedFormulaIntoObject = formattedFormulaIntoObject;
  }
}

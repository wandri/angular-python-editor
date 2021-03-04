import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  SecurityContext,
  ViewChild
} from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula } from '../interfaces/formula';
import { storedFormulas } from '../dataset/formula-list';
import {
  buildSyntax,
  findAllPossibleOperations,
  findFirstFormulasOnCaretPosition,
  getContentAroundCaret,
  suggestionNameWithSpaceBeforeIfExistent,
  syntaxErrorInFormula
} from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { storedVariables } from '../dataset/variable-list';
import { InputType } from '../interfaces/type.enum';
import { Suggestion } from '../interfaces/suggestion';
import { DomSanitizer } from '@angular/platform-browser';
import * as acorn from 'acorn';
import { AcornNode } from '../interfaces/acorn/acorn-node';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaInputComponent implements OnInit {
  @Output() formulaParsing = new EventEmitter<AcornNode>();
  suggestions: Suggestion[] = [];
  formulaText: string;
  formulas: Store<Formula> = new Store<Formula>();
  variables: Store<Variable> = new Store<Variable>();
  types = InputType;
  formulaSyntax: string;
  suggestionFocusIndex = 0;

  @ViewChild('formulaInput', {static: true}) formulaElement: ElementRef;

  getCaretIndex: (element: Node) => number = getCaretIndex;
  savedCaretIndex = 0;

  constructor(private sanitizer: DomSanitizer) {
  }

  get isEmptySuggestion(): boolean {
    return this.suggestions.length === 0;
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

  onInputChange(): void {
    this.resetFormulaSyntax();
    this.resetSuggestion();

    const innerHTML = this.formulaElement.nativeElement.innerHTML;
    const allPossibleOperations: { index: [number, number], operator: string }[] = findAllPossibleOperations(innerHTML, this.formulas.ids);
    const initialCaretIndex = this.getInputCaretIndex();
    this.suggestions = this.getSuggestionFromCaretPosition(innerHTML, initialCaretIndex);
    if (this.isEmptySuggestion) {
      const firstFormulaOnCaretPosition = findFirstFormulasOnCaretPosition(initialCaretIndex, allPossibleOperations);
      if (firstFormulaOnCaretPosition) {
        const formulaSyntax = this.getFormulaSyntaxOnCaretPosition(firstFormulaOnCaretPosition, innerHTML, initialCaretIndex);
        this.formulaSyntax = this.sanitizer.sanitize(SecurityContext.HTML, formulaSyntax);
      }
    } else {
      this.suggestionFocusIndex = 0;
    }

    this.parseAndEmitFormula(innerHTML);
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  registerPreviousSelection(): void {
    this.savedCaretIndex = this.getInputCaretIndex();
  }

  enterSelectedSuggestion(index: number, caretIndex: number): void {
    const suggestion = this.suggestions[index];
    const isFormula = suggestion.type === InputType.OPERATION;
    const focusSuggestion = isFormula ? suggestion.formula : suggestion.variable;
    const inputElement = this.formulaElement.nativeElement;
    const innerHTML = inputElement.innerHTML;
    const {beforeContent, afterContent, focusContent} = getContentAroundCaret(innerHTML, caretIndex);
    const formattedName = suggestionNameWithSpaceBeforeIfExistent(focusSuggestion.formattedName, focusContent[0]);
    let contentToWrite = `${beforeContent}${formattedName}${afterContent}`;
    if (isFormula) {
      if (suggestion.formula.syntaxParameter.length === 0) {
        contentToWrite = `${beforeContent}${formattedName}()${afterContent}`;
      } else {
        contentToWrite = `${beforeContent}${formattedName}(${afterContent}`;
      }
    }
    this.saveUserInput(contentToWrite);
    this.parseAndEmitFormula(contentToWrite);
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

  private getFormulaSyntaxOnCaretPosition(firstFormulaOnCaretPosition: { index: [number, number]; operator: string },
                                          innerHTML: string, initialCaretIndex: number): string {
    const syntax = this.formulas.item[firstFormulaOnCaretPosition.operator].syntax;
    const syntaxParameter = this.formulas.item[firstFormulaOnCaretPosition.operator].syntaxParameter;
    return buildSyntax(firstFormulaOnCaretPosition, innerHTML, initialCaretIndex, syntax, syntaxParameter);
  }

  private getSuggestionFromCaretPosition(content: string, initialCaretIndex: number): Suggestion[] {
    const operationRegex = /[()\/ ,^%+*-]/;
    const allCharactersBeforeCaret = content.slice(0, initialCaretIndex).split(operationRegex);
    const charactersJustBeforeCaret = allCharactersBeforeCaret[allCharactersBeforeCaret.length - 1];
    if (!!charactersJustBeforeCaret) {
      let formulaSuggestionsNumber = 0;
      const suggestions = [];
      for (const formattedName of this.formulas.ids) {
        if (formattedName.startsWith(charactersJustBeforeCaret)) {
          const operation: Suggestion = {
            type: InputType.OPERATION,
            name: formattedName,
            formula: this.formulas.item[formattedName],
          };
          suggestions.push(operation);
          formulaSuggestionsNumber++;
          if (formulaSuggestionsNumber >= 10) {
            break;
          }
        }
      }
      let variableSuggestionsNumber = 0;
      for (const formattedName of this.variables.ids) {
        if (formattedName.toLowerCase().startsWith(charactersJustBeforeCaret.toLowerCase())) {
          const variable: Suggestion = {
            type: InputType.VARIABLE,
            name: formattedName,
            variable: this.variables.item[formattedName],
          };
          suggestions.push(variable);
          variableSuggestionsNumber++;
          if (variableSuggestionsNumber >= 10) {
            break;
          }
        }
      }
      return suggestions;
    } else {
      return [];
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
      this.onInputChange();
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

  private parseAndEmitFormula(innerHTML: string): void {
    let error = null;
    let formulaTree: AcornNode = null;
    try {
      formulaTree = acorn.parse(innerHTML, {ecmaVersion: 2021}) as AcornNode;
    } catch (e) {
      error = `${e}`;
    } finally {
      if (!!formulaTree) {
        error = syntaxErrorInFormula(formulaTree, this.formulas, this.variables.ids);
        if (!error) {
          this.formulaParsing.emit(formulaTree);
        }
      }
      if (!!error) {
        this.formulaParsing.emit();
        console.log(error);
      }
    }
  }
}

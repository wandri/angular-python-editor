import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SecurityContext,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula } from '../interfaces/formula';
import {
  buildSyntax,
  findAllPossibleOperations,
  findFirstFormulasOnCaretPosition,
  formatAcornError,
  getContentAroundCaret,
  isBracketMissing,
  suggestionNameWithSpaceBeforeIfExistent,
  syntaxErrorInFormula
} from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { InputType } from '../interfaces/type.enum';
import { Suggestion } from '../interfaces/suggestion';
import { DomSanitizer } from '@angular/platform-browser';
import * as acorn from 'acorn';
import { AcornNode } from '../interfaces/acorn/acorn-node';
import { QuillEditorComponent } from 'ngx-quill';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaInputComponent implements OnChanges {
  // TODO use QUILL for colour text
  @Input() formulas: Formula[] = [];
  @Input() variables: Variable[] = [];
  @Output() formulaParsing = new EventEmitter<{ node: AcornNode, error: string }>();
  @ViewChild('quillEditor', {static: true}) quillEditorComponent: QuillEditorComponent;
  @ViewChild('formulaInput', {static: true}) formulaElement: ElementRef;

  readonly InputType = InputType;
  storedFormulas: Store<Formula> = new Store<Formula>();
  storedVariables: Store<Variable> = new Store<Variable>();
  suggestions: Suggestion[] = [];
  formulaSyntax: string;
  suggestionFocusIndex = 0;
  savedCaretIndex = 0;
  initialFormula = new FormControl([]);
  formulaText = '';

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

  ngOnChanges(changes: SimpleChanges): void {
    const formulasChanges: SimpleChange = changes['formulas'];
    const variablesChanges: SimpleChange = changes['variables'];
    if (formulasChanges && formulasChanges.currentValue) {
      this.storedFormulas.addWithFormattingAndSorting(formulasChanges.currentValue);
    }
    if (variablesChanges && variablesChanges.currentValue) {
      this.storedVariables.addWithFormattingAndSorting(variablesChanges.currentValue);
    }
  }

  activateEdition($event: any) {
    $event.formatLine(0, 0, {'code-block': 'javascript'});
  }

  onInputChange(): void {
    this.inputChange(this.formulaText);
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  registerPreviousSelection(): void {
    this.savedCaretIndex = this.getInputCaretIndex();
  }

  selectSuggestion(index: number): void {
    if (!this.isEmptySuggestion) {
      this.enterSelectedSuggestion(index, this.savedCaretIndex);
    }
  }

  getInputCaretIndex(): number {
    return getCaretIndex(this.formulaElement.nativeElement);
  }

  preventEnterKey($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      $event.preventDefault();
    }
  }

  private getFormulaSyntaxOnCaretPosition(firstFormulaOnCaretPosition: { index: [number, number]; operator: string },
                                          innerText: string, initialCaretIndex: number): string {
    const syntax = this.storedFormulas.item[firstFormulaOnCaretPosition.operator].syntax;
    const syntaxParameter = this.storedFormulas.item[firstFormulaOnCaretPosition.operator].syntaxParameter;
    return buildSyntax(firstFormulaOnCaretPosition, innerText, initialCaretIndex, syntax, syntaxParameter);
  }

  private getSuggestionFromCaretPosition(content: string, initialCaretIndex: number): Suggestion[] {
    const operationRegex = /[()\/ ,^%+*-]/;
    const allCharactersBeforeCaret = content.slice(0, initialCaretIndex).split(operationRegex);
    const charactersJustBeforeCaret = allCharactersBeforeCaret[allCharactersBeforeCaret.length - 1];
    if (!!charactersJustBeforeCaret) {
      let formulaSuggestionsNumber = 0;
      const suggestions = [];
      for (const formattedName of this.storedFormulas.ids) {
        if (formattedName.startsWith(charactersJustBeforeCaret)) {
          const operation: Suggestion = {
            type: InputType.OPERATION,
            name: formattedName,
            formula: this.storedFormulas.item[formattedName],
          };
          suggestions.push(operation);
          formulaSuggestionsNumber++;
          if (formulaSuggestionsNumber >= 10) {
            break;
          }
        }
      }
      let variableSuggestionsNumber = 0;
      for (const formattedName of this.storedVariables.ids) {
        if (formattedName.toLowerCase().startsWith(charactersJustBeforeCaret.toLowerCase())) {
          const variable: Suggestion = {
            type: InputType.VARIABLE,
            name: formattedName,
            variable: this.storedVariables.item[formattedName],
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

  private enterSelectedSuggestion(index: number, caretIndex: number): void {
    const suggestion = this.suggestions[index];
    const isFormula = suggestion.type === InputType.OPERATION;
    const focusSuggestion = isFormula ? suggestion.formula : suggestion.variable;
    const inputElement = this.formulaElement.nativeElement;
    const innerText = inputElement.innerText;
    const {beforeContent, afterContent, focusContent} = getContentAroundCaret(innerText, caretIndex);
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

  editorChange($event: any) {
    console.log($event);
    this.formulaText = $event.text;
    this.inputChange($event.text);
  }

  private selectNextSuggestion(): void {
    this.suggestionFocusIndex++;
    if (this.suggestionFocusIndex >= this.suggestions.length) {
      this.suggestionFocusIndex = 0;
    }
  }

  private saveUserInput(fullFormulas: string): void {
    this.formulaElement.nativeElement.innerText = fullFormulas;
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

  private parseAndEmitFormula(text: string): void {
    let error = null;
    let formulaTree: AcornNode = null;
    try {
      console.log(text);
      formulaTree = acorn.parse(text, {ecmaVersion: 2021}) as AcornNode;
      console.log(formulaTree);
    } catch (e: unknown) {
      error = `${e}`;
      if (isBracketMissing(text)) {
        error = 'A bracket is missing';
      } else {
        error = formatAcornError(error);
      }
    } finally {
      if (!!formulaTree) {
        error = syntaxErrorInFormula(formulaTree, this.storedFormulas, this.storedVariables.ids);
      }
      this.formulaParsing.emit({node: formulaTree, error});
    }
  }

  private inputChange(innerText): void {
    this.resetFormulaSyntax();
    this.resetSuggestion();

    const allPossibleOperations: { index: [number, number], operator: string }[] = findAllPossibleOperations(innerText,
      this.storedFormulas.ids);
    const initialCaretIndex = this.getInputCaretIndex();
    this.suggestions = this.getSuggestionFromCaretPosition(innerText, initialCaretIndex);
    if (this.isEmptySuggestion) {
      const firstFormulaOnCaretPosition = findFirstFormulasOnCaretPosition(initialCaretIndex, allPossibleOperations);
      if (firstFormulaOnCaretPosition) {
        const formulaSyntax = this.getFormulaSyntaxOnCaretPosition(firstFormulaOnCaretPosition, innerText, initialCaretIndex);
        this.formulaSyntax = this.sanitizer.sanitize(SecurityContext.HTML, formulaSyntax);
      }
    } else {
      this.suggestionFocusIndex = 0;
    }

    this.parseAndEmitFormula(innerText);
  }
}

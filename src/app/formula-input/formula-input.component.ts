import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { getCaretIndex, setCaret } from './carret-utils';
import { Formula, Store } from './formula';
import { storedFormulas } from './formula-list';
import { splitInputText, suggestionNameWithSpaceBeforeIfExistent } from './input-utils';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormulaInputComponent implements OnInit {
  suggestions: Formula[] = [];

  formulaText: string;
  formulas: Store<Formula> = {
    ids: [],
    item: {}
  };

  formulaSyntax: string;

  suggestionFocusIndex: number = 0;

  @ViewChild('formulaInput', { static: true }) formulaElement: ElementRef;

  getCaretIndex: (element: Node) => number = getCaretIndex;

  get caretIndex(): number {
    return this.getCaretIndex(this.formulaElement.nativeElement);
  }

  get areSuggestionsDisplayed(): boolean {
    return this.suggestions.length > 0;
  }

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  ngOnInit(): void {
    storedFormulas.forEach(formula => {
      this.formulas.item[formula.name] = formula;
      this.formulas.ids.push(formula.name);
    });

    this.formulas.ids.sort();
  }

  onNameChange(): void {
    const cellInput = this.formulaElement.nativeElement;
    const text = cellInput.innerHTML;
    const propositions = [];
    let caretIndexToSlice = this.caretIndex;
    let isBracketPosition = text[this.caretIndex - 1] === '(';
    if (isBracketPosition) {
      caretIndexToSlice = this.caretIndex === 0 ? 0 : this.caretIndex - 1;
    }
    const formattedContents = text.slice(0, caretIndexToSlice).split(/[(\/+*-]/);
    const formattedContent = formattedContents[formattedContents.length - 1].trim();
    this.formulaSyntax = null;
    if (!!formattedContent) {
      for (let name of this.formulas.ids) {
        if (isBracketPosition && name === formattedContent) {
          this.formulaSyntax = this.formulas.item[name].syntax;
          break;
        } else if (!isBracketPosition && name.startsWith(formattedContent)) {
          propositions.push(this.formulas.item[name]);
          const limitSuggestionTo10 = propositions.length === 10;
          if (limitSuggestionTo10) {
            break;
          }
        }
      }
    }
    this.suggestions = propositions;
    if (this.areSuggestionsDisplayed) {
      this.suggestionFocusIndex = 0;
    }
  }

  focusSuggestion(index: number): void {
    this.suggestionFocusIndex = index;
  }

  enterSelectedSuggestion(index: number): void {
    const focusSuggestion = this.suggestions[index];
    const inputElement = this.formulaElement.nativeElement;
    const { beforeContent, afterContent, focusContent } = splitInputText(inputElement.innerText, this.caretIndex);
    let formattedName = suggestionNameWithSpaceBeforeIfExistent(focusSuggestion.name, focusContent[0]);
    this.saveUserInput(`${beforeContent}${formattedName}(${afterContent}`);
    this.resetSuggestion();
    setTimeout(() => {
      setCaret(beforeContent.length + formattedName.length + 1, inputElement);
    }, 0);
  }

  selectSuggestion(index: number): void {
    if (this.areSuggestionsDisplayed) {
      this.enterSelectedSuggestion(index);
    }
  }

  onKeyDown($event: KeyboardEvent): void {
    if (this.areSuggestionsDisplayed) {
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
    if (!this.areSuggestionsDisplayed) {
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

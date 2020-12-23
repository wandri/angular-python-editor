import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCaretIndex } from './carret-utils';
import { Formula, Store } from './formula';
import { storedFormulas } from './formula-list';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormulaInputComponent implements OnInit {
  suggestions: Formula[] = [];

  formulas: Store<Formula> = {
    ids: [],
    item: {}
  };

  getCaretIndex: (node: Node) => number = getCaretIndex;
  formulaSyntax: string;
  suggestionFocusIndex: number = 0;

  get areSuggestionsDisplayed(): boolean {
    return this.suggestions.length > 0;
  }

  constructor() {
  }

  ngOnInit(): void {
    storedFormulas.forEach(formula => {
      this.formulas.item[formula.name] = formula;
      this.formulas.ids.push(formula.name);
    });

    this.formulas.ids.sort();
  }

  onNameChange(event: any): void {
    const cellInput = (event.target as HTMLInputElement);
    const propositions = [];
    const text = cellInput.innerHTML;
    const caretIndex = this.getCaretIndex(cellInput);
    let caretIndexToSlice = caretIndex;
    let isBracketPosition = text[caretIndex - 1] === '(';
    if (isBracketPosition) {
      caretIndexToSlice = caretIndex === 0 ? 0 : caretIndex - 1;
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
        this.enterSuggestion();
      }
    }
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

  private enterSuggestion(): void {

  }
}

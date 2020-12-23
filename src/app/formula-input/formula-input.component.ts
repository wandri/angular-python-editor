import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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

  formulaText: string;
  formulas: Store<Formula> = {
    ids: [],
    item: {}
  };
  getCaretIndex: (node: Node) => number = getCaretIndex;
  caretIndex: number;
  formulaSyntax: string;

  suggestionFocusIndex: number = 0;
  @ViewChild('formulaInput', { static: true }) formulaElement: ElementRef;

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
    const propositions = [];
    const text = cellInput.innerHTML;
    this.caretIndex = this.getCaretIndex(cellInput);
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
    const { contentBeforeFormula, contentAfterFormula, contentOnFormula } = this.getContentBetweenFormula();
    const focusSuggestion = this.suggestions[index];
    const name = focusSuggestion.name;
    let isSpaceAdded = false;
    if (contentOnFormula[0] === ' ') {
      isSpaceAdded = true;
    }
    let formattedName = `${isSpaceAdded ? ' ' : ''}${name}`;
    this.suggestions = [];
    this.formulaText = `${contentBeforeFormula}${formattedName}(${contentAfterFormula}`;
    this.formulaElement.nativeElement.innerHTML = this.formulaText;
    setTimeout(() => {
      this.setCaret(contentBeforeFormula.length + formattedName.length + 1);
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

  setCaret(index: number) {
    const formulaInput = this.formulaElement.nativeElement;
    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(formulaInput.childNodes[0], index);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
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

  private getContentBetweenFormula(): { contentOnFormula: string; contentBeforeFormula: string, contentAfterFormula: string } {
    let contentBeforeFormula = '';
    let contentAfterFormula = '';
    let contentOnFormula = '';
    let characterPosition = 0;

    const specialCharacters = ['/', '*', '+', '('];
    let content = '';
    const formattedContents = [];
    const text = this.formulaElement.nativeElement.innerText;
    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      content += character;
      if (specialCharacters.includes(character)) {
        formattedContents.push(content);
        content = '';
      }
    }
    formattedContents.push(content);
    formattedContents.forEach(content => {
      const isBeforeFormula = characterPosition + content.length < this.caretIndex;
      const isOnFormulaPosition = characterPosition <= this.caretIndex && this.caretIndex <= characterPosition + content.length;
      if (isBeforeFormula) {
        contentBeforeFormula += content;
        characterPosition += content.length;
      } else if (isOnFormulaPosition) {
        contentOnFormula = content;
        characterPosition += 9999;
      } else {
        contentAfterFormula += content;
      }
    });
    return { contentBeforeFormula, contentAfterFormula, contentOnFormula };
  }

  preventEnterKey($event: KeyboardEvent) {
    if (!this.areSuggestionsDisplayed) {
      if ($event.key === 'Enter') {
        $event.preventDefault();
      }
    }
  }
}

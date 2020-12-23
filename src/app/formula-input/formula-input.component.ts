import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCaretIndex } from './carret-utils';
import { Formula, Store } from './formula';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormulaInputComponent implements OnInit {
  suggestions: any[] = [];

  formulas: Store<Formula> = {
    ids: ['SUM', 'SUMO', 'SOM', 'PROD'],
    item: {
      ['SUM']: { name: 'SUM', description: 'SUM detail' },
      ['SUMO']: { name: 'SUMO', description: 'SUMO detail' },
      ['PROD']: { name: 'PROD', description: 'PROD detail' },
      ['SOM']: { name: 'SOM', description: 'SOM detail' },
    }
  };

  getCaretIndex: (node: Node) => number = getCaretIndex;
  formulaDescription: string;

  constructor() { }

  ngOnInit(): void {
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
    const formattedContent = formattedContents[formattedContents.length - 1];
    this.formulaDescription = null;
    if (!!formattedContent) {
      for (let name of this.formulas.ids) {
        if (isBracketPosition && name === formattedContent) {
          this.formulaDescription = this.formulas.item[name].description;
          break;
        } else if (!isBracketPosition && name.startsWith(formattedContent)) {
          propositions.push(this.formulas.item[name]);
        }
      }
    }
    this.suggestions = propositions;
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getCaretIndex } from './carret-utils';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormulaInputComponent implements OnInit {
  suggestions: any[] = [];

  formulas = {
    ids: ['SUM', 'SOM', 'PROD'],
    item: {
      ['SUM']: { name: 'SUM' },
      ['PROD']: { name: 'PROD' },
      ['SOM']: { name: 'SOM' },
    }
  };

  getCaretIndex: (node: Node) => number = getCaretIndex;

  constructor() { }

  ngOnInit(): void {
  }

  onNameChange(event: any): void {
    const cellInput = (event.target as HTMLInputElement);
    const propositions = [];

    const caretIndex = this.getCaretIndex(cellInput);
    const formattedContents = cellInput.innerHTML.slice(0, caretIndex).split(/[(\/+-]/);
    const formattedContent = formattedContents[formattedContents.length - 1];
    if (!!formattedContent) {
      for (let name of this.formulas.ids) {
        if (name.startsWith(formattedContent)) {
          propositions.push(this.formulas.item[name]);
        }
      }
    }
    this.suggestions = propositions;
  }

}

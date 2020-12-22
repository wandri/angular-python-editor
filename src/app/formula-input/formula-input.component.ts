import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onNameChange(event: any) {
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
    //console.log(this.getCaretCoordinates());
  }

  getCaretCoordinates() {
    let x = 0,
      y = 0;
    const selection = window.getSelection();
    // Check if there is a selection (i.e. cursor in place)
    if (selection.rangeCount !== 0) {
      // Clone the range
      const range = selection.getRangeAt(0).cloneRange();
      // Collapse the range to the start, so there are not multiple chars selected
      range.collapse(true);
      // getCientRects returns all the positioning information we need
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left; // since the caret is only 1px wide, left == right
        y = rect.top; // top edge of the caret
      }
    }
    return { x, y };
  }

  getCaretIndex(element) {
    let position = 0;
    const selection = window.getSelection();
    // Check if there is a selection (i.e. cursor in place)
    if (selection.rangeCount !== 0) {
      // Store the original range
      const range = window.getSelection().getRangeAt(0);
      // Clone the range
      const preCaretRange = range.cloneRange();
      // Select all textual contents from the contenteditable element
      preCaretRange.selectNodeContents(element);
      // And set the range end to the original clicked position
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      // Return the text length from contenteditable start to the range end
      position = preCaretRange.toString().length;
    }
    return position;
  }
}

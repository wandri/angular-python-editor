import { Component } from '@angular/core';
import { AcornNode } from './interfaces/acorn/acorn-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-like';
  formula: string = null;
  error: string = null;

  parseFormula(formula: { node: AcornNode, error: string }) {
    if (formula && formula.node) {
      this.formula = JSON.stringify(formula.node, null, 4);
    } else {
      this.formula = null;
      this.error = formula && formula.error;
    }
  }
}

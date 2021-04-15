import { Component } from '@angular/core';
import { AcornNode } from '../../projects/formula-python-editor/src/lib/interfaces/acorn/acorn-node';
import { editorFormulas } from './suggestion-formulas';
import { editorVariables } from './suggestion-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-like';
  formula: string = null;
  error: string = null;

  storedFormulas = editorFormulas;
  storedVariables = editorVariables;

  code = `if vh_age > 5 and MAX(drv_age1) > 5:
      return 6
elif vh_age >= 10:
      return 10
else:
      return SUM(ABS(drv_age1),drv_age2)`;

  parseFormula(formula: { node: AcornNode, error: string, code: string }) {
    if (formula && formula.node && !formula.error) {
      this.formula = JSON.stringify(formula.node, null, 4);
      this.error = null;
    } else {
      this.formula = null;
      this.error = formula && formula.error;
    }
  }
}

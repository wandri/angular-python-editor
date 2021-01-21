import {Component} from '@angular/core';
import {AcornNode} from './interfaces/acorn/acorn-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-like';
  formula: string = null;

  parseFormula(flatFormula: AcornNode) {
    this.formula = JSON.stringify(flatFormula, null, 4);
  }
}

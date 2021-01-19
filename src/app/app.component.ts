import {Component} from '@angular/core';
import {FlatFormula} from './interfaces/flat-formula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-like';
  formula: string = null;

  parseFormula(flatFormula: FlatFormula[]) {
    this.formula = JSON.stringify(flatFormula, null, 4);
  }
}

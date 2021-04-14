import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Formula } from '../interfaces/formula';
import { formatAcornError, isBracketMissing, syntaxErrorInFormula } from './input-utils';
import { Store } from '../interfaces/store';
import { Variable } from '../interfaces/variable';
import { DomSanitizer } from '@angular/platform-browser';
import * as filbert from 'filbert';
import { AcornNode } from '../interfaces/acorn/acorn-node';
import { MonacoEditorConstructionOptions } from '@materia-ui/ngx-monaco-editor/lib/interfaces';
import { MonacoEditorLoaderService } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';
import { customLanguageName, customThemeName, loadCustomMonaco } from '../monaco/monaco';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formula-input',
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaInputComponent implements OnChanges {
  @Input() code: string;
  @Input() formulas: Formula[] = [];
  @Input() variables: Variable[] = [];

  @Output() formulaParsing = new EventEmitter<{ node: AcornNode, error: string, code: string }>();

  readonly editorOptions: MonacoEditorConstructionOptions = {
    theme: customThemeName,
    language: customLanguageName,
    minimap: {
      enabled: false,
    },
  };

  reactiveForm: FormControl;
  storedFormulas: Store<Formula> = new Store<Formula>();
  storedVariables: Store<Variable> = new Store<Variable>();
  suggestionFocusIndex = 0;
  savedCaretIndex = 0;

  constructor(private sanitizer: DomSanitizer, private monacoLoaderService: MonacoEditorLoaderService) {
    this.reactiveForm = new FormControl('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const formulasChanges: SimpleChange = changes['formulas'];
    const variablesChanges: SimpleChange = changes['variables'];
    const codeChanges: SimpleChange = changes['code'];
    if (formulasChanges && formulasChanges.currentValue) {
      this.storedFormulas.addWithFormattingAndSorting(formulasChanges.currentValue);
    }
    if (variablesChanges && variablesChanges.currentValue) {
      this.storedVariables.addWithFormattingAndSorting(variablesChanges.currentValue);
    }
    if (codeChanges && codeChanges.currentValue) {
      this.reactiveForm.setValue(codeChanges.currentValue);
    }
    if (variablesChanges && variablesChanges.currentValue || formulasChanges && formulasChanges.currentValue) {
      this.monacoLoaderService.isMonacoLoaded$.pipe(
        filter(isLoaded => isLoaded),
        take(1),
      ).subscribe(() => {
        loadCustomMonaco(this.storedFormulas, this.storedVariables);
      });
    }
  }

  monacoEditorChange(text: any) {
    this.parseAndEmitFormula(text);
  }

  private parseAndEmitFormula(innerText: string): void {
    let error = null;
    let formulaTree: AcornNode = null;
    const indentString = (str) => str.replace(/^/gm, '  ');
    const textInsideFunction = `def fakeFunction():\n${indentString(innerText)}`;
    try {
      formulaTree = filbert.parse(textInsideFunction, {ecmaVersion: 2021}) as AcornNode;
    } catch (e: unknown) {
      error = `${e}`;
      if (isBracketMissing(innerText)) {
        error = 'A bracket is missing';
      } else {
        error = formatAcornError(error);
      }
    } finally {
      if (!!formulaTree) {
        error = syntaxErrorInFormula(formulaTree, this.storedFormulas, this.storedVariables.ids);
      }
      this.formulaParsing.emit({node: formulaTree, error, code: this.reactiveForm.value});
    }
  }

}

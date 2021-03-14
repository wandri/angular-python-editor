# Excel-like-formula

**Why** : With the development of data science applications, It can be useful to let users write custom formulas with
supervision in order to be able to replicate this formulas in the backend with ease.

**What** :

The `<FormulaInputComponent></FormulaInputComponent>` provides

- :white_check_mark: Variable suggestions
- :white_check_mark: Function suggestions
- :white_check_mark: Formula syntax checker

## API

| @ Input  | Description  | Type  | Required   | Default |
| :------------ | :------------ | :------------ | :------------ | :------------ |
|  formulas | List of authorized formulas  |  Formula[] | No | [] |
|  variables | List of authorized variables  |  Variable[] |  No | [] |

| @ Output  | Description  | Type   |
| :------------ | :------------ | :------------ |
|  formulaParsing | Parsing formula with Acorn.js  |  `{ node: AcornNode, error: string }`|

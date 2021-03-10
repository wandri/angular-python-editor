export class Store<T extends { name: string }> {
  ids: string[];
  item: { [id: string]: T & { formattedName: string } };

  constructor() {
    this.ids = [];
    this.item = {};
  }

  addWithFormattingAndSorting(items: T[]): void {
    items.forEach(formula => {
      this.addWithFormatting(formula);
    });
    this.sortIds();
  }

  private addWithFormatting(item: T): void {
    const formattedName = item.name.replace(/[ ()/,`'*^%+-]/g, '_');
    this.item[formattedName] = {...item, formattedName};
    this.ids.push(formattedName);
  }

  private sortIds(): void {
    this.ids.sort();
  }
}

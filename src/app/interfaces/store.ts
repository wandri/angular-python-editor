export class Store<T extends { label: string }> {
  ids: string[];
  item: { [id: string]: T & { formattedLabel: string } };

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
    const formattedLabel = item.label.replace(/[ ()/,`'*^%+-]/g, '_');
    this.item[formattedLabel] = {...item, formattedLabel};
    this.ids.push(formattedLabel);
  }

  private sortIds(): void {
    this.ids.sort();
  }
}

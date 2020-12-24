export class Store<T extends { name: string }> {
  ids: string[];
  item: { [id: string]: T };

  constructor() {
    this.ids = [];
    this.item = {};
  }

  addAllAndSort(items: T[]): void {
    items.forEach(formula => {
      this.add(formula);
    });
    this.sortIds();
  }

  private add(item: T): void {
    this.item[item.name] = item;
    this.ids.push(item.name);
  }

  private sortIds(): void {
    this.ids.sort();
  }
}

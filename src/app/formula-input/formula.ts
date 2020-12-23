export interface Formula {
  name: string;
  description: string;
  syntax: string;
  shortDescription?: string,
}

export interface Store<T> {
  ids: string[];
  item: { [id: string]: T }
}

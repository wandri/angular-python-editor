export interface Formula {
  name: string;
  description: string;
}

export interface Store<T> {
  ids: string[];
  item: { [id: string]: T }
}

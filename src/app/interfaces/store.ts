export interface Store<T> {
  ids: string[];
  item: { [id: string]: T }
}

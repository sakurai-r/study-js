type Constructor<T> = new () => T;

export default class TypeMap {
  private map = new Map();

  set<T>(type: Constructor<T>, value: T): void {
    this.map.set(type, value);
  }

  get<T>(type: Constructor<T>): T {
    return this.map.get(type);
  }
}

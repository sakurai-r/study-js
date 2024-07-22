type Constructor<T> = new (...args: any[]) => T;

export default class TypeMap {
  private map = new Map<Constructor<any>, any>();

  set<T>(type: Constructor<T>, value: T): void {
    this.map.set(type, value);
  }

  get<T>(type: Constructor<T>): T {
    return this.map.get(type);
  }
}

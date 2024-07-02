//export function Warrior(atk) {
//  this.atk = atk;
//}

//Warrior.prototype = {
//  attack: function () {
//    return this.atk * 2;
//  },
//};

//export function MageWarrior(atk, mgc) {
//  this.atk = atk;
//  this.mgc = mgc;
//}

//// MageWarrior プロトタイプが、Warrior プロトタイプを継承するようにする。
//MageWarrior.prototype = Object.create(Warrior.prototype);

//// Warrior.prototype.constructor は継承したくないので、constructor プロパティを定義する。
//MageWarrior.prototype.constructor = MageWarrior;

//// 独自のattack() メソッドを定義することで、
//// Warrior から継承した attack() メソッドをオーバーライドする。
//MageWarrior.prototype.attack = function () {
//  return this.atk * 2 + this.mgc;
//};

export class Warrior {
  #atk;
  constructor(atk) {
    this.#atk = atk;
  }

  attack() {
    return this.#atk * 2;
  }
}

export class MageWarrior extends Warrior {
  #mgc;
  constructor(atk, mgc) {
    super(atk);
    this.#mgc = mgc;
  }

  attack() {
    return super.attack() + this.#mgc;
  }
}

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    display() {
        return console.log(`Point: (x = ${this.x}, y = ${this.y})`);
    }

    add(p: Point) {
        this.x += p.x;
        this.y += p.y;
    }

    distance() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

const p1 = new Point(1, 1);
const p2 = new Point(4, 5);
p1.add(p2);
p1.display();

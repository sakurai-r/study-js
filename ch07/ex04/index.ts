const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

//1. mathの全員の合計点
console.log(data.reduce((x, y) => x + y.math, 0)); // => 530

//2. クラスAのchemistryの平均点
const aClass = data.filter((v) => v.class === "A");
console.log(aClass.reduce((x, y) => x + y.chemistry, 0) / aClass.length); // => 45

//3. 3科目合計点のクラスC内での平均点
const cClass = data.filter((v) => v.class === "C");
console.log(
  cClass.reduce((x, y) => x + y.math + y.chemistry + y.geography, 0) /
    cClass.length
); // => 176.666...

//4. 3科目合計点が最も高い人のname
console.log(
  data
    .map((x) => {
      return { name: x.name, sum: x.math + x.chemistry + x.geography };
    })
    .reduce((x, y) => (x.sum > y.sum ? x : y)).name
); // => Frank

//5. 全体のgeographyの標準偏差
const geographyAvg = data.reduce((x, y) => x + y.geography, 0) / data.length;
const deviation = data.map((x) => x.geography - geographyAvg); // 偏差
const variance =
  deviation.reduce((x, y) => x + Math.pow(y, 2), 0) / deviation.length; //分散
console.log(Math.sqrt(variance)); // => 22.333056935824

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

console.log(
  data.sort((a, b) => {
    if (a.math < b.math) {
      return 1;
    }
    if (a.math > b.math) {
      return -1;
    }
    if (a.chemistry < b.chemistry) {
      return 1;
    }
    if (a.chemistry > b.chemistry) {
      return -1;
    }
    return 0;
  })
);

//data.sort(
//  (a, b) =>
//    a.math - b.math || a.chemistry - b.chemistry || a.geography || b.geography
//);

//[
//  { name: 'Frank', class: 'B', math: 90, chemistry: 70, geography: 80 },
//  { name: 'Justin', class: 'C', math: 80, chemistry: 40, geography: 30 },
//  { name: 'Carol', class: 'A', math: 70, chemistry: 55, geography: 30 },
//  { name: 'Isaac', class: 'C', math: 70, chemistry: 40, geography: 50 },
//  { name: 'Ellen', class: 'B', math: 60, chemistry: 70, geography: 40 },
//  { name: 'Mallet', class: 'C', math: 60, chemistry: 70, geography: 90 },
//  { name: 'Bob', class: 'A', math: 50, chemistry: 50, geography: 60 },
//  { name: 'Dave', class: 'B', math: 40, chemistry: 20, geography: 60 },
//  { name: 'Alice', class: 'A', math: 10, chemistry: 30, geography: 20 }
//]

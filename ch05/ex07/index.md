```ts
function f() {
  try {
    return true;
  } finally {
    return false;
  }
}

console.log(f());
```

try ブロックの return 文が実行された後に finally ブロックが実行されるので
false が返る

// nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => console.log(link.href));

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const productList = document.querySelectorAll(".product-item");

productList.forEach((item) => {
  console.log(item);
});

// カートアイコンの画像 (<img>)
console.log(document.querySelector(".cart img"));

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const productPriceList = document.querySelectorAll(".product-item .price");

productPriceList.forEach((price) => {
  console.log(price);
});

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const productImgList = document.querySelectorAll(".product-item img");

productImgList.forEach((img) => {
  console.log(img);
});

// 検索バー (.search-bar) 内の検索ボタン (<button>)
console.log(document.querySelector(".search-bar button"));

// フッター (footer) 内のパラグラフ (<p>) 要素
console.log(document.querySelector("footer p"));

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const productEvenList = document.querySelectorAll(
  ".product-item:nth-child(even)"
);

productEvenList.forEach((item) => {
  console.log(item);
});

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log(document.querySelector(".account img"));

// ナビゲーションリンクのうち、"会社情報" のリンク
console.log(document.querySelector("nav a[href='#about']"));

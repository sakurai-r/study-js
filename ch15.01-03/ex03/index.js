const el = document.getElementById("el");
console.log(el.integrity);
//$ cat index.js | openssl dgst -sha384 -binary | openssl base64 -A
//z+P5JodmAycxKLIfsJKLkGDZNoJRoBmcqO0VWlz8ZF+hkUGpnI7VqlF4G9SJZtdN

document.getElementById("test").innerText = "test";

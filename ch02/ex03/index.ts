const pan = "パン";

// NFC
const panNFC = pan.normalize();
console.log(panNFC);
// NFD
const panNFD = pan.normalize("NFD");
console.log(panNFD);

console.log(panNFC == panNFD);
console.log(panNFC === panNFD);

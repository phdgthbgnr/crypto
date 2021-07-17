importScripts('crypto-js.js');

function decrypt(data) {
  const master_key = 'M48sXt5HTWpLhHpa_4j2_cF2kNJ6A6Lj'; //32

  // Decode the base64 data so we can separate iv and crypt text.
  // const rawData = atob(data);
  // console.log(rawData);
  // Split by 16 because my IV size
  const rawData = CryptoJS.enc.Base64.parse(data);
  // https://stackoverflow.com/questions/30990129/encrypt-in-python-decrypt-in-javascript
  let iv = rawData.substring(0, 16);
  var crypttext = rawData.substring(16);

  console.log(iv);
  console.log('-------------------');
  console.log(crypttext);
  //Parsers
  crypttext2 = CryptoJS.enc.Utf8.parse(crypttext);
  iv2 = CryptoJS.enc.Utf8.parse(iv);
  key = CryptoJS.enc.Utf8.parse(master_key);

  // Decrypt
  let plaintextArray = CryptoJS.AES.decrypt({ ciphertext: crypttext2 }, key, {
    iv: iv2,
    mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });

  // Can be Utf8 too
  output_plaintext = CryptoJS.enc.Utf8.stringify(plaintextArray);
  console.log(output_plaintext);
  return output_plaintext;
}

onmessage = function (e) {
  // https://stackoverflow.com/questions/30990129/encrypt-in-python-decrypt-in-javascript
  // https://steemit.com/missing/@tkgcci/aes-valueerror-input-strings-must-be-multiple-of-16-in-length
  // https://cryptojs.gitbook.io/docs/#encoders

  let results = [];
  e.data.forEach((element) => {
    let text = decrypt(element.cipher);
    results.push({ text: text, id: element.id, type: element.type, domid: element.domid });
  });
  postMessage(results);
  this.close();
};

// var generateWorkerURL = function () {
//   var blob = new Blob(['(' + inlineWorkerF.toString() + ')()'], { type: 'text/javacript' });
//   return URL.createObjectURL(blob);
// };

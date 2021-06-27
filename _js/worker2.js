importScripts('crypto-js.js');

onmessage = function (e) {
  // https://stackoverflow.com/questions/30990129/encrypt-in-python-decrypt-in-javascript
  // https://steemit.com/missing/@tkgcci/aes-valueerror-input-strings-must-be-multiple-of-16-in-length
  // https://cryptojs.gitbook.io/docs/#encoders
  const data = e.data;
  let decrypted = [];
  // master_key = 'xyj6SfUumTamFXOS'; //16
  master_key = 'M48sXt5HTWpLhHpa_4j2_cF2kNJ6A6Lj'; //32
  data.forEach((el) => {
    // Decode the base64 data so we can separate iv and crypt text.
    let rawData = atob(el.file);
    // Split by 16 because my IV size
    let iv = rawData.substring(0, 16);
    let crypttext = rawData.substring(16);

    //Parsers
    crypttext = CryptoJS.enc.Latin1.parse(crypttext);
    iv = CryptoJS.enc.Latin1.parse(iv);
    key = CryptoJS.enc.Utf8.parse(master_key);

    // Decrypt
    let plaintextArray = CryptoJS.AES.decrypt({ ciphertext: crypttext }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Can be Utf8 too
    output_plaintext = CryptoJS.enc.Latin1.stringify(plaintextArray);
    decrypted.push({ id: el.id, file: output_plaintext });
  });

  postMessage(decrypted);
};

// var generateWorkerURL = function () {
//   var blob = new Blob(['(' + inlineWorkerF.toString() + ')()'], { type: 'text/javacript' });
//   return URL.createObjectURL(blob);
// };

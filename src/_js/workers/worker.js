import CryptoJS from 'crypto-js';

function decrypt(data) {
  const master_key = 'M48sXt5HTWpLhHpa_4j2_cF2kNJ6A6Lj'; //32

  const rawData = atob(data);
  const iv = rawData.substring(0, 16);
  const crypttext = rawData.substring(16);

  // https://stackoverflow.com/questions/30990129/encrypt-in-python-decrypt-in-javascript
  // const crypttext = CryptoJS.enc.Base64.parse(data);
  // const iv = crypttext.clone();
  // iv.sigBytes = 16;
  // iv.clamp();
  // crypttext.words.splice(0, 4); // delete 4 words = 16 bytes
  // crypttext.sigBytes -= 16;

  //Parsers
  const crypttext2 = CryptoJS.enc.Latin1.parse(crypttext);
  const iv2 = CryptoJS.enc.Latin1.parse(iv);
  const key = CryptoJS.enc.Latin1.parse(master_key);

  // Decrypt
  const plaintextArray = CryptoJS.AES.decrypt({ ciphertext: crypttext2 }, key, {
    iv: iv2,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Can be Utf8 too
  const decrypt_plaintext = CryptoJS.enc.Latin1.stringify(plaintextArray);
  const output_plaintext = decrypt_plaintext.replace(/\x0F|\x0E|\x01|\x02|\x03|\x04|\x05|\x06|\x06|\x07|\x08/g, '');
  return output_plaintext.trim();
}

onmessage = (e) => {
  if (Array.isArray(e.data)) {
    let results = [];
    e.data.forEach((element) => {
      let text = decrypt(element.cipher);
      results.push({ text: text, id: element.id, type: element.type });
    });
    postMessage(results);
    close();
  }
};

// var generateWorkerURL = function () {
//   var blob = new Blob(['(' + inlineWorkerF.toString() + ')()'], { type: 'text/javacript' });
//   return URL.createObjectURL(blob);
// };

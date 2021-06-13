onmessage = function (e) {
  var secretkey = 'rM64VWFGUg2gMO3J03ssyzszs7Nj57Jrcg4nX-3wlL0=';
  var decryptedBytes = CryptoJS.AES.decrypt(e.data.file, secretkey);
  var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  postMessage(decryptedMessage);
};

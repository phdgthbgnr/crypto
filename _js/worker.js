var inlineWorkerF = function () {
  self.onmessage = function (e) {
    console.log(e.data);
  };
};
var generateWorkerURL = function () {
  var blob = new Blob(['(' + inlineWorkerF.toString() + ')()'], { type: 'text/javacript' });
  return URL.createObjectURL(blob);
};

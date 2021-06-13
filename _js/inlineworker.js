'use strict';
// WORKER for hit test

export default class Workers {
  constructor() {
    var URL = window.URL || window.webkitURL;
    window.URL = URL;
    // WORKER FRUITS
    this.inlineWorkerF = function () {
      // self.onmessage = function (e) {
      //   var p = e;
      //   var j = p.data.polyVerts.length - 1,
      //     oddNodes = false,
      //     polyY = [],
      //     polyX = [],
      //     x = p.data.point.x,
      //     y = p.data.point.y;
      //   for (var s = 0; s < p.data.polyVerts.length; s++) {
      //     polyX.push(p.data.polyVerts[s][0]);
      //     polyY.push(p.data.polyVerts[s][1]);
      //   }
      //   for (var i = 0; i < p.data.polyVerts.length; i++) {
      //     if (((polyY[i] < y && polyY[j] >= y) || (polyY[j] < y && polyY[i] >= y)) && (polyX[i] <= x || polyX[j] <= x)) {
      //       oddNodes ^= polyX[i] + ((y - polyY[i]) / (polyY[j] - polyY[i])) * (polyX[j] - polyX[i]) < x;
      //     }
      //     j = i;
      //   }
      //   // if (oddNodes) console.log(p.data.point);
      //   if (oddNodes) {
      //     self.postMessage({ hit: oddNodes, elem: p.data.domElem, points: p.data.point, verts: p.data.polyVerts, obj: p.data.obj });
      //     this.close();
      //   }
      // };
    };
    // WORKER BOMB
    this.inlineWorkerB = function () {
      self.onmessage = function (e) {
        var p = e;
        var j = p.data.polyVerts.length - 1,
          oddNodes = false,
          polyY = [],
          polyX = [],
          x = p.data.point.x,
          y = p.data.point.y;

        for (var s = 0; s < p.data.polyVerts.length; s++) {
          polyX.push(p.data.polyVerts[s][0]);
          polyY.push(p.data.polyVerts[s][1]);
        }
        for (var i = 0; i < p.data.polyVerts.length; i++) {
          if (((polyY[i] < y && polyY[j] >= y) || (polyY[j] < y && polyY[i] >= y)) && (polyX[i] <= x || polyX[j] <= x)) {
            oddNodes ^= polyX[i] + ((y - polyY[i]) / (polyY[j] - polyY[i])) * (polyX[j] - polyX[i]) < x;
          }
          j = i;
        }
        // if (oddNodes) console.log(p.data.point);
        if (oddNodes) {
          self.postMessage({ hit: oddNodes, elem: p.data.domElem, points: p.data.point, verts: p.data.polyVerts, particules: p.data.particules });
          this.close();
        }
      };
    };
  }
  generateWorkerFURL() {
    var blob = new Blob(['(' + this.inlineWorkerF.toString() + ')()'], { type: 'text/javacript' });
    return URL.createObjectURL(blob);
  }
  generateWorkerBURL() {
    var blob = new Blob(['(' + this.inlineWorkerB.toString() + ')()'], { type: 'text/javacript' });
    return URL.createObjectURL(blob);
  }
}

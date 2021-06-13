
    (function(){
      console.log('closure');
      var _i = 0;
      var deferjs1 = [
           '_css/style.css',
           '_js/manageEvents15.js',
           '_js/manageEventsAnimation10.js',
           '_js/q2.js',
           '_js/manageEventsPromises12.js',
           '_js/fuse-6.4.3.js',
           '_js/app01.js'
          //  '_js/animate-css-grid.js',
      ],
      initAfter = function(){
          //fire event start
          console.log('initafter');
          var event = new CustomEvent("startLogic", {
              detail: { loaded: true , payload:'_json/results.json'}
          });
          window.dispatchEvent(event);
      },
      downloadJSCSSAtOnload = function(arr, callback) {
          // charge JS et CSS
          var t = arr.length-1;
          if (arr[_i].match('^(.*\.js)$')){
          var element = document.createElement('script');
              element.setAttribute('type','text/javascript');
              element.setAttribute('src',arr[_i]);
              if (element.addEventListener != undefined){
                  element.addEventListener('load',function(e){
                      _i++;
                      if(_i <= t) downloadJSCSSAtOnload(arr, callback);
                      if(_i > t) {
                          callback();
                      }
                  });
              }else if (element.readyState){ // IE8
                  element.onreadystatechange = function(){
                      if(element.readyState == 'loaded' || element.readyState == 'complete') {
                          _i++;
                      if(_i <= t) downloadJSCSSAtOnload(arr, callback);
                          if(_i > t) {
                              callback();
                          }
                      }
                  }
              }else{
                  //
              }
              if(_i <= t) document.body.appendChild(element);
          };
          // chargement CSS
          if (arr[_i].match('^(.*\.css)$')){
              // loadStylesheet(deferjs[i]);
              if (document.createStyleSheet){
                  document.createStyleSheet(arr[_i]);
              }else {
                  var stylesheet = document.createElement('link');
                  stylesheet.href = arr[_i];
                  stylesheet.rel = 'stylesheet';
                  stylesheet.type = 'text/css';
                  document.getElementsByTagName('head')[0].appendChild(stylesheet);
              }
              _i++;
              if(_i <= t) downloadJSCSSAtOnload(arr, callback);
              //if(i > t) window.myConsole('CSS chargées');
          }
      };

      window.addEventListener("DOMContentLoaded", (event) => {
          downloadJSCSSAtOnload(deferjs1, initAfter);
      });

  })();
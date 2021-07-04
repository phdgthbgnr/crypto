!(function (m, fz) {
  //
  const _m = m;
  let total = 0;
  let index = 0;
  const Fz = fz;
  const has = Object.prototype.hasOwnProperty;
  // const _fz = fz;
  const imgfolder = 'images_omdb/';
  let _base = []; // objet JSON des élements
  let results = []; // resultats recherche
  let _basenameDecryt = [];
  const videoPlayer = _m.$dc('videoPlayer');
  // const videoContainer = _m.$dc('videocontainer');
  const videoSource = videoPlayer.getElementsByTagName('source')[0];
  const videosRoot = 'http://raspberrypi/films/';
  // const videosRoot = 'http://openmediavault/films/';
  const local = window.location.hostname;
  const domain = local == '127.0.0.1' ? 'http://smeserver9/basefilm/' : '';
  const nblocks = 20;
  const videoStatus = {
    title: '',
    timeRounded: 0,
    url: '',
    idvideo: 0,
    indexdb: 0,
    time: 0,
  };
  let curRequest = 0;

  // fuze options par defaut de la recherche par title / tempname
  var fuseDefaultOptions = {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 200,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title', 'tempname'],
  };
  var fuseOptions = fuseDefaultOptions;

  window.addEventListener('startLogic', (e) => {
    loadJSON(e.detail.payload);
  });

  const getFromLocalStorage = () => {
    var ls = localStorage.getItem('videoStatus');
    // if (ls) videoStatus = { ...videoStatus, ...JSON.parse(ls) };
    // if (ls) {
    //   _m.addAclass('resume', 'toresume');
    //   Object.assign(videoStatus, JSON.parse(ls));
    // }
  };

  videoPlayer.addEventListener(
    'timeupdate',
    (e) => {
      var cur = e.currentTarget.currentTime;
      var fcur = Math.floor(cur);
      // record every sec
      if (fcur != videoStatus.timeRounded) {
        videoStatus.saving = true;
        videoStatus.timeRounded = fcur;
        videoStatus.time = cur;
        localStorage.setItem('videoStatus', JSON.stringify(videoStatus));
      }
      // save current progression every 30 sec
      if (fcur > curRequest && fcur % 30 == 0) {
        curRequest = fcur;
        let datas = JSON.stringify({ progress: fcur, id: videoStatus.indexdb, index: videoStatus.idvideo });
        _m.promises
          .httpRequest(domain + '_inc/progress.php', 'POST', datas, 9000, 'application/json;charset=UTF-8', null, null)
          .then(function (e) {
            let r = JSON.parse(e);
            if (r.percent === parseFloat(r.percent) && r.status == 1) {
              let percent = r.percent / 100;
              document.getElementById('progress' + r.index).style.transform = 'scaleX(' + percent + ')';
              document.getElementById('thumb' + r.index).getElementsByTagName('a')[0].dataset.elapsed = r.progress;
            }
          })
          .fail(function (error) {
            if (error) console('erreur');
          })
          .progress(function (progress) {
            console.log(progress);
          })
          .fin(function () {
            // console.log('fin');
            // init_thumb(_base);
            // init_navigation();
            // finally don't work on ie8 (ES5)
          });
      }
    },
    false
  );

  const loadJSON = (j) => {
    let datas = '';
    _m.promises
      .httpRequest(j, 'GET', datas, 9000, null, null)
      .then(function (e) {
        let resjson = JSON.parse(e);
        _base = Object.freeze(resjson.data);
      })
      .fail(function (error) {
        if (error) console('erreur');
      })
      .progress(function (progress) {
        console.log(progress);
      })
      .fin(function () {
        // console.log('fin');
        init_thumb(_base);
        init_navigation();
        // finally don't work on ie8 (ES5)
      });
  };

  const navigate = (e, t, c) => {
    let id = e.currentTarget.getAttribute('id');
    console.log(id);
    total = results.length > 0 ? results.length : _base.length;
    if (total < nblocks) return false;

    switch (id) {
      case 'previous':
        index -= nblocks;
        break;
      case 'next':
        index += nblocks;
        break;
      case 'deb':
        index = 0;
        break;
      case 'fin':
        index = total - nblocks;
        break;
    }

    if (index < 0) index = 0;
    if (index > total - nblocks) index = total - nblocks;
    if (results.length == 0) init_thumb(_base);
    if (results.length > 0) init_thumb(results);
  };

  const videoLink = (e, t, c) => {
    videoSource.setAttribute('src', videosRoot + e.currentTarget.dataset.videofile);
    videoPlayer.load();
    let indexdb = e.currentTarget.dataset.dbindex;
    let url = e.currentTarget.dataset.videofile;
    let idvideo = e.currentTarget.dataset.thumb;
    let title = _base[idvideo].title;
    videoStatus.title = title;
    videoStatus.url = url;
    videoStatus.idvideo = idvideo;
    videoStatus.indexdb = indexdb;
    videoStatus.time = 0;
    videoStatus.timeRounded = 0;
    curRequest = 0;
    _m.removeAclass('videocontainer', 'videoclose');
    // set dates last view
    updateDateView(indexdb);
  };

  const clear_Thumb = () => {
    for (let i = 0; i < nblocks; i++) {
      let chldrn = contener.children[i];
      chldrn.getElementsByTagName('img')[0].setAttribute('src', 'blank.png');
      chldrn.getElementsByClassName('title')[0].innerHTML = '';
      chldrn.getElementsByClassName('year')[0].innerHTML = '';
      chldrn.getElementsByClassName('filename')[0].innerHTML = '';
      chldrn.getElementsByClassName('type')[0].innerHTML = '';
      chldrn.getElementsByClassName('filmid')[0].innerHTML = '';
      chldrn.getElementsByClassName('video-link')[0].dataset.videofile = '';
    }
  };

  const decryptFromWorker = (e) => {
    e.data.forEach((element) => {
      if (element.type == 'image') {
        _m.$dc('image' + element.domid).remove();
        let img = new Image();
        img.addEventListener(
          'load',
          (e) => {
            img.setAttribute('id', 'image' + element.domid);
            _m.$dc('thumb' + element.domid).prepend(img);
            setTimeout(function () {
              img.className = 'image';
            }, 30);
          },
          { once: true }
        );
        img.src = 'data:image/jpeg;charset=latin1;base64, ' + element.text;
      }
      if (element.type == 'filename') {
        _m.$dc('title' + element.domid).innerHTML = element.text;
      }
    });
  };

  const init_thumb = (b) => {
    console.log('init thumb');
    let ii = b.length > nblocks ? nblocks : b.length;
    for (let i = 0; i < ii; i++) {
      const worker = new Worker('_js/worker.js');
      worker.onmessage = decryptFromWorker;
      worker.postMessage([
        { cipher: b[index + i].file, type: 'filename', id: b[i].id, domid: i + 1 },
        { cipher: b[index + i].image, type: 'image', id: b[i].id, domid: i + 1 },
        { cipher: b[index + i].path, type: 'path', id: b[i].id, domid: i + 1 },
      ]);
    }
    // const worker2 = new Worker('_js/worker2.js');
    // worker2.onmessage = decryptNames;
    // worker2.postMessage(b);
  };

  const searchInJson = (e, t, c) => {
    let term = _m.$dc('search').value;
    let fuse = new Fz(_base, fuseOptions);
    clear_Thumb();
    if (term == '') {
      results = [];
      init_thumb(_base);
      return false;
    }
    results = fuse.search(term);
    if (results.length > 0) {
      index = 0;
      init_thumb(results);
    }
  };

  const resumeVideo = (e, t, c) => {
    // get last video
    _m.removeAclass('videocontainer', 'videoclose');
    if (videoSource.getAttribute('src') == '') {
      videoSource.setAttribute('src', videosRoot + videoStatus.url);
      videoPlayer.currentTime = videoStatus.time;
      videoPlayer.load();
    } else {
      videoPlayer.play();
    }
    // set date last view
    updateDateView(videoStatus.indexdb);
    return false;
  };

  const updateDateView = (id) => {
    let datas = JSON.stringify({ id: id });
    _m.promises
      .httpRequest(domain + '_inc/lastview.php', 'POST', datas, 9000, 'application/json;charset=UTF-8', null, null)
      .then(function (e) {
        let r = JSON.parse(e);
        console.log('update date ', r.message);
      })
      .fail(function (error) {
        if (error) console('erreur');
      })
      .progress(function (progress) {
        // console.log(progress);
      })
      .fin(function () {
        // console.log('fin');
        // init_thumb(_base);
        // init_navigation();
        // finally don't work on ie8 (ES5)
      });
  };

  const init_navigation = () => {
    // init fuse
    getFromLocalStorage();
    _m.listenClass('nav', 'click', navigate, true);
    _m.listenClass('video-link', 'click', videoLink, true);
    // _m.listenerAdd('sbmt', 'click', searchInJson, true);
    // _m.listenClass('terms', 'change', searchTerms, true);
    // _m.listenerAdd('resume', 'click', resumeVideo, true);
    _m.listenerAdd(
      'videocontainer',
      'click',
      (e) => {
        if (e.target.id == 'videoPlayer') return false;
        e.stopPropagation();
        _m.addAclass(e.currentTarget.id, 'videoclose');
        videoPlayer.pause();
        return false;
      },
      true
    );
  };
})(manageEvents, Fuse);

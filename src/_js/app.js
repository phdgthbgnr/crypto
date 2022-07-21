'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import '../_css/style.scss';

Alpine.data('Posts', Posts);

Alpine.start();

const decryptFromWorker = (e) => {
  let file = null;
  let path = null;
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
      file = element.text;
      _m.$dc('title' + element.domid).innerHTML = file;
      _m.$dc('ids' + element.domid).innerHTML = element.id;
    }
    if (element.type == 'path') {
      path = element.text + '/';
    }
    if (path && file) _m.$dc('linkfile' + element.domid).dataset.file = path + file;
  });
};

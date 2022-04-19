'use strict';
import Alpine from 'alpinejs';
import test from './com/test';
import '../_css/style.scss';

// const posts = [
//   { title: 'title 1' },
//   { title: 'title 2' },
//   { title: 'title 3' },
//   { title: 'title 4' },
//   { title: 'title 5' },
//   { title: 'title 6' },
// ];

console.log(test);

Alpine.data('posts', test);

// Alpine.magic('json', () => {
//   return posts;
// });

Alpine.start();

'use strict';
import Alpine from 'alpinejs';
import Posts from './com/posts';
import '../_css/style.scss';

// const posts = [
//   { title: 'title 1' },
//   { title: 'title 2' },
//   { title: 'title 3' },
//   { title: 'title 4' },
//   { title: 'title 5' },
//   { title: 'title 6' },
// ];

console.log(Posts());

Alpine.data('Posts', Posts);

// Alpine.magic('json', () => {
//   return posts;
// });

Alpine.start();

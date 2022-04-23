'use strict';
import Alpine from 'alpinejs';
import posts from './com/test';
import '../_css/style.scss';

// const posts = [
//   { title: 'title 1' },
//   { title: 'title 2' },
//   { title: 'title 3' },
//   { title: 'title 4' },
//   { title: 'title 5' },
//   { title: 'title 6' },
// ];

console.log(posts);

Alpine.data('posts', posts);

// Alpine.magic('json', () => {
//   return posts;
// });

Alpine.start();

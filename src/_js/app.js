'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import '../_css/style.scss';

Alpine.data('Posts', Posts);
// Alpine.data('getPosts', getPosts);

// Alpine.magic('json', () => {
//   console.log(Posts);
//   return Posts;
// });

Alpine.start();

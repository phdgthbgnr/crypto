'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import '../_css/style.scss';

Alpine.data('Posts', Posts);

console.log(Posts());

Alpine.start();

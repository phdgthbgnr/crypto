'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import { getPosts } from './com/getPosts';
import '../_css/style.scss';

Alpine.data('Posts', Posts);

Alpine.start();

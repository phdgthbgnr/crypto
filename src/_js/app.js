'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import playVideo from './com/loadVideo';
import '../_css/style.scss';

// get posts from DB
Alpine.data('Posts', Posts);

// playVideo
Alpine.data('loadVideo', playVideo);

Alpine.start();

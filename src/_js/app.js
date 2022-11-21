'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import playVideo from './com/loadVideo';
import initVideo from './com/initVideo';
import '../_css/style.scss';

// get posts from DB
Alpine.data('Posts', Posts);

// playVideo
Alpine.data('loadVideo', playVideo);

// iinit & load video
Alpine.data('initVideo', initVideo);

Alpine.start();

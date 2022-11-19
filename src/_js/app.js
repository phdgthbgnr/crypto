'use strict';
import Alpine from 'alpinejs';
import { Posts } from './com/posts';
import playVideo from './com/playVideo';
import '../_css/style.scss';

const videosRoot = 'http://192.168.1.11/films/';

// get posts from DB
Alpine.data('Posts', Posts);

// playVideo
Alpine.data('playVideo', playVideo);

Alpine.start();

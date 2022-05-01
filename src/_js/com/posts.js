// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
'use strict';
import axios from 'axios';

const getPosts = () => {
  return {
    getPosts: async () => {
      const res = await axios({
        url: 'http://localhost:8081',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data.payload;
    },
  };
};

const Posts = () => {
  return {
    Posts: () => [
      { id: 1, filename: 'toto1' },
      { id: 2, filename: 'toto2' },
    ],
  };
};

export { Posts, getPosts };

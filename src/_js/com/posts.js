// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
'use strict';
import axios from 'axios';

const Posts = () => ({
  // return {
  data: [],
  Posts() {
    return this.data;
  },
  init() {
    axios({
      url: 'http://localhost:8081',
      method: 'get',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => (this.data = res.data.payload));
  },
});

export { Posts };

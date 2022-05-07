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
    const req = async () => {
      const res = await axios({
        url: 'http://localhost:8081',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.data = res.data.payload;
    };
    req();
  },
});

export { Posts };

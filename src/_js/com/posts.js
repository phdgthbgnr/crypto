// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
// https://codewithhugo.com/alpinejs-x-for-with-objects/

'use strict';
import axios from 'axios';

const Posts = () => ({
  datas: {},

  index: 0,

  previous() {
    console.log('previous');
  },

  next() {
    console.log('next');
  },

  init() {
    const req = async (i) => {
      try {
        const res = await axios({
          url: 'http://localhost:8081',
          method: 'post',
          data: {
            index: i,
          },
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.datas = res.data;
      } catch (e) {
        // failure
      }
    };

    req(this.index);

    this.$watch('index', (value) => req(value));
  },
});

export { Posts };

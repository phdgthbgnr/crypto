// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
// https://codewithhugo.com/alpinejs-x-for-with-objects/

'use strict';
import axios from 'axios';

const Posts = () => ({
  datas: {},

  init() {
    const req = async () => {
      try {
        const res = await axios({
          url: 'http://localhost:8081',
          method: 'get',
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

    req();

    // this.$watch('data', (value) => console.log(value));
  },
});

export { Posts };

// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
// https://codewithhugo.com/alpinejs-x-for-with-objects/

'use strict';
import axios from 'axios';

const Posts = () => ({
  datas: {},
  requestDone: true,
  index: 0,
  numPosts: 5, // number of posts to get from db

  previous() {
    if (this.requestDone) this.index = this.index-- < 0 ? 0 : this.index--;
  },

  next() {
    if (this.requestDone) this.index = this.index++ > 10 ? 10 : this.index++;
  },

  init() {
    const req = async (i) => {
      this.requestDone = false;
      try {
        const res = await axios({
          url: 'http://localhost:8081',
          method: 'post',
          data: {
            index: i,
            nomposts: this.numPosts,
          },
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.datas = res.data;
      } catch (e) {
        // failure
      } finally {
        this.requestDone = true;
      }
    };

    req(this.index);

    this.$watch('index', (value) => req(value));
  },
});

export { Posts };

// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
// https://www.alpinetoolbox.com/
// https://codepen.io/eddieebeling/pen/dyoZOBX
// https://codewithhugo.com/alpinejs-x-for-with-objects/

'use strict';
import axios from 'axios';
import { decryptFromWorker } from './decryptFromWorker';

const Posts = () => ({
  datas: {},
  requestDone: true,
  index: 0,
  numPosts: '16', // number of posts to get from db

  previous() {
    if (this.requestDone) this.index = this.index-- < 0 ? 0 : this.index--;
  },

  next() {
    if (this.requestDone) this.index = this.index++ > 10 ? 10 : this.index++;
  },

  init() {
    // fetch datas
    const req = async (i) => {
      this.requestDone = false;
      try {
        const res = await axios({
          url: 'http://localhost:8081',
          method: 'post',
          data: {
            index: i,
            numPosts: this.numPosts,
          },
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(res.data.payload);
        decryptFromWorker(res.data.payload);
      } catch (e) {
        // failure
      } finally {
        this.requestDone = true;
      }
    };

    req(this.index);

    // watch index
    this.$watch('index', (value) => req(value));
  },
});

export { Posts };

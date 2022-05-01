// export default () => ({
//   Posts() {
//     return async () => {
//       try {
//         let res = await axios({
//           url: 'hhttp://localhost:8081',
//           method: 'get',
//           timeout: 8000,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (res.status == 200) {
//           // test for status you want, etc
//           console.log(res.status);
//         }
//         // Don't forget to return something
//         console.log(res);
//         return res.data;
//       } catch (err) {
//         console.error(err);
//       }
//     };
//   },
// });
// https://postsrc.com/posts/how-to-make-ajax-request-in-alpine-js
'use strict';
import axios from 'axios';

// export default () => ({
//   Posts() {
//     return [
//       { id: 1, filename: 'toto1' },
//       { id: 2, filename: 'toto2' },
//     ];
//   },
// });

export default () => ({
  async Posts() {
    const response = await axios({
      url: 'http://localhost:8081',
      method: 'get',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.table(response.data.payload);
    return response.data.payload;
  },
});

// axios
//   .get('http://localhost:8081')
//   .then(function (response) {
//     // handle success
//     // console.table(response.data.payload);
//     return response.data.payload;
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

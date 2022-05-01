export default () => ({
  Posts() {
    return [
      { title: 'title 1' },
      { title: 'title 2' },
      { title: 'title 3' },
      { title: 'title 4' },
      { title: 'title 5' },
      { title: 'title 6' },
    ];
  },
});

// let t = async function () {
//   try {
//     const resp = await axios.get('http://localhost:8081');
//     console.error(resp.data);
//     return resp.data;
//   } catch (err) {
//     // Handle Error Here
//     console.error(err);
//   }
// };
// return t;
//},

// Posts() {
// return async () => {
//   try {
//     let res = await axios({
//       url: 'hhttp://localhost:8081',
//       method: 'get',
//       timeout: 8000,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (res.status == 200) {
//       // test for status you want, etc
//       console.log(res.status);
//     }
//     // Don't forget to return something
//     return res.data;
//   } catch (err) {
//     console.error(err);
//   }
// };
// },
//}

/**
 * https://zellwk.com/blog/async-await-in-loops/
 */

const decryptFromWorker = async (datas) => {
  let promises = [];
  datas.forEach(async (e) => {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker('worker.js', { type: 'module' });
      worker.onmessage = (el) => {
        let tempData = {};
        el.data.forEach((d) => {
          // console.log(d);
          switch (d.type) {
            case 'imagedata':
              tempData[d.type] = 'data:image/jpeg;charset=latin1;base64, ' + d.text;
              break;
            default:
              tempData[d.type] = d.text;
          }
          tempData['id'] = d.id;
        });
        resolve(tempData);
      };
      worker.postMessage([
        { cipher: e.filename, type: 'filename', id: e.id },
        { cipher: e.imagedata, type: 'imagedata', id: e.id },
        { cipher: e.path, type: 'path', id: e.id },
      ]);
    });
    promises.push(promise);
  });

  return Promise.all(promises);
  // return result;
};

export { decryptFromWorker };

// const decryptFromWorker = async (datas) => {
//   const promises = new Promise((resolve, reject) => {
//     let result = [];
//     datas.forEach(async (e) => {
//       const worker = new Worker('worker.js', { type: 'module' });
//       worker.onmessage = (el) => {
//         let tempData = {};
//         el.data.forEach(async (d) => {
//           // console.log(d);
//           tempData[d.type] = d.text;
//           tempData['id'] = d.id;
//         });
//         result.push(tempData);
//       };
//       worker.postMessage([
//         { cipher: e.filename, type: 'filename', id: e.id },
//         { cipher: e.imagedata, type: 'image', id: e.id },
//         { cipher: e.path, type: 'path', id: e.id },
//       ]);
//     });
//     resolve(result, 0);
//   });

//   return promises;
//   // return result;
// };

// export { decryptFromWorker };

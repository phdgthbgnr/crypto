async function decryptFromWorker(datas) {
  let result = [];
  await datas.forEach((e) => {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker('worker.js', { type: 'module' });
      worker.onmessage = (el) => {
        let tempData = {};
        el.data.forEach((d) => {
          // console.log(d);
          tempData[d.type] = d.text;
          tempData['id'] = d.id;
        });
        resolve(tempData, 0);
      };
      worker.postMessage([
        { cipher: e.filename, type: 'filename', id: e.id },
        { cipher: e.imagedata, type: 'image', id: e.id },
        { cipher: e.path, type: 'path', id: e.id },
      ]);
    });
    promise.then((e) => result.push(e));
  });
  return result;
}

export { decryptFromWorker };

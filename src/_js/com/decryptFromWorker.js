const decryptFromWorker = (datas) => {
  let result = [];
  datas.forEach((e) => {
    const worker = new Worker('worker.js', { type: 'module' });
    worker.onmessage = (el) => {
      console.log('from worker ', el.data);
    };
    worker.postMessage([
      { cipher: e.filename, type: 'filename', id: e.id },
      { cipher: e.imagedata, type: 'image', id: e.id },
      { cipher: e.path, type: 'path', id: e.id },
    ]);
  });
  return result;
};

export { decryptFromWorker };

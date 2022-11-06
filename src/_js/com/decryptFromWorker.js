const decryptFromWorker = (element) => {
  console.log(element);
  const worker = new Worker('worker.js', { type: 'module' });
  // worker.onmessage = getDecrypt();
  worker.postMessage([
    { cipher: element.filename, type: 'filename', id: element.id },
    { cipher: element.imagedata, type: 'image', id: element.id },
    { cipher: element.path, type: 'path', id: element.id },
  ]);
};

export { decryptFromWorker };

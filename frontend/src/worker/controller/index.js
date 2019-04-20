import Worker from '../worker/worker.js';

const worker = new Worker();
worker.addEventListener('message', event => console.log(event));

export default {
  compile(code) {
    worker.postMessage({ cmd: 'compile', code });
  },
};


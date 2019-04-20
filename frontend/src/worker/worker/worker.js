import GasTester from '../../../../gas-tester';
self.window = self;

self.importScripts('https://solc-bin.ethereum.org/bin/soljson-v0.4.25+commit.59dbf8f1.js');

const tester = new GasTester(self.Module);

const commands = {
  compile({ code }) {
    const result =  tester.compile(code);
    console.log(result);
  }
}


self.addEventListener('message', ({ data }) => {
  const { cmd, ..._data } = data;
  if (commands[cmd]) {
    commands[cmd](_data);
  } else {
    console.error('Unknown command', data);
  }
});


import GasTester from '../../../../gas-tester';
self.window = self;

self.importScripts('https://solc-bin.ethereum.org/bin/soljson-v0.4.25+commit.59dbf8f1.js');

const tester = new GasTester(self.Module);

self.addEventListener('message', event => {
  console.log(event);
});


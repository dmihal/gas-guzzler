import { TestContract, TestRunner } from '../../../../gas-tester';
self.window = self;

self.importScripts('https://solc-bin.ethereum.org/bin/soljson-v0.4.25+commit.59dbf8f1.js');

const tester = new TestRunner(self.Module);

const commands = {
  async compile({ code }) {
    const contract = new TestContract([code]);

    const result = tester.compile(contract.toSolidity(0));
    console.log(result);

    if (result.status === 'success') {
      const testResult = await tester.runTest(result.bytecode);
      console.log(testResult);
    }
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


const wrapper = require('solc/wrapper');

const getInput = content => JSON.stringify({
  language: 'Solidity',
  sources: {
    'test.sol': { content },
  },
  settings: {
    optimizer: {
      enabled: false,
      runs: 200
    },
    outputSelection: {
      '*': {
        '': [ 'legacyAST' ],
        '*': [ 'abi', 'metadata', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates' ]
      }
    }
  }
})


class GasTester {
  constructor(solcModule) {
    this.solc = wrapper(solcModule);
  }

  compile(code) {
    let bytecode = null;
    let status = 'failed';
    const handleMissingInput = () => null;
    const compilationResult = JSON.parse(this.solc.compileStandardWrapper(getInput(code), handleMissingInput));

    const errors = compilationResult.errors.filter(err => err.severity === 'error');
    const warnings = compilationResult.errors.filter(err => err.severity === 'warning');

    if (compilationResult.contracts['test.sol']) {
      status = 'success';
      bytecode = compilationResult.contracts['test.sol'].TestContract.evm.bytecode.object;
    }
    return { status, bytecode, errors, warnings };
  }
}

module.exports = GasTester;
module.exports.default = GasTester;

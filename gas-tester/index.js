const wrapper = require('solc/wrapper');

class GasTester {
  constructor(solcModule) {
    this.solc = wrapper(solcModule);
  }

  compile(code) {
    
  }
}

module.exports = GasTester;
module.exports.default = GasTester;

class TestContract {
  constructor(segments) {
    this.segments = segments;
  }

  toSolidity(segmentToRun) {
    const segmentFunctions = this.segments
      .map((code, segNum) => `function segment${segNum}() public {\n${code}\n}`)
      .join("\n\n");

    const testFn = segmentToRun === 'control' ? 'control' : `segment${segmentToRun}`;

    return `pragma solidity ^0.4.25;

contract TestContract {
    constructor() public {
        ${testFn}();
    }

    function control() public {}

    ${segmentFunctions}
}
`;
  }
}
module.exports = TestContract;

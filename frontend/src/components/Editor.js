import React, { Component } from 'react';
import 'brace';
import 'brace/theme/monokai';
import 'ace-mode-solidity/build/legacy/v1.2.9/src-brace/mode-solidity';
import AceEditor from 'react-ace';

const SOLIDITY_TEMPLATE = `pragma solidity ^0.4.25;

contract TestContract {
    // Write your test code in this function:
    function main() public {
        // Your code here
    }
}
`

class Editor extends Component {
  state = {
    code: SOLIDITY_TEMPLATE,
  };

  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }

  componentDidMount() {
    const { editor } = this.editor.current;
    editor.commands.on("exec", (e) => {
      if (e.command.readOnly) {
        return;
      }
      const topRow = 5;
      const bottomRow = editor.session.getLength() - 3;
      const deletesLeft = e.command.name === "backspace" || e.command.name === "removewordleft";
      const notEditable = editor.selection.getAllRanges().some((r) => {
        if (deletesLeft && r.start.column === 0 && r.end.column === 0) {
          return true;
        }
        return r.start.row < topRow || r.end.row >= bottomRow;
      });
      if (notEditable) {
        e.preventDefault();
      }
    });
  }

  render() {
    return (
      <AceEditor
        mode="solidity"
        theme="monokai"
        name="editor_div"
        value={this.state.code}
        editorProps={{$blockScrolling: true}}
        onChange={code => {
          this.setState({ code });
          const codeSegment = code.split("\n").slice(5,-3).join("\n");
          this.props.onChange(codeSegment);
        }}
        ref={this.editor}
      />
    );
  }
}

Editor.defaultProps = {
  onChange: () => null,
};

export default Editor;

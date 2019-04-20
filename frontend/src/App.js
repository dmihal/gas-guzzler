import React, { Component } from 'react';
import Editor from './components/Editor';
import WorkerController from './worker';
import './App.css';

class App extends Component {
  state = {
    code: '',
  };


  compile() {
    WorkerController.compile(this.state.code);
  }

  render() {
    return (
      <div className="App">
        <Editor onChange={code => this.setState({ code })} />
        <button onClick={() => this.compile()}>Compile & Run</button>
      </div>
    );
  }
}

export default App;

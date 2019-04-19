import React, { Component } from 'react';
import Editor from './components/Editor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Editor />
        <button>Compile & Run</button>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from './components/Form';
import TopUrls from './components/TopUrls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <TopUrls />
      </div>
    );
  }
}

export default App;

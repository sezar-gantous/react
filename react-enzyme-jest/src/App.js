import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ul>
          <li>Test 1</li>
          <li>Test 2</li>
          <li>Test 3</li>
        </ul>
        <p className="App-intro">Hello World</p>
      </div>
    );
  }
}

export class Link extends Component {
  render() {
    return <a href={this.props.address}>Click</a>;
  }
}

export default App;

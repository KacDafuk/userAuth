import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  console.log("deploy is working");
  useEffect(() => {
    async function connect() {
      console.log("connection started new");
      let resp = await fetch("https://protected-dawn-82633.herokuapp.com/test");
      let { respData } = await resp.json();
      console.log("finished");
      console.log(respData);
    }
    connect();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

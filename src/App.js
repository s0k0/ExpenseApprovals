import React from 'react';
import './App.css';
import ApprovalSchema from './component/ApprovalSchema'
import logo from './spendesk-logo.png'


function App() {
  return (
    <div className="app">
      <header className="app-header"><img src={logo} className="app-logo" alt="logo" /></header>
      <h1 className="app-greeting">Welcome to Spendesk</h1>
      <ApprovalSchema />
    </div>
  );
}

export default App;

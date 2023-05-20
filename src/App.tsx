import React from 'react';
import Editor from './components/pages/Editor';
import './boostrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Editor />
      </div>
    </BrowserRouter>
  );
}

export default App;

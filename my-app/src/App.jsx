import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import './';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';

const App = () => (
  <div>
    {/* eslint-disable-next-line react/no-unknown-property */}
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  </div>
);
export default App;
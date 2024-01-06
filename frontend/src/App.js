import React, { useCallback, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import {NotFound} from "./components/NotFound";
import Pizza from "./components/Pizza";
import './App.css';

const App = () => {

  return (
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import {NotFound} from "./components/NotFound";
import Pizza from "./components/Pizza";
import Registration from "./components/Registration";
import './App.css';

const App = () => {

  return (
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Pizza />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
            <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
  );
};

export default App;

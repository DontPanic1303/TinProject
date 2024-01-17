import React, { useCallback, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import {NotFound} from "./components/NotFound";
import Pizza from "./components/Pizza";
import Registration from "./components/Registration";
import Information from "./components/Information";
import UserList from "./components/UserList";
import OrderList from "./components/OrderList";
import OrderItem from "./components/OrderItem";
import Person from "./components/Perosn";
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
            <Route path="/information" element={<Information/>} />
            <Route path="/userList" element={<UserList/>} />
            <Route path="/orderList" element={<OrderList/>} />
            <Route path="/orderList/:id" element={<OrderItem/>} />
            <Route path="/person/:id" element={<Person/>} />
        </Routes>
      </Router>
  );
};

export default App;

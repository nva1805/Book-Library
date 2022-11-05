import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import { Novel } from './components/Novel/Novel';
import { MyBook } from './components/User/MyBook';
import HomePage from './components/Home/HomePage';
import Login from './components/Login/Login';
import Register from './asset/video/Register/Register';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
        <Route path="users" element={<User />} />
        <Route path="admins" element={<Admin />} />
        <Route path="novels" element={<Novel />} />
        <Route path="mybooks" element={<MyBook />} />
      </Route>
      <Route path='logins' element={<Login/>}/>
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

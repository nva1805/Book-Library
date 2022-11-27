import React from 'react';
import ReactDOM from 'react-dom/client';
import './asset/css/index.scss';
import App from './App';
import reportWebVitals from './support/reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import { Novel } from './components/Novel/Novel';
import { MyBook } from './components/User/MyBook';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/Home/HomePage';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ManageUser from './components/Admin/Content/manage/manageUser/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import LogOut from './components/Auth/Logout/LogOut';
import { VerifyEmail } from './components/Auth/Register/VerifyEmail/VerifyEmail';
import { PersistGate } from 'redux-persist/integration/react'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="users" element={<User />} />
            <Route path="novels" element={<Novel />} />
            <Route path="mybooks" element={<MyBook />} />
          </Route>

          <Route path="admins" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manageUser" element={<ManageUser />} />
          </Route>

          <Route path='logins' element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="verify" element={<VerifyEmail />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </PersistGate>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

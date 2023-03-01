import React from 'react';
import ReactDOM from 'react-dom/client';
import './asset/css/index.scss';
import App from './App';
import reportWebVitals from './support/reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin/Admin';
import { Novel } from './components/product/Novel/Novel';
import { ToastContainer } from 'react-toastify';
import HomePage from './components/Home/HomePage';
import MyBook from './components/mybook/MyBook';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ManageUser from './components/Admin/Content/manage/manageUser/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import LogOut from './components/Auth/Logout/LogOut';
import { VerifyEmail } from './components/Auth/Register/VerifyEmail/VerifyEmail';
import { PersistGate } from 'redux-persist/integration/react'
import 'nprogress/nprogress.css'
import { NotFound } from './components/NotFound/NotFound';
import { Science } from './components/product/Science/Science';
import Profile from './components/Auth/Profile/Profile';
import ChangePassword from './components/Auth/Profile/profileFeature/ChangePassword';
import ChangeName from './components/Auth/Profile/profileFeature/ChangeName';
import Intro from './components/Auth/Profile/profileFeature/Intro';
import Product from './components/product/Product';
import Blog from './components/blogs/Blog';
import BlogDetail from './components/blogs/BlogDetail';
import ReadNovelByID from './components/product/Novel/ReadNovelByID';
import ReadScienceById from './components/product/Science/ReadScienceById';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="books" element={<Product />}>
              <Route path="novels" element={<Novel />} />
              <Route path="sciences" element={<Science />} />
            </Route>
            <Route path="mybooks" element={<MyBook />} />
            <Route path="ReadNovelByID/:id" element={<ReadNovelByID />} />
            <Route path="ReadScienceById/:id" element={<ReadScienceById />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blogDetail/:id" element={<BlogDetail />} />

          </Route>



          <Route path="admins" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manageUser" element={<ManageUser />} />
          </Route>

          <Route path="profile" element={<Profile />} >
            <Route index element={<Intro />} />
            <Route path="changePass" element={<ChangePassword />} />
            <Route path="changeName" element={<ChangeName />} />
          </Route>

          <Route path='logins' element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<LogOut />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
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

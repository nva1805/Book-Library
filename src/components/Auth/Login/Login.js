import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import { useState } from 'react';
import { auth, provider } from '../../../configs/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginAction, LoginActionGG } from '../../../redux/action/Action';
import { useDispatch } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';
import './login.scss'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false });


export default function Login() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handleSubmitLogin = () => {
    if (!password && !emailAddress) {
      toast.error('Please fill all info')
      return;
    }
    if (!password) {
      toast.error('Please enter password')
      return;
    }
    NProgress.start();
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
        // dispatch({
        //   type: 'LOGIN_ACTION',
        //   payload: userCredential
        // })
        NProgress.done();
        dispatch(LoginAction(userCredential))
        toast.success(`Welcome back! ${user.email}`)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (error.code === 'auth/invalid-email') {
          toast.error('Invalid email!, Please enter your email address again!')
        }
        else if (error.code === 'auth/internal-error') {
          toast.error('Sorry, something went wrong, please refresh page!')
        }
        else if (error.code === 'auth/user-not-found') {
          toast.error('User not found, Please check your email and enter again!')
        }
        else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password!')
        }
        else {
          toast.error(errorMessage)
        }
      });
  }

  const handleForgotPass = () => {
    sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        // Password reset email sent!
        toast.info(`We have sent you an account change verification code in your email. Please check ${emailAddress}`, {
          position: "top-center",
          autoClose: 15000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === 'auth/invalid-email') {
          toast.error('Invalid email!, Please enter your email address again!')
        }
        else if (errorCode === 'auth/missing-email') {
          toast.error('Enter your email address, you don\'t need to fill password!')
        }
        else if (error.code === 'auth/user-not-found') {
          toast.error('User not found, Please check your email and enter again!')
        }
        else if (errorCode) {
          console.log(errorCode);
          toast.error(errorMessage)
        }
      });
  }

  const handleLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('token:', token, 'user', user);
        dispatch(LoginActionGG(user))
        toast.success(`Welcome! ${user.displayName}`)
        navigate('/')
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (errorCode) {
          toast.error(errorMessage)
          console.log('email:', email, 'credential ', credential);
        }
        // ...
      });
  }

  return (
    <MDBContainer fluid className='bg-light login__parent'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
        <MDBCol col='12'>

          <MDBCard className='bg-secondary text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase text-white">Login to book</h2>
              <p className="text-white-50 mb-3">Welcome, enter your email and password!</p>

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Email address'
                id='formControlLg'
                type='email'
                size="lg"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
              />

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='formControlLgPass'
                type='password'
                size="lg"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!" onClick={handleForgotPass}>Forgot password?</a></p>
              <MDBBtn
                outline
                className='mx-2 px-5 bg-info d-flex py-3 rounded login__email'
                color='while'
                size='lg'
                onClick={handleSubmitLogin}
              >
                Login
              </MDBBtn>

              <div
                className='d-flex flex-row mt-4 mb-3 login__google'
                onClick={handleLoginGoogle}
              >
                <FcGoogle />Login with Google
              </div>

              <div>
                <p className="mb-0">
                  Don't have an account?
                  <Link to='/register' className='text-white-50 fw-bold'>Sign Up</Link>
                </p>
              </div>
              <div>
                <p className="mb-0">
                  <Link to='/' className='text-white-50 fw-bold'>Continue With guess?</Link>
                </p>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


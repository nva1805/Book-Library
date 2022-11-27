import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useState } from 'react';
import { auth } from '../../../configs/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LoginAction } from '../../../redux/action/Action';
import { useDispatch } from 'react-redux';



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
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
        // dispatch({
        //   type: 'LOGIN_ACTION',
        //   payload: userCredential
        // })
        dispatch(LoginAction(userCredential))
        toast.success(`Well com back! ${user.email}`)
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

  return (
    <MDBContainer fluid className='bg-light'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100 '>
        <MDBCol col='12'>

          <MDBCard className='bg-secondary text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase text-white">Login</h2>
              <p className="text-white-50 mb-5">Welcome, enter your email and password!</p>

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
                id='formControlLg'
                type='password'
                size="lg"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!" onClick={handleForgotPass}>Forgot password?</a></p>
              <MDBBtn
                outline
                className='mx-2 px-5 bg-info'
                color='while'
                size='lg'
                onClick={handleSubmitLogin}
              >Login</MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg" />
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
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


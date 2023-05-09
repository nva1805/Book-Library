import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  // MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { useState } from 'react';
import { auth, database } from '../../../configs/firebase';
import { toast } from 'react-toastify';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import './register.scss'





export default function Register() {
  const [emailAddress, setEmailAddress] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()


  const writeUserDataToRealtime = (user, name, email) => {
    set(ref(database, 'Participants/users/' + user.uid), {
      userName: name,
      email: email,
      role: 'USER',
      userImageURL: ''
    })
  }



  const handelSubmitRegister = () => {

    if (password !== confirmPassword) {
      toast.error('Password repeat incorrect')
      return;
    }

    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        writeUserDataToRealtime(user, userName, emailAddress)
        toast.success(`Welcome to book library, ${userName}`)
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              // ...
            })
          navigate('/verify')
        }
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email already in use')
        }
        else if (error.code === 'auth/invalid-email') {
          toast.error('Invalid email')
        }
        else if (error.code === 'auth/invalid-email') {
          toast.error('Password should be at least 6 characters')
        }
        else if (errorCode) {
          toast.error(errorMessage)
        }
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  }


  const handleHaveAccount = () => {
    navigate('/logins')
  }


  return (
    <div className='position-relative'>
      <div className='d-flex position-absolute have__account'>
        <p>Already have an account?</p>
        <button className='btn btn-dark' onClick={handleHaveAccount}>Sign up</button>
      </div>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <MDBInput
              wrapperClass='mb-4'
              label='Your User Name'
              size='lg'
              id='form1'
              type='text'
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Your Email'
              size='lg'
              id='form2'
              type='email'
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              size='lg'
              id='form3'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Repeat your password'
              size='lg'
              id='form4'
              type='password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {/* <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div> */}
            <MDBBtn
              className='mb-4 w-100 gradient-custom-4'
              size='lg'
              onClick={handelSubmitRegister}
            >Register</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

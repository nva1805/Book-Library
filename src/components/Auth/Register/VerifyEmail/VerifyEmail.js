import React from 'react'
// import VerifyImg from '../../../asset/picture/VerifyEmail.gif';
import VerifyImg from '../../../../asset/picture/giphy.gif';
import { Link } from 'react-router-dom';



export const VerifyEmail = () => {
    return (
        <div>
            <h4 className='my-5 text-center mt-5'>You can verify your email, Let's open your mailbox to check!</h4>
            <div className='d-flex justify-content-center align-items-center vh-50'>
                <div style={{height: '50vh'}}>
                    {/* <img src={require('../../../asset/picture/Logout.jpg')} /> */}
                    <img className='h-75' src={VerifyImg} alt="" />
                </div>
            </div>
            
            <button className='btn btn-primary d-block mx-auto my-5'>
                <Link to='/' className='text-decoration-none text-dark'>Back To Home</Link>
            </button>
        </div>
    )
}

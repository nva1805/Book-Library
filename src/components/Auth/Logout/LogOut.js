import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../../../configs/firebase';
import LogoutImg from '../../../asset/picture/Logout.jpg';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { persistor } from '../../../redux/store';



const LogOut = () => {
    const navigate = useNavigate()
    const handleSubmitLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.info('Sign-out successful, see you again!')
            // clear localStorage
            persistor.pause();
            persistor.flush().then(() => {
                return persistor.purge();
            });
            navigate('/logins')
            window.location.reload();
        }).catch((error) => {
            // An error happened.
            toast.error(error)
        });
    }
    return (
        <>
            <h4 className='my-5 text-center mt-5'>Are you sure to log out?</h4>
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    {/* <img src={require('../../../asset/picture/Logout.jpg')} /> */}
                    <img src={LogoutImg} alt="" />
                </div>
                <div>
                    <button className='btn btn-secondary ms-5' onClick={handleSubmitLogout}>Books ncc djtmemay bố out</button>
                </div>
            </div>
            <button className='btn btn-warning d-block mx-auto my-5'>
                <Link to='/' className='text-decoration-none text-dark'>Back To Home</Link>
            </button>
        </>

    )
}
export default LogOut

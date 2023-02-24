import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../services/apiService';
import DefaultAvt from '../../../asset/picture/defaultAvt/sbcf-default-avatar.png'
import '../../../asset/css/components/auth/profile.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { storage, database, auth } from '../../../configs/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, update } from 'firebase/database';
import nprogress from 'nprogress';
import { toast } from 'react-toastify';
import { updateProfile } from "firebase/auth";




const Profile = () => {
    const navigate = useNavigate()
    const [listUser, setListUser] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    const checkAccount = useSelector((state) => state.userReducer.account)
    useEffect(() => {
        fetchListUser()
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser()
        console.log(res);
        if (res.status === 200) {
            const fetchResults = [];
            for (let key in res.data) {
                fetchResults.unshift(
                    {
                        ...res.data[key],
                        id: key
                    }
                )
            }
            console.log(fetchResults);
            setListUser(fetchResults)
        }
    }
    const user = listUser.find((u) => u.email === checkAccount.email)

    const handleChangeAvt = async (e) => {
        nprogress.start()
        const storageRef = ref(storage, `/Participants/${e.target.files[0].name}`);
        await uploadBytes(storageRef, e.target.files[0]);
        const downloadUrl = await getDownloadURL(storageRef);


        // update photo Url
        updateProfile(auth.currentUser, {
            photoURL: downloadUrl,
        }).then(() => {
            console.log('success');
        }).catch((error) => {
            toast.error(`Fail to update`)
        });

        // write to realtime database
        const dbUserRef = dbRef(database, 'Participants/users/' + user.id);
        update(dbUserRef, {
            userImageURL: 'https://firebasestorage.googleapis.com/v0/b/' + storageRef.bucket + '/o/' + encodeURIComponent(storageRef.fullPath) + '?alt=media',
            // userImageURL: downloadUrl
        }, { merge: true });
        nprogress.done()
        setPreviewImage(URL.createObjectURL(e.target.files[0]))

    }
    return (
        <div className='container'>
            <div className="profile">
                {user &&
                    <div className="row">
                        <div className="profile__hi">
                            <button
                                className='btn btn-light'
                                onClick={() => navigate('/')}
                            >Back To Book Library</button>
                            <span>Hello, have a good day! <b>{user.userName}</b></span>
                        </div>
                        <div className="col col-3 profile__left">
                            <div className='profile__info'>
                                <div className="profile__avt">
                                    <img src={(user.userImageURL || previewImage) ? (previewImage || user.userImageURL) : DefaultAvt} alt="avatar" />
                                    <label
                                        className='btn btn-primary'
                                        htmlFor='inputImg'
                                    >
                                        Change avatar
                                    </label>
                                    <input type="file" id='inputImg' name="" hidden onChange={(e) => handleChangeAvt(e)} />
                                </div>
                                <div className="profile__name"><b>Your Name :</b> {user.userName}</div>
                                <div className="profile__email"><b>Email address: </b> {user.email}</div>
                            </div>
                            <div className="profile__feature">
                                <span onClick={() => navigate('/profile')}>Book Library Welcome!</span>
                                <span onClick={() => navigate('changePass')}>Change Password</span>
                                <span onClick={() => navigate('changeName')}>Change Name</span>
                            </div>
                        </div>
                        <div className="col col-9">
                            <div className="profile__show">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
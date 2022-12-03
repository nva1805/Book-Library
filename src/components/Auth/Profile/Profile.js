import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../services/apiService';
import DefaultAvt from '../../../asset/picture/defaultAvt/sbcf-default-avatar.png'


const Profile = () => {
    const [listUser, setListUser] = useState([])
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
    console.log('user', user);
    return (
        <div className='container'>
            <div className="profile  mt-5">
                {user &&
                    <div className="row">
                        <div className="profile__hi"> Hello, have a good day! <b>{user.userName}</b></div>
                        <div className="col col-3">
                            <div className='profile__info'>
                                <div className="profile__avt">
                                    <img src={user.userImageURL ? user.userImageURL : DefaultAvt} alt="avatar" />
                                </div>
                                <div className="profile__name"><b>Your Name :</b> {user.userName}</div>
                                <div className="profile__email"><b>Email address: </b> {user.email}</div>
                            </div>
                            <div className="profile__function mt-5">
                                <div className="profile__change-pass">
                                    Change Pass Word
                                </div>
                                <div className="profile__change-name">
                                    Name
                                </div>
                            </div>
                        </div>
                        <div className="col col-9"></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
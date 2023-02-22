import React, { useEffect, useState } from 'react'
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";
import { auth, database } from '../../../../configs/firebase';
import { toast } from 'react-toastify';

const ChangeName = (props) => {

    const [name, setName] = useState('');
    const user = auth.currentUser;

    const handleSubmitChange = () => {
        updateProfile(auth.currentUser, {
            displayName: `${name}`, photoURL: "https://firebasestorage.googleapis.com/v0/b/backend-booklibrary.appspot.com/o/Participants%2Fhiringposter.jpg?alt=media&token=8b2b0372-7b6e-48e4-aa2c-d241841275e1"
        }).then(() => {
            toast.success("Change Name success, refresh to view")
        }).catch((error) => {
            toast.error(`Fail to change name ${error}`)
        });

        // save to real time database
        const userRef = ref(database, `Participants/users/${user.uid}`);
        update(userRef, { userName: name })
            .then(() => {
                toast.success("Name updated successfully!")
            })
            .catch((error) => {
                console.error("Error updating Name in the database: ", error);
            });
    }

    useEffect(() => {
        console.log(user);
    }, [user])




    return (
        <div>
            {user &&
                <div className="info mt-5">

                    <h4>Hi {user.displayName}, you have user id at:</h4>
                    <span>User ID: {user.uid}</span>
                </div>
            }

            <h4 className='mt-4'>Change Your Name</h4>
            <input
                type="text"
                placeholder='New Name'
                id=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-50 p-2 d-block mb-5'
            />
            <button className='btn btn-primary'
                onClick={handleSubmitChange}
            >Save</button>
        </div>
    )
}

export default ChangeName
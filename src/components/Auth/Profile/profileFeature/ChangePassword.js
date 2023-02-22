import React, { useState } from 'react';
import { auth, database } from '../../../../configs/firebase';
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import nprogress from 'nprogress';
import logo from "../../../../asset/picture/logo750.png"

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const authentication = useSelector((state) => state.userReducer.account)

  console.log(authentication);
  const handleChangePassword = () => {
    // resign
    signInWithEmailAndPassword(auth, authentication.email, currentPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(userCredential);
        nprogress.done();
        toast.success(`Old password with email: ${user.email} is correct`)


        // change password
        if (newPassword.length >= 6) {
          if (newPassword === confirmNewPassword) {
            console.log('aa');
            updatePassword(user, newPassword)
              .then(() => {
                // update the password in the realtime database
                const userRef = ref(database, `Participants/users/${user.uid}`);
                update(userRef, { password: newPassword })
                  .then(() => {
                    toast.success("Password updated successfully!")
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('')
                  })
                  .catch((error) => {
                    console.error("Error updating password in the database: ", error);
                  });
              })
              .catch((error) => {
                console.error("Error updating password: 111", error);
              })
              .catch((error) => {
                console.error("Error re-authenticating user: ", error);
              })
          } else {
            toast.error("New password and confirm password do not match")
          }
        } else {
          toast.error("Password must contain at least 6 characters")
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (error.code === 'auth/wrong-password') {
          toast.error('Current password incorrect password!')
        }
      })

  };

  return (
    <div>
      <h2>Change Password</h2>
      <div>
        <label htmlFor="currentPassword" className="d-block mt-4 fw text-capitalize">
          <b>Current password</b>
        </label>
        <input
          type="text"
          id="currentPassword"
          className="w-75 p-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="d-block mt-4 fw text-capitalize">
          <b>New password</b>
        </label>
        <input
          type="text"
          id="newPassword"
          className="w-75 p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmNewPassword" className="d-block mt-4 fw text-capitalize">
          <b>Confirm new password</b>
        </label>
        <input
          type="text"
          id="confirmNewPassword"
          className="w-75 p-2"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col col-6">
          <button type="submit" className="btn btn-primary mt-5" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
        <div className="col col-6">
          <img src={logo} alt="" style={{ width: "430px", marginTop: "5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
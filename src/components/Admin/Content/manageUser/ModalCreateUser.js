import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../../configs/firebase';




function ModalCreateUser() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEmail('');
    setPassword('');
    setUserName('');
    setRole('USER');
    setImageFile('');
    setPreviewImage('')
    setImgUrl('')
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [role, setRole] = useState('USER')
  const [imageFile, setImageFile] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [imgUrl, setImgUrl] = useState(null);



  const handlePreviewImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    } else {
      // setPreviewImage(null) // neu ko co anh thi hien thi dong chu ''
    }

  }

  const handleSubmitCreateUser = async () => {
    if (!imageFile && !email && !password && !userName) {
      alert("Please fill data first!")
    }
    //upload img and get link
    ; (function uploadToImgFirebase() {
      const storageRef = ref(storage, `/Participants/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // set percent if you need here!
        },
        (err) => console.log(err),
        () => {
          // download url; get link
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url)
          });
        }
      );
    })();
    
    
    // call api
    let data = {
      email: email,
      password: password,
      userName: userName,
      role: role,
      userImageURL: `${imgUrl}`
    }

    await axios.create({
      baseURL: 'https://backend-booklibrary-default-rtdb.firebaseio.com/Participants'
    }).post('users.json', data).then(response => { console.log(response) }).catch(err => { console.log(err) })
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow} >
        Add New User
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        backdrop='static'
        className='custom-modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new User!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className=" row form-row mb-4">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)} />
              </div>
            </div>

            <div className="row form-row mb-4">
              <div className="form-group col-md-6">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='User Name'
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)} />
              </div>
              <div className="form-group col-md-4">
                <label>Role</label>
                <select className="form-control" onChange={(event) => setRole(event.target.value)}>
                  <option selected value='USER'>USER</option>
                  <option value='ADMIN'>ADMIN</option>
                </select>
              </div>
            </div>

            <div className="img-upload">
              <div className="row col-5">
                <label className='col col-8 text-capitalize mb-2' htmlFor='inputImg'> <AiOutlinePlusCircle />Choose image file</label>
                <input
                  type="file"
                  id='inputImg'
                  name="" hidden
                  // value={image}
                  onChange={(event) => handlePreviewImage(event)} />
              </div>
              <div className="col col-12 img-preview">
                {previewImage ?
                  <img src={(previewImage)} alt="" />
                  :
                  <span>Preview your picture <br /> If you want to change your picture, click Choose image file again!</span>
                }
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;

// render(<Example />);



// 



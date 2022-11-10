import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function ModalCreateUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [role, setRole] = useState('USER')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    } else {
      // setPreviewImage(null) // neu ko co anh thi hien thi dong chu ''
    }
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
                  value={email} required
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
                  value={userName} required
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
                <label className='col col-8 text-capitalize mb-2' htmlFor='inputImg'> <AiOutlinePlusCircle /> up load file image</label>
                <input
                  type="file"
                  id='inputImg'
                  name="" hidden
                  // value={image}
                  onChange={(event) => handleUploadImage(event)} />
              </div>
              <div className="col col-12 img-preview">
                {previewImage ?
                  <img src={(previewImage)} alt="" />
                  :
                  <span>Preview your image</span>
                }
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
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



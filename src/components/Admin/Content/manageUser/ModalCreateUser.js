import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCreateUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new User!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className=" row form-row mb-4">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" />
              </div>
            </div>

            <div className="row form-row mb-4">
              <div className="form-group col-md-6">
                <label>User Name</label>
                <input type="text" className="form-control" placeholder='User Name' required />
              </div>
              <div className="form-group col-md-4">
                <label>Role</label>
                <select className="form-control">
                  <option selected value='USER'>USER</option>
                  <option value='ADMIN'>ADMIN</option>
                </select>
              </div>
            </div>

            <div className="row form-row">
              <label>User Image</label>
              <input type="file" name=""/>
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



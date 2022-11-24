import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../../services/apiService';




const ModalDeleteUser = (props) => {
    const { userInfo  } = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [responseUpload, setResponseUpload] = useState(false);


    const handleSubmitDelete = async () => {
        // delete image?


        // call api
        await deleteUser(userInfo.id)
            .then(response => {
                // console.log(response);
                if (response.data === 200) {
                    setResponseUpload(true)
                }
            }).catch(err => { console.log(err) })



        // close modal if success
        if (!responseUpload) {
            toast.info('Delete user successful')
            handleClose()
            await props.fetchListUser()
        } else {
            toast.error('Fail to delete user')
        }
    }


return (
    <>
        <Button variant="danger" onClick={handleShow}>
            Delete
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete User Confirm?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete this user: <br />
                Email: <b>{userInfo && userInfo.email ? userInfo.email : ''}</b>
                <br />
                User Name: <b>{userInfo && userInfo.userName ? userInfo.userName : ''}</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSubmitDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
}
export default ModalDeleteUser
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../../../configs/firebase';
import { toast } from 'react-toastify';
import { patchUpdateUser } from '../../../../../services/apiService';



function ModalUpdateUser(props) {
    const { userInfo } = props
    console.log(userInfo);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => { setShow(false) };

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [role, setRole] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [responseUpload, setResponseUpload] = useState(false);
    const [userID, setUserID] = useState('')


    //update table user when mounted
    useEffect(() => {
        setEmail(userInfo.email)
        setPassword(userInfo.password)
        setUserName(userInfo.userName)
        setRole(userInfo.role)
        setImageFile('')
        setPreviewImage(userInfo.userImageURL)
        setResponseUpload(false);
        setUserID(userInfo.id)
    }, [userInfo])


    const handlePreviewImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImageFile(event.target.files[0])
        } else {
            // setPreviewImage(null) // neu ko co anh thi hien thi dong chu ''
        }

    }

    const handleSubmitCreateUser = async () => {
        // validate
        if (!email && !password && !userName) {
            toast.error('Please fill info first')
            return;
        }

        //upload img and get link
        ; (async function postImgToFirebase() {
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
                        // console.log(url)
                    });
                }
            );
        })();

        // call api
        await patchUpdateUser(userName, role, imgUrl, userID)
            .then(response => {
                // console.log(response);
                if (response.data === 200) {
                    setResponseUpload(true)
                }
            }).catch(err => { console.log(err) })


        // close modal if success
        if (!responseUpload) {
            toast.info('Update user successful')
            handleClose()
            await props.fetchListUser()
        } else {
            toast.error('Fail to Update user')
        }
    }


    return (
        <>
            <Button variant="warning" className='mx-3' onClick={handleShow} >
                Update
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                size='lg'
                backdrop='static'
                className='custom-modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User!</Modal.Title>
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
                                    disabled
                                    onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    disabled
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

export default ModalUpdateUser;

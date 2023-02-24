import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from '../../utils/axiosCustomize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BsPencilFill, BsPlusLg } from 'react-icons/bs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../configs/firebase';


const ModalAddBlog = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const author = useSelector((state) => state.userReducer.account.userName);


    const date = new Date();


    const handlePreviewImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage(null) // neu ko co anh thi hien thi dong chu ''
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title && !content) {
            toast.error("Please Fill")
        } else {
            const storageRef = ref(storage, `/blog/${image.name}`);
            await uploadBytes(storageRef, image);
            const downloadUrl = await getDownloadURL(storageRef);

            const newBlog = { title, author, content, image: downloadUrl, date: date.toLocaleDateString() };
            axios.post('Blogs.json', newBlog)
                .then(response => {
                    const blogId = response.data.name;
                    onAdd({ id: blogId, ...newBlog });
                    setTitle('');
                    setContent('');
                    setShow(false);
                    setPreviewImage('')
                    setImage('')
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <div className='col col-12 offset-md-1 my-5'>
            <Button variant="primary" onClick={() => setShow(true)}>
                <BsPencilFill /><BsPlusLg /> Write Blog
            </Button>

            <Modal show={show} size='lg' onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author:</label>
                            <input type="text" className="form-control" id="author" value={author} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea className="form-control" id="content" rows="5" value={content} onChange={e => setContent(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image" className='btn btn-danger mt-2'>+Choose cover image</label>
                            <input type="file" id='image'  name="" hidden className="form-control"
                                onChange={(event) => handlePreviewImage(event)} />
                            <img src={(previewImage)} alt="" className='d-flex py-1 m-auto' style={{ height: "10rem"}} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Add Blog
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalAddBlog;
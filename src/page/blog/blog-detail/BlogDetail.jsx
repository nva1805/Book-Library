import { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import Comment from '../../../components/blogs/comments/Comment';
import { auth, database } from '../../../configs/firebase';
import { useParams } from 'react-router-dom';
import "./BlogDetail.scss"
import { ImSpinner3 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const user = auth.currentUser

    const authentication = useSelector(state => state.userReducer.isAuthenticated)

    useEffect(() => {
        const blogRef = ref(database, `Blogs/${id}`);
        onValue(blogRef, (snapshot) => {
            const blog = snapshot.val();
            setBlog(blog);
        });
    }, [id]);

    const handleCommentSubmit = (event) => {
        if (!authentication) {
            toast.info("You must login to use this function!")
        } else {
            event.preventDefault();
            const commentRef = ref(database, `Blogs/${id}/comments`);
            push(commentRef, {
                content: comment,
                createdAt: {
                    '.sv': 'timestamp'
                },
                userName: user.displayName,
                userImageURL: user.photoURL
            });
            setComment('');
        }
    };


    if (!blog) {
        return (<div className='container blogDetail__loading'>
            <ImSpinner3 />
        </div>)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card mb-4 img-detail">
                        <img
                            className="card-img-top"
                            src={blog.image}
                            alt={blog.title}
                        />
                        <div className="card-body">
                            <h2 className="card-title text-capitalize">{blog.title}</h2>
                            <p className="card-text">{blog.content}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    Posted by {blog.author} on{' '}
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </small>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <Comment
                        comments={blog.comments || {}}
                        onSubmit={handleCommentSubmit}
                        comment={comment}
                        onCommentChange={(event) => setComment(event.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;

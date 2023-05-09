import React from 'react';
import defaultAvt from "../../../asset/picture/defaultAvt/sbcf-default-avatar.png"
import "./Comment.scss"

const Comment = (props) => {
    const { comments, onSubmit, comment, onCommentChange } = props;

    console.log(comments);

    const renderComments = () => {
        return Object.keys(comments).map((commentKey) => {
            const comment = comments[commentKey];
            return (
                <div key={commentKey} className="card mb-3" style={{ backgroundColor: "#d3d6db" }}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center">
                                <img
                                    src={comment.userImageURL ? comment.userImageURL : defaultAvt}
                                    className="rounded-circle mr-2 border"
                                    alt={comment.userName}
                                />
                                <span ><b>{comment.userName}</b></span>
                            </div>
                            <small className="text-muted">
                                Commented on{' '}
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </small>
                        </div>
                        <p className="card-text">{comment.content}</p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className='comment'>
            <h4>Comments:</h4>
            {renderComments()}
            <div className="form-group">
                <label htmlFor="comment">Leave a comment:</label>
                <textarea
                    style={{ backgroundColor: "#d3d6db" , outline: "none" }}
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={onCommentChange}
                    placeholder="Comment..."
                />
            </div>
            <div className="d-flex justify-content-end my-5">
                <button type="button" className="btn btn-primary" onClick={onSubmit}> 
                    Comment
                </button>
            </div>
        </div>
    );
};

export default Comment;

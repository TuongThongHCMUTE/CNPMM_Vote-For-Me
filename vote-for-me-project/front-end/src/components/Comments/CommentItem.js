import React, { useContext, useState } from 'react'
import axios from 'axios';
import AppContext from '../../store/AppContext';

import classes from './CommentItem.module.css';
import userAvatar from '../../assets/user-circle.png';
import moreImage from '../../assets/more-vert.png';

const CommentItem = props => {
    const comment = props.comment;

    const {dispatch} = useContext(AppContext)
    const [commentToEdit, setCommentToEdit] = useState(comment);
    const [openEditForm, setOpenEditForm] = useState(true)
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
    
    const updateComment = async () => {
        try{
            setOpenEditForm(false);
            const token = localStorage.getItem("token");
            const option = {
                method: "put",
                url: `/api/v1/comments/${comment._id}`,
                data: commentToEdit,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios(option);
            dispatch({
                type:  "UPDATE_ONE_POST",
                payload: {...commentToEdit},
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteComment = async () => {
        try{
            const token = localStorage.getItem("token");
            const option = {
                method: "delete",
                url: `/api/v1/comments/${comment._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios(option);
            dispatch({
                type:  "DELETE_ONE_COMMENT",
                payload: {_id: comment._id},
            });
        } catch (error) {
            console.log(error);
        }
    }

    let date = new Date(comment.createdAt);

    //console.log(comment);
    
    return (
        <div className={classes["comment-item"]}>
            <div className={classes.avatar}>
                <img src={userAvatar} alt='user-avt' />
            </div>
            <div className={classes.comment}>
                <div className={classes["comment-view"]}>
                    <div className={classes.content}>
                        <div className={classes["user-name"]}>{comment.author.name}</div>
                        <div className={classes["user-comment"]}>{comment.content}</div>
                    </div>
                    {comment.isEditable && (<button className={classes.more}>
                        <img src={moreImage} alt='more' />
                    </button>)}
                </div>
                {openEditForm && (
                    <div className={classes["comment-edit"]}>
                        <form className={classes["edit-form"]}>
                            <textarea
                                type="text"
                                name="content"
                                id="content"
                                className="content"
                                placeholder="What's happening?"
                                value={commentToEdit.content}
                                onChange={(e) =>
                                    setCommentToEdit({ ...commentToEdit, content: e.target.value })
                        
                                }
                            ></textarea>
                            <div className={classes["btn-container"]}>
                                <button 
                                    className={classes["btn"]}
                                    type="button"
                                    onClick={() => updateComment(commentToEdit)}>Update</button>
                                <button 
                                    className={classes["btn"]}
                                    type="button"
                                    onClick={() => deleteComment(commentToEdit)}>Delete</button>
                                <button 
                                    className={classes["btn"]}
                                    type="button"
                                    onClick={() => setOpenEditForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
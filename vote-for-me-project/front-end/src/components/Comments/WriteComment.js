import React, { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../../store/AppContext';

import classes from './WriteComment.module.css';
import userAvatar from '../../assets/user-circle.png';
import sendImage from '../../assets/send.png';

const WriteComment = props => {
    const { state, dispatch } = useContext(AppContext)
    const { user, post } = state;
    const [commentInput, setCommentInput] = useState({ content: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            if (!user) {
                setErrorMessage("Please login to write your comments!")
                return;
            }

            const token = localStorage.getItem("token");
            const option = {
                method: 'post',
                url: 'https://voteforgroup30-be.herokuapp.com/api/v1/comments/',
                data: commentInput,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios(option);

            const {comment} = response.data.data;

            const author = { _id: comment.author, name: user.userName };

            dispatch({
                type: "CREATE_ONE_COMMENT",
                payload: { ...comment, author, isEditable: true},
            });

            // Reset comment
            setCommentInput({ content: "" });
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    const onChangeHandler = (e) => {
        setCommentInput({ 
            ...commentInput, 
            [e.target.name]: e.target.value,
            post: post.id
        })    
    }
 
    return (
        <>
            <div className={classes["write-comment"]}>
                <div className={classes.avatar}>
                    <img src={userAvatar} alt='user-avt' />
                </div>
                <form className={classes.comment} onSubmit={onSubmitHandler}>
                    <input 
                        className={classes.content} 
                        name='content'
                        id='content'
                        type='textarea' 
                        value = {commentInput.content}
                        onChange = {onChangeHandler}
                        placeholder="Write your comment..." />
                    <button type="submit" className={classes.send}>
                        <img src={sendImage} alt='send' />
                    </button>
                </form>
            </div>
            { errorMessage && (<div className={classes["error-message"]}>{errorMessage}</div>)}
        </>
    )
}

export default WriteComment;

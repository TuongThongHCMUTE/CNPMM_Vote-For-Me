import React from 'react'

import classes from './WriteComment.module.css';
import userAvatar from '../../assets/user-circle.png';
import sendImage from '../../assets/send.png';

const WriteComment = props => {
    return (
        <div className={classes["write-comment"]}>
            <div className={classes.avatar}>
                <img src={userAvatar} alt='user-avt' />
            </div>
            <form className={classes.comment} onSubmit="">
                <input className={classes.content} type='textarea' placeholder="Write your comment..." />
                <button className={classes.send}>
                    <img src={sendImage} alt='send' />
                </button>
            </form>
        </div>
    )
}

export default WriteComment;

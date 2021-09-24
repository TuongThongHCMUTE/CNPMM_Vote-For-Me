import react from "react";

import classes from './CommentItem.module.css';
import userAvatar from '../../assets/user-circle.png';
import moreImage from '../../assets/more-vert.png';

const CommentItem = props => {
    return (
        <div className={classes["comment-item"]}>
            <div className={classes.avatar}>
                <img src={userAvatar} alt='user-avt' />
            </div>
            <div className={classes.comment}>
                <div className={classes.content}>
                    <div className={classes["user-name"]}>User Name</div>
                    <div className={classes["user-comment"]}>User's Comment</div>
                </div>
                <button className={classes.more}>
                    <img src={moreImage} alt='more' />
                </button>
            </div>
        </div>
    );
}

export default CommentItem;
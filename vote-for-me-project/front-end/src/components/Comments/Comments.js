import React from 'react'
import Card from "../UI/Card";
import CommentItem from './CommentItem';

import classes from './Comments.module.css';
import WriteComment from './WriteComment';

const Comments = props => {
    return (
        <section className={classes.comments}>
            <Card isTransparent="true" >
                <h3>Place your comments here!</h3>
                <div className={classes.line}></div>
                <WriteComment />
                <div className={classes["comment-items"]}>
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                    <CommentItem />
                </div>
            </Card>
        </section>
    )
}

export default Comments;

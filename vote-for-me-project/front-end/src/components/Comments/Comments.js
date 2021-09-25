import React, {useCallback, useContext, useEffect} from 'react';
import axios from "axios";
import AppContext from '../../store/AppContext';

import Card from "../UI/Card";
import CommentItem from './CommentItem';
import WriteComment from './WriteComment';

import classes from './Comments.module.css';

const Comments = props => {
    const { state, dispatch } = useContext(AppContext);
    const { comments, user } = state;

    const getAllComments = useCallback(async () => {
        try {
            const option = {
                method: "get",
                url: "/api/v1//posts/614e81971df0d12158424161",
            }
            const response = await axios(option);
            const comments = response.data.data.comments;
            dispatch({ type: "GET_ALL_COMMENTS", payload: comments});
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getAllComments()
    }, [getAllComments])

    const newComments = comments.map((comment) => {
        if (user) {
            return comment.author._id === user._id
                ? { ...comment, isEditable: true }
                : comment
        } else {
            return { ...comment, isEditable: false}
        }
        
    });


    const commentsList = newComments.map(comment => (
        <CommentItem comment={comment} key={comment._id} />
    ));

    return (
        <section className={classes.comments}>
            <Card isTransparent="true" >
                <h3>Place your comments here!</h3>
                <div className={classes.line}></div>
                <WriteComment />
                <div className={classes["comment-items"]}>
                    { commentsList }
                </div>
            </Card>
        </section>
    )
}

export default Comments;

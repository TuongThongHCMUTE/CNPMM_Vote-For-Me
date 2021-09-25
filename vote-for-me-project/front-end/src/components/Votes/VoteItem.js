import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from "axios";
import AppContext from '../../store/AppContext';

import Button from '../UI/Button';
import Card from '../UI/Card';

import classes from './VoteItem.module.css';

const VoteItem = props => {

    const { state, dispatch } = useContext(AppContext);
    const { votes, user } = state;

    let classifiedVotes = [];
    switch (props.status) {
        case "good":
            classifiedVotes = votes.filter((vote) => vote.action ===  "good")
            break;
        case "fine":
            classifiedVotes = votes.filter((vote) => vote.action ===  "fine")
            break;
        case "bad":
            classifiedVotes = votes.filter((vote) => vote.action ===  "bad")
            break;
        default:
            classifiedVotes = votes;
    }

    const classifiedVotesCount = classifiedVotes.length;
    const totalVotesCount = votes.length;
    const percent = ((classifiedVotesCount / totalVotesCount) * 100).toFixed(0);

    const isVoted = classifiedVotes.find(vote => vote.userId === user.userId);

    let progress = '0%';

    if(percent > 0) {
        progress = percent + '%';
    }

    const editVote = async () => {
        try{
            console.log(props.status);

            const token = localStorage.getItem("token");
            const option = {
                method: "put",
                url: "/api/v1/posts/vote/614f5e3ae9e78f0c2c2013e0",
                data: { action: props.status },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            const votes = response.data.data.votes;

            dispatch({
                type:  "GET_ALL_VOTES",
                payload: votes
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const onVoteHandler = () => {
        editVote();
    }

    return (
        <div className={classes["vote-item"]}>
            <Card>
                <div className={classes.content}>
                    {isVoted ? <Button onClick={onVoteHandler} isActive="true">VOTED</Button> : <Button onClick={onVoteHandler}>VOTE</Button>}
                    
                    <div className={classes.status}>{props.status}</div>
                    <div className={classes["voted-result"]}>
                        <div className={classes["voted-percent"]}>{`${percent}%`}</div>
                        <div className={classes["voted-count"]}>{`${classifiedVotesCount}/${totalVotesCount}`}</div>
                    </div>
                </div>
                <div className={classes["progress-bar"]}>
                    <div className={classes["progress-value"]} style={{ width: progress }}></div>
                </div>
            </Card>
        </div>
    )
}

export default VoteItem;

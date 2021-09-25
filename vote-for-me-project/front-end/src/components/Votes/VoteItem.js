import React, {useCallback, useContext, useEffect} from 'react';
import axios from "axios";
import AppContext from '../../store/AppContext';

import Button from '../UI/Button';
import Card from '../UI/Card';

import classes from './VoteItem.module.css';

const VoteItem = props => {

    const { state, dispatch } = useContext(AppContext);
    const { votes, user } = state;

    console.log("VOTES IN VOTE ITEM ", votes)

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

    return (
        <div className={classes["vote-item"]}>
            <Card>
                <div className={classes.content}>
                    <Button>VOTE</Button>
                    <div className={classes.status}>{props.status}</div>
                    <div className={classes["voted-result"]}>
                        <div className={classes["voted-percent"]}>{`${percent}%`}</div>
                        <div className={classes["voted-count"]}>{`${classifiedVotesCount}/${totalVotesCount}`}</div>
                    </div>
                </div>
                <div className={classes["progress-bar"]}>
                    <div className={classes["progress-value"]}></div>
                </div>
            </Card>
        </div>
    )
}

export default VoteItem;

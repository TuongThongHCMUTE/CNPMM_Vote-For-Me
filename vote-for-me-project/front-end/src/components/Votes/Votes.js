import React, { useContext, useCallback, useEffect } from 'react';
import AppContext from '../../store/AppContext';
import Card from '../UI/Card';
import VoteItem from './VoteItem';
import axios from "axios";

import classes from "./Votes.module.css";

function Votes() {
    const { dispatch } = useContext(AppContext);

    const getAllVotes = useCallback(async () => {
        try {
            const option = {
                method: "get",
                url: "/api/v1//posts/614e81971df0d12158424161",
            }
            const response = await axios(option);
            const votes = response.data.data.post.votes;

            console.log("VOTE ", votes);

            dispatch({ type: "GET_ALL_VOTES", payload: votes});
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getAllVotes()
    }, [getAllVotes])

    return (
        <section className={classes.votes}>
            <Card isTransparent="true" >
                <h3>What do you think about that?</h3>
                <div className={classes.line}></div>
                <VoteItem status="good"></VoteItem>
                <VoteItem status="fine"></VoteItem>
                <VoteItem status="bad"></VoteItem>
            </Card>
        </section>
    )
}

export default Votes;

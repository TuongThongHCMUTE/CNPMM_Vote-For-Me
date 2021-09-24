import React from 'react';
import Card from '../UI/Card';
import VoteItem from './VoteItem';

import classes from "./Votes.module.css";

function Votes() {
    return (
        <section className={classes.votes}>
            <Card isTransparent="true" >
                <h3>What do you think about that?</h3>
                <div className={classes.line}></div>
                <VoteItem></VoteItem>
                <VoteItem></VoteItem>
                <VoteItem></VoteItem>
            </Card>
        </section>
    )
}

export default Votes;

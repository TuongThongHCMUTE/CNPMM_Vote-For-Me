import React from 'react'
import Button from '../UI/Button';
import Card from '../UI/Card';

import classes from './VoteItem.module.css';

const VoteItem = props => {
    return (
        <div className={classes["vote-item"]}>
            <Card>
                <div className={classes.content}>
                    <Button>VOTE</Button>
                    <div className={classes.status}>Good</div>
                    <div className={classes["voted-result"]}>
                        <div className={classes["voted-percent"]}>70%</div>
                        <div className={classes["voted-count"]}>7/10</div>
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

import React from 'react';
import Card from "../UI/Card";

import classes from "./PostContent.module.css"

function PostContent() {
    return (
        <section className={classes["post-content"]}>
            <Card>
                <div className={classes.content}>
                    <h5>Group 30</h5>
                    <h3>TOPIC: Persisting Data with MongoDB by NodeJS</h3>
                    <h5>Main content:</h5>
                    <ul>
                        <li>...</li>
                        <li>...</li>
                    </ul>
                    <h5>Link documents:</h5>
                    <ul>
                        <li>...</li>
                        <li>...</li>
                    </ul>
                </div>    
            </Card>
        </section>
    )
}

export default PostContent

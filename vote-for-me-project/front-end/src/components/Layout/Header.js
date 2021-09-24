import React from "react";

import classes from './Header.module.css'

const Header = props => {
    return (
        <div className={classes.header}>
            <div className={classes.content}>
                <h1>Vote For Me!</h1>
                <div className={classes.account}>
                    <div className={classes['user-name']}>Hello, Dinh Bach Thong</div>
                    <div className={classes['sign-out']}>Sign out</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
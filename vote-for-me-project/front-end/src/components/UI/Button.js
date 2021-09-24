import React from 'react'

import classes from './Button.module.css'

const Button = (props) => {
    const btnClasses = `${classes.button} ${props.isActive ? classes.active : ''}`;

    return (
        <div className={btnClasses}>
            {props.children}
        </div>
    );
}

export default Button

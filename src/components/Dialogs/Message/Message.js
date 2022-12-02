import React from 'react';

import classes from './Message.module.css';

const Message = ({text}) => {
    return <div className={classes.message}>{text}</div>
}

export default Message;
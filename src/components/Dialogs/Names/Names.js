import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Names.module.css';


const Names = ({id, name}) => {
    let path = '/dialogs/' + id;
    
    return (
        <div className={classes.name}>
                    <NavLink to={path}>{name}</NavLink>
        </div>
    )
}
export default Names;
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Names.module.css';

type PropsType = {
    name: string
    id: number
}

const Names: React.FC<PropsType> = ({id, name}) => {
    let path = '/dialogs/' + id;
    
    return (
        <div className={classes.name}>
                    <NavLink to={path}>{name}</NavLink>
        </div>
    )
}
export default Names;
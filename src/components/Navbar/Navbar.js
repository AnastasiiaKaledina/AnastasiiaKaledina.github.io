import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className={classes.nav}>
            <div>
                <NavLink className={({ isActive }) => isActive ? classes.active : classes.item} to='/profile'>Profile</NavLink>
            </div>
            <div>
                <NavLink className={({ isActive }) => isActive ? classes.active : classes.item} to='/users'>Users</NavLink>
            </div>
            <div>
                <NavLink className={({ isActive }) => isActive ? classes.active : classes.item} to='/dialogs'>Messages</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;
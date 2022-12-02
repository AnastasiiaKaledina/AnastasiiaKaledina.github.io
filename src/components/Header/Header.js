import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../assets/images/logo.jpeg'

function Header(props) {
    return (
        <header className={classes.header}>
            <img src={logo} />
            <div className={classes.loginBlock}>
                {props.isAuth 
                    ? <div className={classes.descr}>{props.login} - <button className={classes.log} onClick={props.deleteLogin}>Log out</button></div> 
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
      	</header>
    )
}

export default Header;



import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../redux/users-reducer';
import Pagination from './Pagination';
import classes from './Users.module.css';

type PropsType = {
    totalUserCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType> // импортировали из редьюсера
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFollowInProgress: Array<number>
}

let Users: FC<PropsType> = (props) => {


    return (
        <div>
            <Pagination totalUserCount={props.totalUserCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} currentPage={props.currentPage} />

            {
                props.users
                    .map(u => <div key={u.id} className={classes.user}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small == null ? "https://img.freepik.com/premium-vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol-neumorphic-ui-ux-white-user-interface-web-button-neumorphism-vector-eps-10_399089-2757.jpg" : u.photos.small} className={classes.avatar} />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    ? <button disabled={props.isFollowInProgress.some(id => id === u.id)} onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button disabled={props.isFollowInProgress.some(id => id === u.id)} onClick={() => {
                                        props.follow(u.id)
                                    }}>Follow</button>}
                            </div>
                        </span>

                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status || 'Статус не установлен'}</div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    )
}

export default Users;

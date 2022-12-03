import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers, UserType} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader'
import { getPageSize, getUsersFromState } from '../../redux/users-selectors';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUserCount: number
    isFollowInProgress: Array<number>
    users: Array<UserType>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnPropsType = {

}


type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> { 
    componentDidMount() { 
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => { 
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null} 
            <Users totalUserCount={this.props.totalUserCount}
                        pageSize={this.props.pageSize}
                        onPageChanged={this.onPageChanged}
                        currentPage={this.props.currentPage}
                        unfollow={this.props.unfollow} 
                        follow={this.props.follow} 
                        users={this.props.users}
                        isFollowInProgress={this.props.isFollowInProgress}
            />
        </>
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowInProgress: state.usersPage.isFollowInProgress
    }
};


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType> (mapStateToProps, {
    follow,
    unfollow,
    getUsers
})(UsersContainer); 
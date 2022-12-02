import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from './../common/Preloader/Preloader'
import { getPageSize, getUsersFromState } from '../../redux/users-selectors';

class UsersContainer extends React.Component {
    componentDidMount() { 
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => { 
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


let mapStateToProps = (state) => {
    return {
        users: getUsersFromState(state),
        pageSize: getPageSize(state),
        totalUserCount: state.usersPage.totalUserCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowInProgress: state.usersPage.isFollowInProgress
    }
};

export default connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers
})(UsersContainer); 
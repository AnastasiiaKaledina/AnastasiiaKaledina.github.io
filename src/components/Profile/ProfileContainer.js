import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, updateUserStatus, getUserStatus, uploadPhoto } from '../../redux/profile-reducer';
import { withRouter } from '../HOC/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {


    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);

    }
    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return <Profile {...this.props} />
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, uploadPhoto }),
    withRouter
)(ProfileContainer)
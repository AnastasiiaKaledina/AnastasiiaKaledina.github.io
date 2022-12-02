import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
    return (
        <div>
            <ProfileInfo isMe={!!props.router.params.userId} uploadPhoto={props.uploadPhoto} profile={props.profile} status={props.status} updateStatus={props.updateUserStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
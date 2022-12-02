import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhotoNull from '../../../assets/images/userPreviewWithoutPhoto.webp';


const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Preloader />
	}

	const takePhotoFromInput = (e) => {
		if (e.target.files.length) {
			props.uploadPhoto(e.target.files[0]);
		}
	}

	return (
		<div>
			<div className={classes.profileDescr}>
				{props.profile.photos.large ? <img src={props.profile.photos.large} /> : <img src={userPhotoNull} />}
				{props.isMe ||
					<div>
						<div>Изменить фото профиля</div>
						<div><input type='file' onChange={takePhotoFromInput} /></div>
					</div>
				}
				<br></br>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
				<br></br>
				<div><b className={classes.aboutMe}>Имя: </b>{props.profile.fullName}</div>
				<div><b className={classes.aboutMe}>Обо мне: </b>{props.profile.aboutMe || 'Нет информации'}</div>
				<div><b className={classes.aboutMe}>Ищу работу: </b>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</div>
			</div>
		</div>
	)
}

export default ProfileInfo;
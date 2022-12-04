import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhotoNull from '../../../assets/images/userPreviewWithoutPhoto.webp';
import { ProfileType } from '../../../redux/profile-reducer';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../common/FieldContainers/FieldContainers';




const ProfileInfo = (props) => {
	let [editMode, setEditMode] = useState(false);

	const onSubmit = (formData) => { 
		props.postDataProfile(formData).then(
			() => {
				setEditMode(false)
			}
		)
	}

	if (!props.profile) {
		return <Preloader />
	}

	const takePhotoFromInput = (e) => {
		if (e.target.files.length) {
			props.uploadPhoto(e.target.files[0]);
		}
	}

	return (
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
			{editMode
				? <ProfileInfoFormReduxForm initialValues={props.profile} contacts={props.profile.contacts} onSubmit={onSubmit} />
				: <ProfileData setEditMode={setEditMode} {...props} />
			}

		</div>
	)
}

const ProfileData = (props) => {
	return (
		<div>
			<div><b className={classes.aboutMe}>Имя: </b>{props.profile.fullName}</div>

			<div><b className={classes.aboutMe}>Ищу работу: </b>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</div>

			{
				props.profile.lookingForAJobDescription &&
				<div>
					<b className={classes.aboutMe}>Мой опыт: </b>{props.profile.lookingForAJobDescription}
				</div>
			}

			{
				props.profile.aboutMe &&
				<div>
					<div><b className={classes.aboutMe}>Обо мне: </b>{props.profile.aboutMe}</div>
				</div>
			}
			
			<div><b className={classes.aboutMe}>Мои контакты: </b>
				{
					Object
						.keys(props.profile.contacts)
						.map(key => props.profile.contacts[key] &&
							<div key={key} className={classes.contacts}>{key}: {props.profile.contacts[key]}</div>
						)
				}</div>

			{
				props.isMe || <button onClick={() => props.setEditMode(true)} className={classes.editProfileButton}>Редактировать профиль</button>
			}
		</div>
	)
}

const Contact = (contactTitle, contactValue) => {
	return <div>{contactTitle}: {contactValue}</div>
}

const ProfileInfoForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div><b>Имя</b>
				<Field placeholder={"Имя"} name={"fullName"} component={Input} />
			</div>
			<div><b>Ищу работу</b>
				<Field placeholder={"Ищите ли работу"} name={"lookingForAJob"} type={"checkbox"} component={Input} />
			</div>
			<div><b>Мой опыт</b>
				<Field placeholder={"Расскажите о своем опыте"} name={"lookingForAJobDescription"} component={Textarea} />
			</div>
			<div><b>Обо мне</b>
				<Field placeholder={"Имя"} name={"aboutMe"} component={Textarea} />
			</div>
			<div><b>Мои контакты: </b>
				{
					Object
						.keys(props.contacts)
						.map(key => {
							return (
								<div key={key} className={classes.contacts}>
									<b>{key}</b>
									<Field placeholder={key} name={'contacts.' + key} component={Input} />
								</div>
							)
						})}
			</div>

			{props.error && <div className={classes.formSummaryError}>{props.error}</div>}

			<button className={classes.editProfileButton}>Сохранить изменения</button>
		</form>
	)
}

const ProfileInfoFormReduxForm = reduxForm({
	form: 'profile'
})(ProfileInfoForm)

export default ProfileInfo;
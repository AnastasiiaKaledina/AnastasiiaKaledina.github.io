import React from 'react';
import Post from './Post/Post';
import classes from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form'
import { maxLength, required } from '../../common/Validate/Validate';
import { Textarea } from '../../common/FieldContainers/FieldContainers';


function MyPosts(props) {
	console.log("Render");
	const addPost = (value) => {
		console.log(value);
		props.onAddPost(value.newPostText);
	}

	let postElement = [...props.postData].reverse().map(item => <Post key={item.id} id={item.id} text={item.text} likes={item.likes} img={props.profile} />);

	return (
		<div className={classes.posts}>
			<h2>My posts</h2>
			<MyPostsReduxForm onSubmit={addPost} />
			<div className={classes.post}>
				{postElement}
			</div>
		</div>
	)
}

const maxLength15 = maxLength(15); 
const MyPostsForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div><Field name={"newPostText"} component={Textarea} validate={[required, maxLength15]} placeholder="Add your message" /></div>
			<div><button className={classes.addPost}>Add Post</button></div>
		</form>
	)
}



const MyPostsReduxForm = reduxForm({
	form: 'myPosts'
})(MyPostsForm)

export default MyPosts;
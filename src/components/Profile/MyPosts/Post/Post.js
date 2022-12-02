import React from 'react';
import classes from './Post.module.css';

function Post({ text, likes}) {
	
    return (
		<div className={classes.item}>
			 <div className={classes.avatar}></div>
			 {/* <div className={classes.avatar}><img src={myPhoto} /></div> */}
			{text}
			<div>{likes} likes</div>
		</div>
    )
}

export default Post;
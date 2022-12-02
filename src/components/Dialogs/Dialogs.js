import React from 'react';
import Names from './Names/Names';
import Message from './Message/Message';
import classes from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../common/FieldContainers/FieldContainers';
import { maxLength, required } from '../common/Validate/Validate';



function Dialogs(props) {
    
    const onSubmit = (formData) => {
        console.log(formData); 
        props.addMessageText(formData.message);
    }

    let nameElements = props.dialogsPage.nameData.map(item => <Names name={item.name} key={item.id} id={item.id}/>);
    let messageElements = props.dialogsPage.messageData.map(item => <Message text={item.text} key={item.id} />);

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsNames}>
                {nameElements}
            </div>

            <div className={classes.dialogsMessages}>
                {messageElements}
                <DialogsReduxForm onSubmit={onSubmit}/>
            </div>

		</div>
    )
}


const maxLength50 = maxLength(50);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.textarea}><Field placeholder='Enter youre message'
                                                            name={"message"} 
                                                            component={Textarea} 
                                                            validate={[required, maxLength50]}/></div>
            <button className={classes.addMessage}>Add message</button>
        </form>
    )
}

const DialogsReduxForm = reduxForm({
    form: 'dialogs'
})(DialogsForm)


export default Dialogs;
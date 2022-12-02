import { React } from 'react';
import styled from './FieldContainers.module.css';


export const Textarea = ({input, meta, ...props}) => { 
    const showError = meta.touched && meta.error;
    return (
        <div className={styled.formControl + " " + (showError && styled.error)}>
            <div><textarea {...props} {...input}/></div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => { 
    const showError = meta.touched && meta.error;
    return (
        <div className={styled.formControl + " " + (showError && styled.error)}>
            <div><input {...props} {...input}/></div>
            {showError && <span>{meta.error}</span>}
        </div>
    )
}


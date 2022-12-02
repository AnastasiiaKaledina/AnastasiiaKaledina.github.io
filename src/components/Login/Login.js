import React from "react";
import { Field, reduxForm } from 'redux-form'
import { postLogin, deleteLogin } from "../../redux/auth-reducer";
import { connect } from 'react-redux';
import { Input } from "../common/FieldContainers/FieldContainers";
import { required } from '../common/Validate/Validate';
import { Navigate } from 'react-router-dom';
import style from '../common/FieldContainers/FieldContainers.module.css';


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input} validate={required}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={required} type="password"/>
            </div>
            <div>
                <Field type={"checkbox"} name={"remember"} component={Input} /> remember me
            </div>
            {props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        let {login, password, remember} = formData;
        console.log(formData);
        props.postLogin(login, password, remember);
    }

    if (props.isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {postLogin, deleteLogin})(Login);
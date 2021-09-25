import React, {useContext, useState} from 'react';
import axios from 'axios';
import AppContext from '../../store/AppContext';
import {useHistory } from 'react-router';

import Input from '../UI/Input';
import Card from '../UI/Card';

import classes from './Login.module.css';

const Login = props => {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ email: "", password: ""});
    const [error, setError] = useState(null);
    const history = useHistory();

    const onChangeHandler = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value });
    };

    const submitHandler= async (e) => {
        e.preventDefault();

        try{
            const option = {
                method: "post",
                url: "/api/v1/auth/login",
                data: userInput,
            };
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem("token", token);
            dispatch({type: "CURRENT_USER", payload: {userName}});

            history.push("/");
        } catch (error){
            setError(error.response.data.message)
        }
    }

    return (
        <div className={classes.login}>
            <Card>
                <h3>Enter Your Account</h3>

                <form className={classes.form} onSubmit={submitHandler}>
                    <Input input={{
                        id: 'email',
                        type: "email",
                        name: "email",
                        required: true, 
                        placeholder: "Email",
                        value: userInput.email,
                        onChange: onChangeHandler
                    }} />
                    <Input input={{
                        id: 'password',
                        type: "password",
                        name: "password",
                        required: true, 
                        placeholder: "Password",
                        value: userInput.password,
                        onChange: onChangeHandler
                    }} />
                    <div className={classes.action}>
                        <button type="submit" className={classes["submit-btn"]}>Login</button>
                    </div>
                </form>
            </Card>
        </div>
    )

}

export default Login;
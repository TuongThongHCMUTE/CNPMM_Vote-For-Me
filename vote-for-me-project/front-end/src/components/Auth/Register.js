import React, { useContext, useState } from 'react';
import AppContext from '../../store/AppContext'
import { useHistory } from 'react-router';
import Card from '../UI/Card';
import Input from '../UI/Input';

import classes from './Register.module.css';
import axios from 'axios';

const Register = (props) => {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const onChangeHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: "post",
                url: "https://voteforgroup30-be.herokuapp.com/api/v1/auth/register",
                data: userInput
            };

            const response = await axios(option);
            const { token, userName, userId } = response.data.data;

            localStorage.setItem("token", token);
            dispatch({type: "CURRENT_USER", payload: {userName, userId}});
            
            history.push("/")
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    };

    return (
        <div className={classes.register}>
            <Card>
                <h3>Register New Account</h3>

                {errorMessage &&
                    (Array.isArray(errorMessage) ? (
                        errorMessage.map((err) => (
                            <div className={classes["error-message"]}>Error: {err}</div>
                        ))
                    ) : (
                        <div className={classes["error-message"]}>Error: {errorMessage}</div>
                    ))}

                <form className={classes.form} onSubmit={submitHandler}>
                    <Input input={{
                        id: 'username',
                        type: "text",
                        name: "name",
                        placeholder: "Name",
                        value: userInput.name,
                        onChange: onChangeHandler
                    }} />
                    <Input input={{
                        id: 'email',
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                        value: userInput.email,
                        onChange: onChangeHandler
                    }} />
                    <Input input={{
                        id: 'password',
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        value: userInput.password,
                        onChange: onChangeHandler
                    }} />
                    <div className={classes.action}>
                        <button type="submit" className={classes["submit-btn"]}>Register</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Register

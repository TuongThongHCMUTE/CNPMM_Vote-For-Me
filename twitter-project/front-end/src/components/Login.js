import React, {useContext, useState} from 'react'
import '../css/Auth.css'

import axios from 'axios'
import AppContext from './AppContext'
import {useHistory } from 'react-router'

export default function Login() {
    // Lay dispatch trong AppContext
    const {dispatch} = useContext(AppContext);
    // Thong tin nguoi dung nhap
    const [userInput, setUserInput] = useState({ email: "", password: ""});
    // Get error message
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    // Goi khi nguoi dung go thong tin --> cap nhat user input
    // e: event tuongw ung voi tung input
    const onChangeHandle = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value });
    };
    // Khi nguoi dung nhan submit
    const onSubmitHandle = async (e) => {
        try{
            e.preventDefault(); // Page se khong reload
            const option = {
                method: "post",
                url: "/api/v1/auth/login",
                data: userInput,
            };
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem("token", token);
            dispatch({type: "CURRENT_USER", payload: {userName}});
            // Dieu huong den homepage (/)
            history.push("/");
        } catch (error){
            // Nhan error va cap nhat len error message
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <section className="auth-container">
            <form className="auth-form" onSubmit={onSubmitHandle}>
                <h2>Enter Your Account</h2>
                {errorMessage && (
                    <div className="error-message">Error: {errorMessage}</div>
                )}
                <input
                    type="email"
                    name="email"
                    id=""
                    required
                    placeholder="Email"
                    value={userInput.email}
                    onChange={onChangeHandle}
                />
                <input
                    type="password"
                    name="password"
                    id=""
                    required
                    placeholder="Password"
                    value={userInput.password}
                    onChange={onChangeHandle}
                />
                <button className="btn" type="submit">Login</button>
            </form>
        </section>
    )
}

import React, { SyntheticEvent, useState } from 'react';
import logo from "../../logo.svg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "./LoginForm";
import AuthenticatorForm from "../auth/AuthenticatorForm";
import {useDispatch} from "react-redux";
import { setAuth } from '../../redux/authSlice';

const Login = () => {
    //dispatch for user success
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState<{
        id: number;
        secret?: string;
        otpauth?: string;
    }>({
        id: 0
    });

    const success = () => {
        setRedirect(true);
        //redux dispatch state slice
        dispatch(setAuth(true));
    }

    if (redirect) {
        return <Navigate to={'/'}/>;
    }

    let form;
    if(loginData?.id === 0){
      form =  <LoginForm loginData={setLoginData} />
    } else {
      //auth two factor
      form = <AuthenticatorForm loginData={loginData} success={success}/>
    }

    return (
        <main className="form-signin">
            { form }
        </main>
    );
};

export default Login;
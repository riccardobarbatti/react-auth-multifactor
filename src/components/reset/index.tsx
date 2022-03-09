import React, {SyntheticEvent, useState} from 'react';
import logo from "../../logo.svg";
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";

const Reset = () => {
    const [password, setPassword] = useState('');
    const [repasswd, setRepasswd] = useState('');
    const [redirect, setRedirect] = useState(false);
    //1 production
    //pass token address - http://localhost:3000/reset/6bj40916ef
     const {token} = useParams();
    //2 development
    //force small token for testing
    //const token = '6bj40916ef';


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('reset', {
                token,
                password,
                password_confirm: repasswd
            });
            //console.log(`TOKEN: ${token}`);
            setRedirect(true);
        }

    if (redirect) {
        return <Navigate to='/login'/>;
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <img className="mb-3 center-block" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Reset your password</h1>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="new password" required
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingRePassword" placeholder="confirm new password" required
                           onChange={e => setRepasswd(e.target.value)}/>
                    <label htmlFor="floatingPassword">Confirm password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
                <p className="mt-5 mb-3 text-muted">&copy; React Auth app 2022</p>
            </form>
        </main>
    );
};

export default Reset;
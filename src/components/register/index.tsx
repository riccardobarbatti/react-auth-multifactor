import React, { SyntheticEvent, useState } from 'react';
import logo from "../../logo.svg";
import {Navigate, Link} from "react-router-dom";
import axios from "axios";

const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('auth/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirm: passwordConfirm
        }).then(() => {
            console.log('---->register ok!');
            setRedirect(true);
        })
            .catch((error) => {
                console.log('---->wrong')
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the rang\e of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

    }

    if (redirect) {
        return <Navigate to={'/login'}/>;
    }

   //------------
    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <img className="mb-3 center-block" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <div className="form-floating">
                    <input type="firstname" className="form-control" id="floatingInput" placeholder="First Name" required
                           onChange={e => setFirstName(e.target.value)}/>
                    <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input type="lastname" className="form-control" id="floatingInput" placeholder="Last Name" required
                           onChange={e => setLastName(e.target.value)}/>
                    <label htmlFor="floatingInput">Last Name</label>
                </div>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Password Confirm" required
                           onChange={e => setPasswordConfirm(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password Confirm</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                <p className="mt-5 mb-3 text-muted">&copy; React Auth app 2022</p>
            </form>
        </main>
    );
};

export default Register;
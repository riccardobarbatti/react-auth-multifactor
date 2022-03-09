import React, {SyntheticEvent, useState} from 'react';
import logo from "../../logo.svg";
import {Link} from "react-router-dom";
import axios from "axios";

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message:''
    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('forgot', {email});
            setNotify({
                show: true,
                error: false,
                message: 'Please check your email!'
            });
        } catch (error) {
            setNotify({
                show: true,
                error: true,
                message: 'Error!'
            });
        }


    }
    //set pop up forgot password
    let info;
    if(notify.show) {
        info = <div className={notify.error ? 'alert alert-danger' :'alert alert-success'} role='alert'>
            {notify.message}
        </div>

    }
    return (
        <main className="form-signin">
            {info}
            <form onSubmit={submit}>
                <img className="mb-3 center-block" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Forgot Password</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
                <p className="mt-5 mb-3 text-muted">&copy; React Auth app 2022</p>
            </form>
        </main>
    );
};

export default Forgot;
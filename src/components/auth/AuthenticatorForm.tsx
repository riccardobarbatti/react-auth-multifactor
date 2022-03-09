import React, {ReactElement, SyntheticEvent, useEffect, useState} from 'react';
import logo from "../../logo.svg";
import axios from "axios";
import qrcode from 'qrcode';

const AuthenticatorForm = (props: {
    loginData: {
      id: number;
      secret?: string;
      otpauth_url?: string;
     },
    success: Function
    }) => {
    const [code, setCode] = useState('');
    //image qrcode
    const [img, setImage] = useState<ReactElement | null>(null);

    //check qrcode
    useEffect(() => {

        if(props.loginData.otpauth_url) {
            qrcode.toDataURL(props.loginData.otpauth_url, (err, data) => {
               setImage(<img src={data} style={{width: '100%'}} />)
            })
        }

    }, [props.loginData.otpauth_url])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        //post auth two factor
        const { data, status } = await axios.post('auth/two-factor', {
            ...props.loginData,
            code
        }, { withCredentials: true });

        //catch Token
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        //check status post
        if(status === 200){
          props.success();
        }
    }

    return <>
        <form onSubmit={submit}>
            <img className="mb-3 center-block" src={logo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please insert your authenticator code</h1>

            <div className="form-floating">
                <input className="form-control" id="floatingInput" placeholder="digit code" required
                       onChange={e => setCode(e.target.value)}/>
                <label htmlFor="floatingInput">6 digits code</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
            <p className="mt-5 mb-3 text-muted">&copy; React Auth app 2022</p>
        </form>

        { img }
    </>
};

export default AuthenticatorForm;
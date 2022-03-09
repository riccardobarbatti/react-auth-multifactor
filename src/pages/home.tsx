import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../redux/authSlice";
import {RootState} from "../redux/store";

const Home = () => {
    //dispatch redux for logout
    const dispatch = useDispatch();
    const [message, setMessage] = useState('not logged in');
    //redux auth selector from store
    const auth = useSelector((state: RootState) => state.auth.value );

    //const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (async () =>{
            try {
                const { data } = await axios.get('auth/user');
                setMessage(`Hi ${data.first_name} ${data.last_name}`);
                dispatch(setAuth(true));
               // setRedirect(false);
            } catch (error) {
                setMessage(`You're not Authenticated!`);
                dispatch(setAuth(false));
            }
       })();
    }, []);


    // if (redirect) {
    //     return <Navigate to={'/login'}/>;
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await axios.get('auth/user');
    //             setMessage(`Hi ${data.first_name} ${data.last_name}`);
    //
    //             //setData(response);
    //         } catch (error) {
    //             console.error(error)
    //             setMessage(`not logged in`);
    //
    //         }
    //        // setLoading(false);
    //     };
    //
    //     fetchData();
    // }, []);


    return (
        <div>
            <h2>{auth ? message : 'You are not Authenticated'}</h2>
        </div>
    );
};

export default Home;
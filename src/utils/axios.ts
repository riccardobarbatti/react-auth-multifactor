import axios from 'axios';
import { API_URL } from "./url";

//set Axios Path
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

//set switch var loop call refresh token
let refresh = false;

//interceptors
axios.interceptors.response.use(resp => resp, async error => {
   //Bad request
    if(error.response.status === 401 && !refresh) {
        //set refresh var
        refresh = true;
       //refresh token
       const response = await axios.post('auth/refresh', {}, {withCredentials: true});
       //OK
       if (response.status === 200) {
           axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

           return axios(error.config);
       }
   }
    //set refresh var
    refresh = false;
    return error;

});
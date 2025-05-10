import axios from "axios";

import authToken from "./global_dcl.js";

const net=axios.create({
    baseURL:"http://localhost:3000",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true
});



net.interceptors.request.use((config)=>{

        config.headers["Authorization"]=`Bearer ${authToken.token}`;

        return config;

},(error)=>{

return Promise.reject(error);

});



net.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log("Unauthorized!");
        }
        return Promise.reject(error);
    }
);

export default net;
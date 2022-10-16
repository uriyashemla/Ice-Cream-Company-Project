import axios from "axios";

const URL = 'http://localhost:3003'
export const getAllCities = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${URL}/api/getCitiesList`).then((result)=>{resolve(result.data)}).catch(reject)
    })
};

import axios from "axios";

const URL = 'http://localhost:3002'



export const getAllTastes = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${URL}/api/getTastes`).then((result)=>{resolve(result.data)}).catch(reject)
    })
};

export const getAllInventory = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${URL}/api/getAllInventory`).then((result)=>{resolve(result.data)}).catch(reject)
    })
};

export const getStoreInventory = (cityName) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${URL}/api/getStoreInventory/${cityName}`).then((result)=>{resolve(result.data)}).catch(reject)
    })
};
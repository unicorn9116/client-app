import axios from 'axios';
import { CONSTANT_VAR } from './constants';

export const apiCalls = async (method, api) => {

    if(method === "get"){
        // GET request using axios with set headers
        const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
        };
        const response = await axios.get(CONSTANT_VAR.baseUrl+api, { headers });
        return response;
    }
    if(method === "post"){
        // GET request using axios with set headers
        const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
        };
        const response = await axios.post(CONSTANT_VAR.baseUrl+api, { headers });
        return response;
    }
    return null;
}
import axios from 'axios';
import { handleResponse } from './handleResponse';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

export async function postRequest(url, history, params = null) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(url, params, {
            headers: {
                Authorization: token,
            }
        });
        return res.data;
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}

export async function postRequestUnauthorized(url, history, params = null) {
    try {
        const res = await axios.post(url, params);
        return res.data;
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}

export async function getRequest(url, history) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(url, {
            headers: {
                Authorization: token,
            }
        });
        return res.data;
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}

export async function getRequestUnauthorized(url, history) {
    try {
        const res = await axios.get(url);
        return res.data;
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}

export async function postFileUnauthorized(url, formData, history) {
    try {
        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}

export async function getDownloadFile(url, fileName, history) {
    try {
        const fullUrl = axios.defaults.baseURL + url;
        console.log('fullUrl', fullUrl);
        const link = document.createElement('a');
        link.href = fullUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
    catch (error) {
        console.log('error', error);
        handleResponse(error.response, history);
    }
}
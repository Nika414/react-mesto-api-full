export const BASE_URL = 'http://localhost:3000/';

export const registerApi = (password, email) => {
    return fetch(`${BASE_URL}signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
}; 

export const loginApi =(password, email) => {
    return fetch(`${BASE_URL}signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email })
    });    
}; 



export const getContent =(jwt) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${jwt}`
        }
    })     
}; 


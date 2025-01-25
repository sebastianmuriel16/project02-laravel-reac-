import customFetch  from "../fetch.client.js";

async function signupUser(payload){
    const response = await customFetch('/singup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return response;
}

export { signupUser }
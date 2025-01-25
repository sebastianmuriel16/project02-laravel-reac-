
import { useRef, useState } from "react";
import { useUsersContext } from "../contexts/UsersContext";
import customFetch from "../fetch.client.js";

function useLogin() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser,handleToken} = useUsersContext();


    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        const handleLogin = async () => {
            try{
                const response = await customFetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const { user, token, message } = response;   
                setUser(user);
                handleToken(token);
                setErrors(message);
            }
            catch(error){
                console.error(error);
            }

        }
        handleLogin();        
    }

    return {
        emailRef,
        passwordRef,
        onSubmit,
        errors     
    }


}

export { useLogin };
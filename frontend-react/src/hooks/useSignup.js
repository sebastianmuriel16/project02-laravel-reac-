import { useRef, useState } from "react";
import { useUsersContext } from "../contexts/UsersContext";
import customFetch from "../fetch.client.js";


function useSignup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {setUser,handleToken} = useUsersContext();
    const [errors, setErrors] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmRef.current.value
        }
        const handleSignup = async () => {
            try {
                const response = await customFetch('/signup', {
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
            } catch (error) {
                console.error(error);
            }
        };

        handleSignup();

    }

    return { nameRef, emailRef, passwordRef, passwordConfirmRef, onSubmit, errors };
}

export { useSignup };
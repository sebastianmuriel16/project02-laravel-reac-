import customFetch from "../fetch.client";
import { useUsersContext } from "../contexts/UsersContext";
import { useEffect } from "react";
function useUser() {
    const { user, token, setUser, handleToken } = useUsersContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await customFetch("/user");
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [setUser]);

    const onLogout = async () => {
        try {
            await customFetch("/logout", { 
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
             });
            setUser({});
            handleToken(null);
        } catch (error) {
            console.error(error);
        }
    };


    return { user, token, setUser, onLogout };
}

export { useUser };
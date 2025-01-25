import { createContext, useContext, useState } from "react";

const UsersContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

const UsersProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, setNotification] = useState("");
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function handleNotification(message) {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000);
    }
    function handleToken(token) {
        setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
    return (
        <UsersContext.Provider
            value={{
                user,
                token,
                setUser,
                handleToken,
                notification,
                handleNotification,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
};

const useUsersContext = () => useContext(UsersContext);

export { useUsersContext, UsersProvider };

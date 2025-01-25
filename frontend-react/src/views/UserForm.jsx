import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useUsersContext } from "../contexts/UsersContext";
import customFetch from "../fetch.client";

function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const { handleNotification } = useUsersContext();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (id) {
            const getUser = async () => {
                try {
                    const response = await customFetch(`/users/${id}`, {
                        method: "GET",
                    });
                    const data = await response.user;
                    setTimeout(() => setLoading(false), 1000);
                    setUser(data);
                    setErrors(data.message);
                } catch (error) {
                    console.error(error);
                }
            };
            getUser();
        }
        setTimeout(() => setLoading(false), 1000);
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            const response = await customFetch(`/users/${user.id}/edit`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = response;
            setErrors(data.errors);
            if (data.errors) {
                return;
            }
            handleNotification("User was successfully updated");
            navigate("/users");
        } else {
            const response = await customFetch("/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = response;
            setErrors(data.errors);
            if (data.errors) {
                return;
            }
            handleNotification("User was successfully created");
            navigate("/users");
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            {id ? <h1>Update User</h1> : <h1>Create User</h1>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        <h1>Loading...</h1>
                    </div>
                )}
                {errors && (
                    <div className="alert">
                        <h1>Error</h1>
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            value={user.name}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={user.email}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />
                        <button className="btn" type="submit">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}

export { UserForm };

import { useState, useEffect } from "react";
import customFetch from "../fetch.client";
import { Link } from "react-router";
import { useUsersContext } from "../contexts/UsersContext";
function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleNotification } = useUsersContext();

    const styles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
    };

    const getUsers = async () => {
        try {
            const response = await customFetch("/users");
            const data = await response.users;
            setTimeout(() => setLoading(false), 1000);
            setUsers(data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const onDelete = async (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            await customFetch(`/users/${user.id}`, {
                method: "DELETE",
            });
            setLoading(true);
            handleNotification("User was successfully deleted");
            getUsers();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div style={styles}>
                <h1>Users</h1>
                <Link className="btn-add" to="/users/new">
                    add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <h1>Loading...</h1>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {new Date(
                                                user.created_at
                                            ).toDateString()}
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "1rem",
                                                }}
                                            >
                                                <Link
                                                    className="btn-edit"
                                                    to={`/users/${user.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        onDelete(user)
                                                    }
                                                    className="btn-delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
}

export default Users;

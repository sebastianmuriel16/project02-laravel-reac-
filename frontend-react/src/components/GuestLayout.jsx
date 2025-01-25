import { Outlet, Navigate } from "react-router";
import { useUsersContext } from "../contexts/UsersContext";

function GuestLayout() {
    const { token } = useUsersContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
}

export { GuestLayout };

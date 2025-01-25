import { Outlet } from "react-router";
import { useUser } from "../hooks/useUser";
import { Navigate, Link } from "react-router";
import { useUsersContext } from "../contexts/UsersContext";
function DefaultLayout() {
    const { user, token, onLogout } = useUser();
    const { notification } = useUsersContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>

                    <div>
                        {user.name}
                        <a className="btn-logout" onClick={onLogout}>
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}

export { DefaultLayout };

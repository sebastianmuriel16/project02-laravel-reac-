import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";
function Login() {
    const { onSubmit, emailRef, passwordRef, errors } = useLogin();
    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        {errors && (
                            <div className="alert">
                                <h1>Error</h1>
                                <p>{errors}</p>
                            </div>
                        )}
                        <h1 className="title">Login in to your account</h1>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <button className="btn btn-block">Login</button>
                        <p className="message">
                            Not registered?
                            <Link to="/signup"> Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;

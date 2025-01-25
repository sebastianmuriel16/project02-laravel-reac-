import { Link } from "react-router";
import { useSignup } from "../hooks/useSignup";
function Signup() {
    const {
        nameRef,
        emailRef,
        passwordRef,
        passwordConfirmRef,
        onSubmit,
        errors,
    } = useSignup();

    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">Create your account</h1>
                        {errors && (
                            <div className="alert">
                                <h1>Error</h1>
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors[key][0]}</p>
                                ))}
                            </div>
                        )}

                        <input
                            ref={nameRef}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            ref={passwordConfirmRef}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button className="btn btn-block">Sign Up</button>
                        <p className="message">
                            Already registered?
                            <Link to="/login"> Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;

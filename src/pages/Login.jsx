import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserAuth from "../firebase/UserAuth";

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState({
        email: "",
        password: "",
    });

    const { setAuthState } = useContext(AuthContext);

    const gotoRegister = () => {
        navigate("/register");
    };

    // Handling input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!userData.email || !userData.password) {
            setErrorMsg(() => {
                return {
                    email: !userData.email && "This field is required",
                    password: !userData.password && "This field is required",
                };
            });
            return false;
        } else {
            setErrorMsg(() => {
                return {
                    email: "",
                    password: "",
                };
            });
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let isLoggedIn = await UserAuth.login(userData);
            if (isLoggedIn) {
                setAuthState((auth) => {
                    return { ...auth, isAuthenticated: true };
                });
                navigate("/");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 md:p-0">
            <div className="border-darkBorder my-8 w-full rounded-xl border bg-cardLight px-4 py-8 text-textLight shadow-lg dark:bg-cardDark dark:text-textDark sm:w-[400px] md:p-8">
                <p className="pb-8 text-center text-3xl font-bold leading-8">
                    Login
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onInput={handleChange}
                            autoComplete="current-email"
                            className="input-style"
                        />
                        <span className="email-error">{errorMsg.email}</span>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onInput={handleChange}
                            autoComplete="current-email"
                            className="input-style"
                        />
                        <span className="password-error">
                            {errorMsg.password}
                        </span>
                    </div>
                    <button
                        className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
                        type="submit"
                    >
                        Log in
                    </button>
                </form>
                <p className="pt-4 text-center">
                    {"Don't have an account? "}
                    <a
                        rel="noopener noreferrer"
                        onClick={gotoRegister}
                        className="cursor-pointer font-bold text-primary"
                    >
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

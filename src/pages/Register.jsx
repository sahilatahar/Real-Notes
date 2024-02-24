import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImgTemp from "../assets/profile.png";
import UserAuth from "../firebase/UserAuth";
import { dismissToast, showToast } from "../utils/toast";

function Register() {
    // State variables and Hooks
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        image: null,
        imgURL: profileImgTemp,
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMsg, setErrorMsg] = useState({
        fName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const gotoLogin = () => {
        navigate("/login");
    };

    // Handling input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        let image = e.target.files[0];
        if (!image) return;
        const imageSize = Math.round(image.size / 1024);
        if (imageSize > 1024 * 2) {
            dismissToast();
            showToast("info", "Image size should be less than 2 MB");
            return;
        }

        setUserData({
            ...userData,
            image: image,
            imgURL: URL.createObjectURL(image),
        });
    };

    const validateForm = () => {
        if (
            !userData.email ||
            !userData.password ||
            !userData.confirmPassword ||
            !userData.fName
        ) {
            setErrorMsg((pre) => {
                return {
                    ...pre,
                    fName: !userData.fName && "This field is required",
                    email: !userData.email && "This field is required",
                    password: !userData.password && "This field is required",
                    confirmPassword:
                        !userData.confirmPassword && "This field is required",
                };
            });
            return false;
        } else {
            setErrorMsg((pre) => {
                return {
                    ...pre,
                    fName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                };
            });

            if (userData.password !== userData.confirmPassword) {
                showToast(
                    "info",
                    "Password and Confirm Password should be same",
                );
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            let isSignUp = await UserAuth.signUp(userData);
            if (isSignUp) {
                navigate("/");
            }
        }
    };

    return (
        <div className="flex max-h-screen justify-center overflow-auto p-4 md:p-8">
            <div className="border-darkBorder h-fit rounded-xl border bg-cardLight px-4 py-8 text-textLight shadow-lg dark:bg-cardDark dark:text-textDark sm:w-[400px] md:p-8">
                <p className="pb-8 text-center text-3xl font-bold leading-8">
                    Signup
                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="relative m-auto w-[40%]">
                        <label htmlFor="image">
                            <img
                                src={userData.imgURL}
                                alt="User image"
                                className="mx-auto block aspect-square h-auto w-full max-w-full cursor-pointer rounded-md object-cover"
                            />
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex gap-6">
                        <div className="w-1/2 pt-2 text-base leading-5">
                            <input
                                type="text"
                                name="fName"
                                id="fName"
                                placeholder="First Name"
                                onInput={handleChange}
                                className="input-style"
                            />
                            <span className="fName-error">
                                {errorMsg.fName}
                            </span>
                        </div>
                        <div className="w-1/2 pt-2 text-base leading-5">
                            <input
                                type="text"
                                name="lName"
                                id="lName"
                                placeholder="Last Name"
                                onInput={handleChange}
                                className="input-style"
                            />
                        </div>
                    </div>

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

                    <div className="input-group">
                        <input
                            type="text"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onInput={handleChange}
                            className="input-style"
                        />
                        <span className="confirmPassword-error">
                            {errorMsg.confirmPassword}
                        </span>
                    </div>

                    <button
                        className="flex w-full items-center justify-center rounded-md bg-primary py-3 text-white"
                        type="submit"
                    >
                        Sign up
                    </button>
                </form>
                <p className="pt-4 text-center">
                    Already have an account?{" "}
                    <a
                        rel="noopener noreferrer"
                        onClick={gotoLogin}
                        className="cursor-pointer font-bold text-primary"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;

import { useContext, useEffect, useRef, useState } from "react";
import tempProfileImage from "../assets/profile.png";
import AuthContext from "../context/AuthContext";
import UserAuth from "../firebase/UserAuth";
import { dismissToast, showToast } from "../utils/toast";
import { useTranslation } from "react-i18next";

function Profile() {
    const [userData, setUserData] = useState({
        fName: "",
        lName: "",
        email: "",
        newPassword: "",
        confirmNewPassword: "",
        imgURL: tempProfileImage,
    });
    const inputFileRef = useRef(null);

    const { authState, setAuthState } = useContext(AuthContext);
    const { t } = useTranslation();
    const { btnLabel, description, label, title } = t("Profile");

    useEffect(() => {
        if (authState.isAuthenticated && authState.user === null) {
            dismissToast();
            showToast("loading", "Loading profile data...");
            const fetchUserData = async () => {
                let user = await UserAuth.getUserData();
                let imgUrl = await UserAuth.getImageURL();
                if (imgUrl === null) {
                    dismissToast();
                    showToast("error", "Error loading image");
                }
                const userInfo = {
                    fName: user.fName || "",
                    lName: user.lName || "",
                    email: user.email || "",
                    imgURL: imgUrl || "",
                };
                setUserData((userData) => {
                    return {
                        ...userData,
                        ...userInfo,
                    };
                });

                setAuthState((data) => {
                    return { ...data, user: userInfo };
                });
                dismissToast();
            };
            fetchUserData();
        } else {
            setUserData((userData) => {
                return {
                    ...userData,
                    ...authState.user,
                };
            });
        }
    }, [authState.isAuthenticated, setAuthState, authState]);

    const changePassword = async () => {
        if (userData.newPassword === "" || userData.confirmNewPassword === "") {
            dismissToast();
            showToast("error", "Password cannot be empty");
        }
        if (userData.newPassword !== userData.confirmNewPassword) {
            dismissToast();
            showToast("error", "Passwords do not match");
            return;
        }
        await UserAuth.changePassword(userData.newPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = async (e) => {
        const image = e.target.files[0];

        if (!image) return;
        const imageSize = Math.round(image.size / 1024);
        if (imageSize > 1024 * 2) {
            dismissToast();
            showToast("info", "Image size should be less than 2 MB");
            return;
        }
        setUserData({
            ...userData,
            imgURL: URL.createObjectURL(image),
            image: image,
        });
        await UserAuth.updateImage(userData.image);
        setAuthState((data) => {
            return { ...data, user: { ...data.user, imgURL: userData.imgURL } };
        });
    };

    const updateImage = () => {
        inputFileRef.current.click();
    };

    const updateName = async () => {
        if (userData.fName === "") {
            dismissToast();
            showToast("error", "First Name cannot be empty");
            return;
        }
        await UserAuth.updateName(userData);
        setAuthState((data) => {
            return { ...data, user: { ...data.user, ...userData } };
        });
    };

    const sendResetEmail = async () => {
        await UserAuth.sendResetPasswordEmail(userData.email);
    };

    const deleteUserAccount = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete you account?",
        );
        if (!isConfirmed) return;
        let isDeleted = await UserAuth.deleteAccount();
        if (isDeleted) {
            localStorage.removeItem("userID");
            setAuthState((data) => {
                return { ...data, isAuthenticated: false };
            });
        }
    };

    const handleImageLoadError = () => {
        setUserData((userData) => {
            return {
                ...userData,
                imgURL: tempProfileImage,
            };
        });
    };

    return (
        <div className="flex max-h-screen flex-grow flex-col items-center gap-6 overflow-y-scroll px-4 py-8 pb-[4.5rem] sm:p-10 md:pb-8 lg:flex-row lg:items-start lg:justify-center">
            <div className="w-[250px] rounded-2xl bg-cardLight p-4 shadow-lg dark:bg-cardDark md:p-4">
                <img
                    src={userData.imgURL}
                    alt="User Image"
                    className="block aspect-square w-full max-w-full rounded-xl object-cover"
                    onError={handleImageLoadError}
                />
                <button
                    className="mt-4 w-full rounded-md bg-primary p-2 text-white"
                    onClick={updateImage}
                >
                    {btnLabel.changeImg}
                </button>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={inputFileRef}
                />
            </div>
            <main className="flex w-full flex-col gap-8 rounded-xl bg-bgLight dark:bg-bgDark lg:w-2/3">
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark">
                    <h1 className="section-heading">{title.personalInfo}</h1>
                    <div className="flex flex-col justify-start gap-4 sm:flex-row">
                        <div className="flex flex-grow flex-col gap-1">
                            <label htmlFor="fName">{label.fName}</label>
                            <input
                                type="text"
                                name="fName"
                                id="fName"
                                onInput={handleChange}
                                value={userData.fName}
                                className="input-style"
                            />
                        </div>
                        <div className="flex flex-grow flex-col gap-1">
                            <label htmlFor="lName">{label.lName}</label>
                            <input
                                type="text"
                                name="lName"
                                id="lName"
                                onInput={handleChange}
                                value={userData.lName}
                                className="input-style"
                            />
                        </div>
                    </div>
                    <button className="submit-btn" onClick={updateName}>
                        {btnLabel.updateName}
                    </button>
                </section>
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark ">
                    <h2 className="section-heading">{title.changePass}</h2>
                    <div className="flex flex-col justify-start gap-6 sm:flex-row">
                        <div className="flex flex-grow flex-col gap-1">
                            <label htmlFor="newPassword">{label.newPass}</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                onInput={handleChange}
                                value={userData.newPassword}
                                className="input-style"
                            />
                        </div>
                        <div className="flex flex-grow flex-col gap-1">
                            <label htmlFor="confirmNewPassword">
                                {label.confirmPass}
                            </label>
                            <input
                                type="text"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                onInput={handleChange}
                                value={userData.confirmNewPassword}
                                className="input-style"
                            />
                        </div>
                    </div>
                    <button className="submit-btn" onClick={changePassword}>
                        {btnLabel.changePass}
                    </button>
                </section>
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark ">
                    <h2 className="section-heading">{title.resetPass}</h2>
                    <button className="submit-btn" onClick={sendResetEmail}>
                        {btnLabel.resetEmail}
                    </button>
                </section>
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark ">
                    <h2 className="section-heading text-danger">
                        {title.dangerZone}
                    </h2>
                    <p>{description.delete}</p>
                    <button
                        className="submit-btn bg-danger text-white"
                        onClick={deleteUserAccount}
                    >
                        {btnLabel.deleteAcc}
                    </button>
                </section>
            </main>
        </div>
    );
}

export default Profile;

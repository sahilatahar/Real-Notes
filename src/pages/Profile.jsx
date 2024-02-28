import { useEffect, useRef, useState } from "react";
import tempProfileImage from "../assets/profile.jpg";
import UserAuth from "../firebase/UserAuth";
import { dismissToast, showToast } from "../utils/toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchUserData,
    selectUser,
    setAuthState,
    setUserData,
} from "../app/reducers/userSlice";
import User from "../firebase/User";
import { LoadingFull } from "../components/Loading";

function Profile() {
    const user = useSelector(selectUser);
    const [userState, setUserState] = useState({
        fName: "",
        lName: "",
        email: "",
        newPassword: "",
        confirmNewPassword: "",
        photoURL: tempProfileImage,
    });
    const inputFileRef = useRef(null);
    const { t } = useTranslation();
    const { btnLabel, description, label, title } = t("Profile");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.photoURL === undefined) {
            dismissToast();
            dispatch(fetchUserData());
        } else {
            setUserState((pre) => {
                return {
                    ...pre,
                    email: user.email,
                    fName: user.fName,
                    lName: user.lName,
                    photoURL: user.photoURL,
                };
            });
            setLoading(false);
        }
    }, [dispatch, user]);

    const changePassword = async () => {
        if (
            userState.newPassword === "" ||
            userState.confirmNewPassword === ""
        ) {
            dismissToast();
            showToast("error", "Password cannot be empty");
        }
        if (userState.newPassword !== userState.confirmNewPassword) {
            dismissToast();
            showToast("error", "Passwords do not match");
            return;
        }
        await UserAuth.changePassword(userState.newPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserState({ ...userState, [name]: value });
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
        const photoURL = await UserAuth.updateImage(image);
        const updatedUserData = { ...user, photoURL };
        setUserState({ ...userState, photoURL });
        dispatch(setUserData({ ...user, photoURL }));
        await User.updateUserData(updatedUserData);
    };

    const updateImage = () => {
        inputFileRef.current.click();
    };

    const updateName = async () => {
        if (userState.fName === "") {
            dismissToast();
            showToast("error", "First Name cannot be empty");
            return;
        }
        await UserAuth.updateName(userState);
        const updatedUserData = {
            ...user,
            fName: userState.fName,
            lName: userState.lName,
        };
        dispatch(setUserData(updatedUserData));
        await User.updateUserData(updatedUserData);
    };

    const sendResetEmail = async () => {
        await UserAuth.sendResetPasswordEmail(userState.email);
    };

    const deleteUserAccount = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete you account?",
        );
        if (!isConfirmed) return;
        let isDeleted = await UserAuth.deleteAccount();
        if (isDeleted) {
            dispatch(setAuthState(false));
        }
    };

    const handleImageLoadError = () => {
        setUserState({
            ...userState,
            photoURL: tempProfileImage,
        });
    };

    if (loading) return <LoadingFull />;

    return (
        <div className="flex max-h-screen flex-grow flex-col items-center gap-6 overflow-y-scroll px-4 py-8 pb-[4.5rem] sm:p-10 md:pb-8 lg:flex-row lg:items-start lg:justify-center">
            <div className="w-[250px] rounded-2xl bg-cardLight p-4 shadow-lg dark:bg-cardDark md:p-4">
                <img
                    src={userState.photoURL}
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
                                onChange={handleChange}
                                value={userState.fName}
                                className="input-style"
                            />
                        </div>
                        <div className="flex flex-grow flex-col gap-1">
                            <label htmlFor="lName">{label.lName}</label>
                            <input
                                type="text"
                                name="lName"
                                id="lName"
                                onChange={handleChange}
                                value={userState.lName}
                                className="input-style"
                            />
                        </div>
                    </div>
                    <button className="button self-start" onClick={updateName}>
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
                                onChange={handleChange}
                                value={userState.newPassword}
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
                                onChange={handleChange}
                                value={userState.confirmNewPassword}
                                className="input-style"
                            />
                        </div>
                    </div>
                    <button
                        className="button self-start"
                        onClick={changePassword}
                    >
                        {btnLabel.changePass}
                    </button>
                </section>
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark ">
                    <h2 className="section-heading">{title.resetPass}</h2>
                    <button
                        className="button self-start"
                        onClick={sendResetEmail}
                    >
                        {btnLabel.resetEmail}
                    </button>
                </section>
                <section className="flex flex-col gap-4 rounded-xl bg-cardLight p-6 shadow-lg dark:bg-cardDark ">
                    <h2 className="section-heading text-danger">
                        {title.dangerZone}
                    </h2>
                    <p>{description.delete}</p>
                    <button
                        className="button self-start bg-danger text-white"
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

import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateProfile,
} from "firebase/auth";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import profileImgTemp from "../assets/profile.jpg";
import { dismissToast, showToast } from "../utils/toast";
import { app, storage } from "./";
import FirebaseNote from "./FirebaseNote";
import User from "./User";

class UserAuth {
    constructor() {
        this.uid = "";
        this.auth = getAuth(app);
        this.storageRef = ref(storage);

        onAuthStateChanged(this.auth, async (user) => {
            if (user) {
                this.uid = user.uid;
            }
        });
    }

    signUp = async (userData) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(
                this.auth,
                userData.email,
                userData.password,
            );

            const user = userCredential.user;
            this.uid = user.uid;

            // Upload profile image
            if (userData.image === null) {
                const response = await fetch(profileImgTemp);
                const blob = await response.blob();
                const file = new File([blob], "profile.jpg", {
                    type: blob.type,
                    lastModified: new Date().getTime(),
                });
                await uploadBytes(
                    ref(this.storageRef, `users/${user.uid}/profile.jpg`),
                    file,
                );
            } else {
                dismissToast();
                showToast("loading", "Uploading profile image...");
                let imageRef = ref(
                    this.storageRef,
                    `users/${user.uid}/profile.jpg`,
                );
                await uploadBytesResumable(imageRef, userData.image);
            }

            // Upload additional user info
            if (user !== null) {
                let photoURL = await getDownloadURL(
                    ref(this.storageRef, "users/" + user.uid + "/profile.jpg"),
                );
                await updateProfile(user, {
                    displayName: `${userData.fName.trim()} ${userData.lName.trim()}`,
                    photoURL: photoURL,
                });
                const userDetails = {
                    email: userData.email,
                    fName: userData.fName,
                    lName: userData.lName,
                    photoURL: photoURL,
                    theme: "light",
                    lang: "en",
                };
                await User.setUserData(userDetails, user.uid);
            }
            return true;
        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    dismissToast();
                    showToast("error", "Email already in use");
                    break;
                case "auth/invalid-email":
                    dismissToast();
                    showToast("error", "Invalid Email.");
                    break;
                case "auth/operation-not-allowed":
                    console.log(`Error during sign up.`, error);
                    break;
                case "auth/weak-password":
                    dismissToast();
                    showToast(
                        "error",
                        "Password is not strong enough. Add additional characters including special characters and numbers.",
                    );
                    break;
                default:
                    showToast("error", "Account creation error");
                    console.log(error);
                    break;
            }
            return false;
        }
    };

    login = async (userData) => {
        try {
            let userCredential = await signInWithEmailAndPassword(
                this.auth,
                userData.email,
                userData.password,
            );
            let user = userCredential.user;
            this.uid = user.uid;
            dismissToast();
            return true;
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    dismissToast();
                    showToast("error", "Incorrect Password");
                    break;
                case "auth/user-not-found":
                    dismissToast();
                    showToast(
                        "error",
                        "User not found with the provided email.",
                    );
                    break;
                case "auth/invalid-login-credentials":
                    dismissToast();
                    showToast("error", "Invalid login credentials");
                    break;
                default:
                    dismissToast();
                    showToast("error", "Login error");
                    console.log(error);
            }
            return false;
        }
    };

    signOut = async () => {
        FirebaseNote.uid = null;
        await signOut(this.auth)
            .then(() => {
                dismissToast();
                showToast("success", "Logout successful");
                return true;
            })
            .catch((error) => {
                dismissToast();
                showToast("error", "Logout error");
                console.log(error);
            });
        return false;
    };

    getUserData = async () => {
        let user = {};
        try {
            if (this.auth.currentUser !== null) {
                user.fName = this.auth.currentUser.displayName.split(" ")[0];
                user.lName = this.auth.currentUser.displayName.split(" ")[1];
                user.email = this.auth.currentUser.email;
            }
        } catch (e) {
            console.log(e);
        }
        return user;
    };

    changePassword = async (newPassword) => {
        dismissToast();
        showToast("loading", "Changing password...");
        try {
            await updatePassword(this.auth.currentUser, newPassword);
            dismissToast();
            showToast("success", "Password changed successfully");
        } catch (error) {
            dismissToast();
            console.log(error);
            switch (error.code) {
                case "auth/weak-password":
                    showToast(
                        "error",
                        "Password is not strong enough. Add additional characters including special characters and numbers.",
                    );
                    break;
                case "auth/requires-recent-login":
                    showToast(
                        "error",
                        "Please logout and login again to change your password",
                    );
                    break;
                default:
                    showToast("error", "Password change failed");
                    console.log(error);
            }
        }
    };
    updateName = async (newUserData) => {
        try {
            await updateProfile(this.auth.currentUser, {
                displayName: `${newUserData.fName.trim()} ${newUserData.lName.trim()}`,
            })
                .then(() => {
                    dismissToast();
                    showToast("success", "Name updated successfully");
                })
                .catch((error) => {
                    dismissToast();
                    showToast("error", "Name update error");
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    updateImage = async (image) => {
        dismissToast();
        showToast("loading", "Updating profile image...");

        try {
            let imageRef = ref(
                this.storageRef,
                `users/${this.uid}/profile.jpg`,
            );
            await uploadBytesResumable(imageRef, image);
            dismissToast();
            showToast("success", "Profile image updated successfully");
            return await getDownloadURL(imageRef);
        } catch (error) {
            dismissToast();
            showToast("error", "Profile image update failed");
            console.log(error);
        }
    };

    getImageURL = async () => {
        try {
            return await getDownloadURL(
                ref(this.storageRef, `users/${this.uid}/profile.jpg`),
            );
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    sendResetPasswordEmail = async (email) => {
        sendPasswordResetEmail(this.auth, email)
            .then(() => {
                // Password reset email sent!
                dismissToast();
                showToast("success", "Password reset email sent");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };
    deleteAccount = async () => {
        dismissToast();
        showToast("loading", "Deleting account...");
        try {
            let notes = await FirebaseNote.getNotes();
            notes.forEach(async (note) => {
                await FirebaseNote.deleteNote(note.id);
            });
            await deleteUser(this.auth.currentUser);
            dismissToast();
            showToast("success", "Account deleted successfully");
            return true;
        } catch (e) {
            console.log(e);
            showToast("error", "Account deletion error");
            dismissToast();
            switch (e.code) {
                case "auth/requires-recent-login":
                    showToast(
                        "error",
                        "Please logout and login again to delete your account",
                    );
                    break;
                default:
                    showToast("error", "Account deletion error");
            }
        }
        return false;
    };
}

export default new UserAuth();

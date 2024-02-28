import { firestore } from "./";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import UserAuth from "./UserAuth";

class User {
    static setUserData = async (userData) => {
        try {
            const userRef = doc(firestore, "users", UserAuth.uid);
            setDoc(userRef, userData);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    static updateUserData = async (userData) => {
        try {
            await updateDoc(doc(firestore, "users", UserAuth.uid), userData);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    static updateLanguage = async (lang) => {
        try {
            await updateDoc(doc(firestore, "users", UserAuth.uid), { lang });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    static updateTheme = async (theme) => {
        try {
            await updateDoc(doc(firestore, "users", UserAuth.uid), { theme });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    static getUserData = async () => {
        try {
            const userDoc = await getDoc(doc(firestore, "users", UserAuth.uid));
            if (userDoc.exists()) {
                return userDoc.data();
            }
        } catch (error) {
            console.error("Error getting document: ", error);
        }
    };
    static deleteUserData = async () => {
        try {
            await deleteDoc(doc(firestore, "users", UserAuth.uid));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };
}

export default User;

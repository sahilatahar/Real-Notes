import './Profile.css';
import User from '../../classes/User'
import { useContext, useEffect, useState } from 'react';
import { showToast, dismissToast } from '../../utils/toast';
import { AuthContext } from '../../services/AuthContext';

function Profile() {

    const [userData, setUserData] = useState({
        fName: '',
        lName: '',
        email: '',
        newPassword: '',
        confirmNewPassword: '',
        imgURL: ''
    });

    const { authState, setAuthState } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            (async () => {
                setAuthState(async (data) => { return { ...data, isAuthenticated: await User.checkUserAuth() } });
            })
        }

        if (authState.isAuthenticated) {
            dismissToast();
            showToast('loading', 'Loading profile data...');
            (async () => {
                let user = await User.getUserData();
                let imgUrl = await User.getImageURL();
                if (imgUrl === null) {
                    dismissToast();
                    showToast('error', 'Error loading image');
                }
                setUserData(userData => {
                    return {
                        ...userData,
                        fName: user.fName,
                        lName: user.lName,
                        email: user.email,
                        imgURL: imgUrl,
                    }
                });
                dismissToast();
            })();
        }
    }, [authState.isAuthenticated, setAuthState]);

    const changePassword = async () => {
        if (userData.newPassword !== userData.confirmNewPassword) {
            dismissToast();
            showToast('error', 'Passwords do not match');
            return;
        }
        await User.changePassword(userData.newPassword);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleImageChange = async (e) => {
        const image = e.target.files[0];

        if (!image) return;
        const imageSize = Math.round(image.size / 1024);
        if (imageSize > 1024 * 2) {
            dismissToast();
            showToast('info', 'Image size should be less than 2 MB');
            return;
        }
        setUserData({ ...userData, imgURL: URL.createObjectURL(image), image: image });
    }
    const updateImage = async () => {
        await User.updateImage(userData.image);
    }

    const updateName = async () => {
        await User.updateName(userData);
    }

    const sendResetEmail = async () => {
        await User.sendResetPasswordEmail(userData.email);
    }

    const deleteUserAccount = async () => {
        let isDeleted = await User.deleteAccount();
        if (isDeleted) {
            localStorage.removeItem('userID');
            setAuthState(data => { return { ...data, isAuthenticated: false } });
        }
    }

    return (
        <div className='Profile'>
            <aside className='sidebar'>
                <div className="image-section">
                    <div className="image-div">
                        <label htmlFor="user-image-input">
                            <img src={userData.imgURL} alt="User Image" />
                        </label>
                        <div className='update-image' onClick={updateImage}>Upload Image </div>
                        <input type="file" id='user-image-input' onChange={handleImageChange} />
                    </div>
                </div>
            </aside>
            <main className='main'>
                <h1>Personal Info</h1>
                <div className="name-group">
                    <div className="input-group">
                        <label htmlFor="fName">First Name</label>
                        <input type="text" name="fName" id="fName" placeholder="John" onInput={handleChange} value={userData.fName} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lName">Last Name</label>
                        <input type="text" name="lName" id="lName" placeholder="Doe" onInput={handleChange} value={userData.lName} />
                    </div>
                </div>
                <button className='btn' onClick={updateName}>Update Name</button>
                <hr />
                <h2>Change Password</h2>
                <div className="name-group">
                    <div className="input-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" name="newPassword" id="newPassword" placeholder="" onInput={handleChange} value={userData.newPassword} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input type="text" name="confirmNewPassword" id="confirmNewPassword" placeholder="" onInput={handleChange} value={userData.confirmNewPassword} />
                    </div>
                </div>
                <button className='btn' onClick={changePassword}>Change Password</button>
                <hr />
                <h2>Reset Password</h2>
                <button className='btn' onClick={sendResetEmail}>Send reset e-mail</button>
                <hr />
                <h2 className='danger-clr'>Danger Zone</h2>
                <p>Deleting your Real-Notes account is irreversible and will permanently erase all your notes and data. Thank you for using Real-Notes.</p>
                <button className='btn danger-btn' onClick={deleteUserAccount}>Delete Account</button>
            </main>
        </div>
    )
}

export default Profile
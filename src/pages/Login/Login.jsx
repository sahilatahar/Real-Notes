import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import User from '../../classes/User';
import profileImgTemp from '../../images/profile.png';
import { useEffect } from 'react';
import PropType from 'prop-types';
import { AuthContext } from '../../services/AuthContext';
import { showToast, dismissToast } from '../../utils/toast';

const Login = ({ setIsLoginPage }) => {

    // State variables and Hooks
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({
        image: null,
        imgURL: profileImgTemp,
        fName: '', lName: '',
        email: '', password: '', confirmPassword: ''
    });
    const [errorMsg, setErrorMsg] = useState({
        fName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { setAuthState } = useContext(AuthContext);


    const togglePage = () => {
        setIsLogin(!isLogin);
    }

    // Handling input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        let image = e.target.files[0];
        if (!image) return;
        const imageSize = Math.round(image.size / 1024);
        if (imageSize > 1024 * 2) {
            dismissToast();
            showToast('info', 'Image size should be less than 2 MB');
            return;
        }

        setUserData({ ...userData, image: image, imgURL: URL.createObjectURL(image) });
    };

    const validateForm = () => {
        if (isLogin) {
            if (!userData.email || !userData.password) {
                setErrorMsg((pre) => {
                    return {
                        ...pre,
                        'email': !userData.email && 'This field is required',
                        'password': !userData.password && 'This field is required'
                    }
                })
                return false;
            } else {
                setErrorMsg((pre) => {
                    return {
                        ...pre,
                        'email': '',
                        'password': ''
                    }
                })
            }
        } else {
            if (!userData.email || !userData.password || !userData.confirmPassword || !userData.fName) {
                setErrorMsg((pre) => {
                    return {
                        ...pre,
                        'fName': !userData.fName && 'This field is required',
                        'email': !userData.email && 'This field is required',
                        'password': !userData.password && 'This field is required',
                        'confirmPassword': !userData.confirmPassword && 'This field is required'
                    }
                });
                return false;
            } else {
                setErrorMsg((pre) => {
                    return {
                        ...pre,
                        'fName': '',
                        'email': '',
                        'password': '',
                        'confirmPassword': ''
                    }
                });
            }
            if (userData.password !== userData.confirmPassword) {
                showToast('info', 'Password and Confirm Password should be same');
                return false;
            }
        }
        return true;
    }

    useEffect(() => {
        setIsLoginPage(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (!isLogin) {
                let isSignUp = await User.signUp(userData);
                if (isSignUp) {
                    setIsLoginPage(false);
                    setAuthState(auth => { return { ...auth, isAuthenticated: true } });
                    navigate('/');
                }
            } else {
                let isLoggedIn = await User.login(userData);
                if (isLoggedIn) {
                    setIsLoginPage(false);
                    setAuthState(auth => { return { ...auth, isAuthenticated: true } });
                    navigate('/');
                }
            }
        }
    }

    return (
        <div className='Page'>
            <div className="form-container">
                <p className="title">{isLogin ? 'Login' : 'Signup'}</p>
                <form className="form" onSubmit={handleSubmit}>
                    {!isLogin && <>
                        <div className="image-div">
                            <label htmlFor="image">
                                <img src={userData.imgURL} alt="User image" />
                            </label>
                            <input type="file" name="image" id="image" onChange={handleImageChange} />
                        </div>
                        <div className="name-group">
                            <div className="input-group">
                                <label htmlFor="fName">First Name</label>
                                <input type="text" name="fName" id="fName" placeholder="" onInput={handleChange} />
                                <span className='fName-error'>{errorMsg.fName}</span>
                            </div>
                            <div className="input-group">
                                <label htmlFor="lName">Last Name</label>
                                <input type="text" name="lName" id="lName" placeholder="" onInput={handleChange} />
                            </div>
                        </div>
                    </>
                    }
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="" onInput={handleChange} autoComplete='current-email' />
                        <span className='email-error'>{errorMsg.email}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" onInput={handleChange} autoComplete='current-email' />
                        <span className='password-error'>{errorMsg.password}</span>
                    </div>
                    {
                        !isLogin && <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="text" name="confirmPassword" id="confirmPassword" placeholder="" onInput={handleChange} />
                            <span className='confirmPassword-error'>{errorMsg.confirmPassword}</span>
                        </div>
                    }
                    <button className="sign pt-1-5" type='submit'>{isLogin ? 'Log in' : 'Sign up'}</button>
                </form>
                <p className="signup">
                    {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
                    <a rel="noopener noreferrer" onClick={togglePage}>
                        {isLogin ? 'Signup' : 'Login'}
                    </a>
                </p>
            </div>
        </div>
    )
}

Login.propTypes = {
    setIsLoginPage: PropType.func.isRequired
}

export default Login;
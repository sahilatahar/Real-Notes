import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../services/firebase';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { NotesContext } from '../../services/context';

const Login = () => {

    // State variables and Hooks
    const { setEmail } = useContext(NotesContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });

    const [errorMsg, setErrorMsg] = useState({
        fName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const togglePage = () => {
        setIsLogin(!isLogin);
    }

    // Handling input changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

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
            if (!userData.email || !userData.password || !userData.confirmPassword || !userData.fName || !userData.lName) {
                setErrorMsg((pre) => {
                    return {
                        ...pre,
                        'fName': !userData.fName && 'This field is required',
                        'email': !userData.email && 'This field is required',
                        'password': !userData.password && 'This field is required',
                        'confirmPassword': !userData.confirmPassword && 'This field is required'
                    }
                })
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
                alert('Password and Confirm Password should be same');
                return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Initialize Firebase Authentication and get a reference to the service
            const auth = getAuth(app);

            if (!isLogin) {
                createUserWithEmailAndPassword(auth, userData.email, userData.password)
                    .then((userCredential) => {
                        toast.dismiss();
                        toast.loading('Signing up...', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 2000,
                        });
                        // Signed up 
                        const user = userCredential.user;
                        // ref(`users/${user.uid}`).set({ name: userData.fName }); // I added user
                        setEmail(user.email);
                        toast.dismiss();
                        toast.success('Signup successful', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 2000,
                        });
                        navigate('/');
                    })
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                toast.dismiss();
                                toast.error('Email already in use', {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 2000,
                                });
                                break;
                            case 'auth/invalid-email':
                                toast.dismiss();
                                toast.error('Invalid Email.', {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 2000,
                                });
                                break;
                            case 'auth/operation-not-allowed':
                                console.log(`Error during sign up.`, error);
                                break;
                            case 'auth/weak-password':
                                toast.dismiss();
                                toast.error('Password is not strong enough. Add additional characters including special characters and numbers.', {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 2000,
                                });
                                break;
                            default:
                                console.log(error);
                                break;
                        }
                    });
            } else {
                toast.dismiss();
                toast.loading('Logging in...', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 100,
                });

                // Login
                signInWithEmailAndPassword(auth, userData.email, userData.password).then((userCredential) => {
                    let user = userCredential.user;
                    setEmail(user.email);
                    toast.dismiss();
                    toast.success('Login successful', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                    navigate('/');
                }).catch((error) => {
                    switch (error.code) {
                        case 'auth/wrong-password':
                            toast.dismiss();
                            toast.error('Wrong Password', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000,
                            });
                            break;
                        case 'auth/user-not-found':
                            toast.dismiss();
                            toast.error('Email not found', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000,
                            });
                    }
                });
            }
        }
    }

    return (
        <div className='Page'>
            <div className="form-container">
                <p className="title">{isLogin ? 'Login' : 'Signup'}</p>
                <form className="form" onSubmit={handleSubmit}>
                    {!isLogin && <div className="name-group">
                        <div className="input-group">
                            <label htmlFor="fName">First Name</label>
                            <input type="text" name="fName" id="fName" placeholder="" onInput={handleChange} />
                            <span className='fName-error'>{errorMsg.fName}</span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="lName">Last Name</label>
                            <input type="text" name="lName" id="lName" placeholder="" onInput={handleChange} />
                        </div>
                    </div>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="" onInput={handleChange} />
                        <span className='email-error'>{errorMsg.email}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="" onInput={handleChange} />
                        <span className='password-error'>{errorMsg.password}</span>
                    </div>
                    {
                        !isLogin && <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="text" name="confirmPassword" id="confirmPassword" placeholder="" onInput={handleChange} />
                            <span className='confirmPassword-error'>{errorMsg.confirmPassword}</span>
                        </div>
                    }
                    {
                        isLogin && <div className="forgot">
                            <a rel="noopener noreferrer" href="#">
                                Forgot Password ?
                            </a>
                        </div>
                    }
                    <button className="sign" type='submit'>{isLogin ? 'Log in' : 'Sign up'}</button>
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

export default Login;
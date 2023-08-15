import './Navbar.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../classes/User';
import { UilSignout, UilUser } from '@iconscout/react-unicons';
import { AuthContext } from '../../services/AuthContext';

const Navbar = () => {

    const navRef = useRef(null);
    const navigate = useNavigate();
    const { authState, setAuthState } = useContext(AuthContext);
    const [image, setImage] = useState('');
    const [isProfilePage, setIsProfilePage] = useState(false);

    const signOut = async () => {
        let isSignOut = await User.signOut();
        if (isSignOut) {
            setAuthState(data => { return { ...data, isAuthenticated: false } });
        }
    }

    const handleNavbarBg = () => {
        if (navRef.current) {
            if (window.scrollY > 50) {
                navRef.current.classList.add('bg');
            } else {
                navRef.current.classList.remove('bg');
            }
        }
    }

    const gotoHome = () => {
        navigate('/');
    }

    useEffect(() => {
        window.addEventListener('scroll', handleNavbarBg);
        return () => {
            window.removeEventListener('scroll', handleNavbarBg);
        }
    }, []);

    useEffect(() => {
        if (!authState.isAuthenticated) return;
        (async () => {
            let imgUrl = await User.getImageURL()
            if (imgUrl !== null) {
                setImage(imgUrl);
            }
        })()
    }, [authState.isAuthenticated])


    useEffect(() => {
        if (window.location.pathname === '/profile') {
            setIsProfilePage(true);
        } else {
            setIsProfilePage(false);
        }
    }, []);

    const handleMenuChange = () => {
        if (window.location.pathname !== '/profile') {
            setIsProfilePage(isProfilePage => !isProfilePage);
        } else {
            setIsProfilePage(isProfilePage => !isProfilePage);
        }

        if (isProfilePage) {
            navigate('/home');
        } else {
            navigate('/profile');
        }
    }

    return (
        <nav ref={navRef}>
            <h1 className='brand-title' onClick={gotoHome}>Real Notes</h1>
            <div className="profile" >
                <img src={image} alt="User" className="user-image" />
                <div className="menu">
                    {!isProfilePage ? <div className="menu-item" onClick={handleMenuChange} ><UilUser className='icon' size='50' /> Profile</div> :
                        <div className="menu-item" onClick={handleMenuChange} ><UilUser className='icon' size='50' /> Home</div>}
                    <div className="menu-item" onClick={signOut}><UilSignout className='icon' size='50' /> Log out</div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
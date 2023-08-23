import { useState } from 'react';
import { Avatar, Button } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='content'>
          <div className='contentLeft'>
            <Link className='logo' to={'/'}>
              {/* <img className="logoImg" src={logo128} alt='logo' /> */}
              <div className='logoText'>
                <span>logo</span>
              </div>
            </Link>
          </div>

          <nav className='nav'>
            <NavLink to='/' className={'handleIsNavLinkActive navLink'} end>
              Questions
            </NavLink>
            <NavLink to='/profile' className={'handleIsNavLinkActive navLink'}>
              Profile
            </NavLink>
            <NavLink
              to='/post/create'
              className={'handleIsNavLinkActive navLink'}
            >
              Ask question
            </NavLink>
          </nav>

          {loggedIn ? (
            <div className='controls'>
              <div className='user'>
                <Link to={'/profile'}>
                  <Avatar icon='' size={40} />
                  <div className='avatar'>avatar</div>
                </Link>
                <div className={'userInfo'}>
                  <span className={'userName'}>binh nguyen</span>
                  <span className={'userRole'}>admin</span>
                </div>
              </div>
            </div>
          ) : (
            <Button
              type='secondary'
              onClick={() => {
                navigate('/login');
              }}
            >
              Log in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

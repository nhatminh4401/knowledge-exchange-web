import { useEffect, useState } from 'react';
import { Avatar, Button } from 'antd';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectToken,
  selectUser,
  logout,
} from '../../app/reducers/authReducer';

const Header = ({ setSearchTerm }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  // const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  window.console.log('user: ' + JSON.stringify(user, null, 2));
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const token = localStorage.getItem(`token`);
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Ngăn trình duyệt thực hiện hành động mặc định của form
    setSearchTerm(searchValue);
  };

  return (
    <header className='header'>
      <div className='wrapper'>
        <div className='content'>
          <div className='contentLeft'>
            <Link className='logo' to={'/'}>
              <img
                className='logoImg'
                src={
                  'https://png.pngtree.com/png-vector/20220610/ourmid/pngtree-question-and-answer-bubble-chat-on-white-background-png-image_4956038.png'
                }
                alt='logo'
              />
              {/* <div className="logoText">
                <span>logo</span>
              </div> */}
            </Link>
          </div>

          <nav className='nav'>
            <NavLink to='/' className={'handleIsNavLinkActive navLink'} end>
              Questions
            </NavLink>
            {/* <NavLink to="/" className={"handleIsNavLinkActive navLink"}>
              Search
            </NavLink> */}
            <NavLink
              to='/question/create'
              className={'handleIsNavLinkActive navLink'}
            >
              Ask question
            </NavLink>
          </nav>
          <div className='search'>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Search...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type='submit'>Search</button>
            </form>
          </div>

          {loggedIn ? (
            <div className='controls'>
              <div className='user'>
                <Link to={`/profile/${user?.id}`}>
                  <Avatar icon='' size={40} src={user?.avatar}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  {/* <div className="avatar">avatar</div> */}
                </Link>
                <div className={'userInfo'}>
                  <span className={'userName'}>{user?.username}</span>
                  {user?.isAdmin ? (
                    <Link className={'userRole'} to='admin'>
                      admin
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
                <Button
                  type='secondary'
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navstyle.scss';

function Navbar1(): React.ReactElement {
  const navigation = useNavigate();
  // const [username,setUsername] = useState('');

  const [isLogedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    // setUsername(localStorage.getItem('username'));
    if (token) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [isLogedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setisLoggedIn(false);
    navigation('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-items">
        <h3 className="logo">
          <Link className="nav-link" to="/">
            ToDo
          </Link>
        </h3>
        <ul className="nav-ul">
          {isLogedIn ? (
            <>
              <li className="nav-li">
                <Link className="nav-link" to="/todo">
                  Dashboard
                </Link>
              </li>
              <li className="nav-li">
                <a className="nav-link" onClick={handleLogout}>
                  LogOut
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-li">
                <Link className="nav-link" to="/Signup">
                  Signup
                </Link>
              </li>
              <li className="nav-li">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar1;

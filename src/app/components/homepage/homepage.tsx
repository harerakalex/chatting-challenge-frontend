import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from '../../redux';
import { ILogin } from '../../redux/interfaces';

import './homepage.scss';

const Homepage = () => {
  const { isAuthenticated }: ILogin = useSelector(
    (state: AppState) => state.login,
  );

  useEffect(() => {
    if (isAuthenticated) {
      window.location.assign('/chats');
    }
  }, [isAuthenticated]);

  return (
    <div className="home-container">
      <div className="home-container__button-container">
        <Link to="login">
          <button className="home-container__login-btn">Login</button>
        </Link>
        <button className="home-container__signup-btn">Signup</button>
      </div>
      <div className="home-container__welcome-message">
        <p>Stay connected with your friend!</p>
      </div>
    </div>
  );
};

export default Homepage;

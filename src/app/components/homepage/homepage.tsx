import React from 'react';
import { Link } from 'react-router-dom';

import './homepage.scss';

const Homepage = () => {
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

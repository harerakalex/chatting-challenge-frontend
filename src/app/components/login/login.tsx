import React from 'react';

import './login.scss';

const LoginPage = () => {
  return (
    <section className="login-page-container">
      <div className="login-page-container__content-content">
        <div className="login-page-container__heading-container">
          <h1>Chatti</h1>
        </div>
        <form className="login-page-container__form-container">
          <p className="login-page-container__label">username</p>
          <input
            type="email"
            name="email"
            placeholder="Username"
            className="login-page-container__input-field"
          />

          <p className="login-page-container__label">Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-page-container__input-field"
          />

          <div className="login-page-container__button-container">
            <p className="login-page-container__forget-btn">Forgot password?</p>
            <button className="login-page-container__signin-btn">
              Sign in
            </button>
          </div>
          <button className="login-page-container__no-account-btn">
            Don't have an account
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

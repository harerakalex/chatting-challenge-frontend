import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './signup.scss';
import { AppState } from '../../redux';
import { ILogin } from '../../redux/interfaces';
import { toast } from 'react-toastify';
import { postRequest } from '../../redux/api';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated }: ILogin = useSelector(
    (state: AppState) => state.login,
  );

  useEffect(() => {
    if (isAuthenticated) window.location.assign('/chats');
  }, [isAuthenticated]);

  const submitForm = async (event: any) => {
    event.preventDefault();
    try {
      if (username.length < 3 || password.length < 3) {
        const message =
          'username and password should be 3 character min length';
        return toast.error(message, { position: toast.POSITION.TOP_CENTER });
      }
      const send = await postRequest('/signup', { username, password });
      const { message } = send;
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      window.location.assign('/login');
    } catch (error) {
      const message = (await error.response)
        ? error.response.data.message
        : 'Something wrong';
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <section className="login-page-container">
      <div className="login-page-container__content-content">
        <div className="login-page-container__heading-container">
          <h1>Chatti</h1>
        </div>
        <form
          onSubmit={submitForm}
          className="login-page-container__form-container">
          <p className="login-page-container__label">Username</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            className="login-page-container__input-field"
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="login-page-container__label">Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="login-page-container__input-field"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-page-container__button-container">
            <p className="login-page-container__hiden">Hidden</p>
            <button type="submit" className="login-page-container__signin-btn">
              Sign up
            </button>
          </div>
          <Link to="login">
            <button className="login-page-container__no-account-btn">
              Already have an account,
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignupPage;

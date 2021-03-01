import jwt from 'jwt-decode';

const checkAuthUser = () => {
  try {
    const { token } = localStorage;
    const user = jwt(token);
    return {
      user,
      isAuthenticated: true,
    };
  } catch (error) {
    return {
      user: {},
      isAuthenticated: false,
    };
  }
};

export default checkAuthUser;

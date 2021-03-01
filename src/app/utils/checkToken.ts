import jwdDecoded from 'jwt-decode';

const checkToken = () => (next: any) => (action: any) => {
  if (process.env.NODE_ENV === 'test') {
    return next(action);
  }
  try {
    const { exp } = jwdDecoded(localStorage.token) as any;
    const currentTime = Date.now() / 1000;
    if (exp < currentTime) {
      window.location.assign('/login');
      localStorage.token = '';
      localStorage.username = '';
    }
  } catch (error) {
    if (localStorage.token) {
      window.location.assign('/login');
    }
    localStorage.token = '';
    localStorage.username = '';
  }
  return next(action);
};

export default checkToken;

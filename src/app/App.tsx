import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Homepage, Login, Chats } from './components';
import ProtectedRoutes from './components/common/protetedRoute';

toast.configure();
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <ProtectedRoutes path="/chats" component={Chats} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

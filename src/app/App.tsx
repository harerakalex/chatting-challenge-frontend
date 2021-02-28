import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Homepage, Login } from './components';

toast.configure();
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

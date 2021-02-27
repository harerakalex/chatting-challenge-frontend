import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { homepage } from '../components/homepage/index';

const Navigation = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={homepage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Navigation;

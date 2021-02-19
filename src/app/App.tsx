import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import Navigation from './navigation';

toast.configure();
const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Navigation />
    </div>
  );
};

export default App;

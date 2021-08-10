import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './Contexts/AuthContext';


ReactDOM.render(
 
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
  
);




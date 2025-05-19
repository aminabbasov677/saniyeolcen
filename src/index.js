import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'; // default import istifadə edirsinizsə
// import { store } from './redux/store'; // əgər yalnız named export etmisinizsə
import './index.css'; // Və ya './App.css' faylınızın yolu
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter burada import olunur

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* Əlavə yoxlamalar üçün */}
    <Provider store={store}>
      <Router> {/* App komponenti Router içərisinə qoyulur */}
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
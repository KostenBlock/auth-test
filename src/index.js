import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { store } from "./store";
import { Provider } from "react-redux";

import "./styles/global/template.scss";
import "./styles/global/reset.scss";
import "./styles/global/text.scss";
import "./styles/global/gaps.scss";
import "./styles/global/visible.scss";
import HomePage from "components/page-components/home-page";
import LoginPage from "components/page-components/login-page";
import Default from "./layouts/default";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <Provider store={store}>
              <Default>
                  <Routes>
                      <Route path={'/'} element={<HomePage />}/>
                      <Route path={'/login'} element={<LoginPage />}/>
                  </Routes>
              </Default>
          </Provider>
      </Router>
  </React.StrictMode>
);

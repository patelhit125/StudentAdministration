import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { retry } from './utils/CommonFunctions';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
const Home = lazy(() => retry(() => import('./components/Home')));
const Register = lazy(() => retry(() => import('./components/Register')));
const Login = lazy(() => retry(() => import('./components/Login')));
const Profile = lazy(() => retry(() => import('./components/Profile')));
const Edit = lazy(() => retry(() => import('./components/Edit')));
const Admin = lazy(() => retry(() => import('./components/Admin')));

const App = () => {

  console.log('%cMade with ❤ by Hit Patel', 'color: black; background: grey; font-size: 15px; padding: 5px 15px; border-radius: 6px');

  const pages = [
    {
      pageLink: '/',
      view: Home
    },
    {
      pageLink: '/register',
      view: Register
    },
    {
      pageLink: '/login',
      view: Login
    },
    {
      pageLink: '/profile',
      view: Profile
    },
    {
      pageLink: '/edit',
      view: Edit
    },
    {
      pageLink: '/admin',
      view: Admin
    }
  ];

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Switch>
          {pages.map((page, index) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={() => <page.view />}
                key={index}
              />
            );
          })}
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

import React, { lazy } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { retry } from '../utils/CommonFunctions';
const Login = lazy(() => retry(() => import('./Login')));

const Home = () => {
  const location = useLocation();
  const token = location.state;

  return (
    token ? 
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to={{
              pathname: '/',
              state: token
            }}>Student<span className="text-primary">Center</span></Link>
            <div>
              <Link to={{
                pathname: '/profile',
                state: token
              }}>Profile</Link>
              <Link className="ms-2 ms-sm-3 ms-md-4 ms-lg-5" to='/login'>Log out</Link>
            </div>
          </div>
        </nav>
        <div className="mt-5 container text-break">
          Home page --- your token is: {token}
        </div>
      </> : <Login />
  )
}

export default Home

import React, { lazy, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { retry, getDateShort } from '../utils/CommonFunctions';
import axios from 'axios';
const Login = lazy(() => retry(() => import('./Login')));

const Profile = () => {
  const location = useLocation();
  const token = location.state;
  const [dataStudent, setData] = useState([]);
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const history = useHistory();

  const deleteHandler = () => {
    if(window.confirm('Are you sure?')) {
      axios.delete('http://localhost:3000/student/delete', { "headers": headers })
        .then(function (response) {
          if (response.data.success === true) {
            history.push('/login');
          }
          else {
            alert("Account deletion failed...");
          }
        })
        .catch(function () {
          alert("Account deletion failed...");
        })
    }
  }

  const editHandler = () => {
    history.push({
      pathname: '/edit',
      state: token
    });
  }

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const getData = () => {
      axios.get('http://localhost:3000/student/get-profile', { "headers": headers })
        .then(function (response) {
          setData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    getData();
  }, [token])

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
                pathname: '/',
                state: token
              }}>Home</Link>
              <Link className="ms-2 ms-sm-3 ms-md-4 ms-lg-5" to='/login'>Log out</Link>
            </div>
          </div>
        </nav>
        <div className="mt-5 container">
          <div className="row">
            <div className="col-12 col-md-2">
              <img className="img-fluid rounded-circle" src="https://i.pravatar.cc/150?img=12" alt='profile' />
            </div>
            <div className="col-12 col-md-10">
              {dataStudent ? 
                <>
                  <h2 className="font-weight-bold mt-5 mt-md-0">{dataStudent.firstName} {dataStudent.lastName}</h2>
                  <table className="table table-striped mt-3">
                    <tbody>
                      <tr>
                        <th scope="row text-break">Enrollment number</th>
                        <td className="text-break">{dataStudent.enrollmentNo}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">Branch</th>
                        <td className="text-break">{dataStudent.branch}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">Semester</th>
                        <td className="text-break">{dataStudent.semester}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">E-mail</th>
                        <td className="text-break">{dataStudent.email}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">Mobile number</th>
                        <td className="text-break">{dataStudent.mobileNo}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">Gender</th>
                        <td className="text-break">{dataStudent.gender}</td>
                      </tr>
                      <tr>
                        <th scope="row text-break">Date of birth</th>
                        <td className="text-break">{getDateShort(dataStudent.dob)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-5 mb-5">
                    <button className="btn btn-primary" onClick={editHandler}>Edit</button><button className="ms-3 btn btn-danger" onClick={deleteHandler}>Delete account</button>
                  </div>
                </> : 'No data available'}
            </div>
          </div>
        </div>
      </> : <Login />
  )
}

export default Profile

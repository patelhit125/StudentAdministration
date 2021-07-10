import React, { useState, useEffect, lazy } from 'react';
import { useLocation } from 'react-router';
import { retry, getDateShort } from '../utils/CommonFunctions';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Login = lazy(() => retry(() => import('./Login')));

const Admin = () => {
  const location = useLocation();
  const token = location.state;
  const [dataStudents, setData] = useState([]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    const params = {
      page: 1,
      limit: 1000
    }

    const getData = () => {
      axios.get('http://localhost:3000/admin/get-students', { "params": params, "headers": headers })
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
            <div className="navbar-brand">Student<span className="text-primary">Center</span></div>
            <div>
            <Link to='/login'>Log out</Link>
            </div>
          </div>
        </nav>
        <div className="container mt-5 table-responsive">
          <h2>Students data</h2>
          <table className="mt-3 table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Enrollment No</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Semester</th>
                <th scope="col">DOB</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Branch</th>
                <th scope="col">created At</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {dataStudents ? 
                dataStudents.map((dataRow, index) => (
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td className="text-nowrap">{dataRow.enrollmentNo}</td>
                    <td className="text-nowrap">{dataRow.firstName}</td>
                    <td className="text-nowrap">{dataRow.lastName}</td>
                    <td className="text-nowrap">{dataRow.semester}</td>
                    <td className="text-nowrap">{getDateShort(dataRow.dob)}</td>
                    <td className="text-nowrap">{dataRow.gender}</td>
                    <td className="text-nowrap">{dataRow.email}</td>
                    <td className="text-nowrap">{dataRow.mobileNo}</td>
                    <td className="text-nowrap">{dataRow.branch}</td>
                    <td className="text-nowrap">{dataRow.createdAt}</td>
                    <td className="text-nowrap">{dataRow.updatedAt}</td>
                  </tr>
                ))
              :
              'No students available'}
            </tbody>
          </table>
        </div>
      </> : <Login />
  )
}

export default Admin

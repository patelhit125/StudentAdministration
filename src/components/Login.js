import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState({
    enrollmentNo: '',
    password: '',
    email: '',
    valid: false,
    submitAdminDisabled: true,
    submitStudentDisabled: true,
    statusRadio: 'student',
    errors: {
      enrollmentNo: '',
      password: '',
      email: ''
    }
  });

  const history = useHistory();

  const data = Object.keys(state).map((key) =>
    `${key}=${encodeURIComponent(state[key])}`)
    .join('&');

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let errors = state.errors;

    switch (name) {
      case 'enrollmentNo':
        if (value.length === 12) {
          state.valid = true;
          errors.enrollmentNo = '';
        }
        else {
          state.valid = false;
          errors.enrollmentNo = '\n* Enrollment number is not valid!';
        }
        break;
      case 'email':
        if (value.length > 0) {
          state.valid = true;
          errors.email = '';
        }
        else {
          state.valid = false;
          errors.email = '* E-mail is required!';
        }
        break;
      case 'password':
        if (value.length > 0) {
          state.valid = true;
          errors.password = '';
        }
        else {
          state.valid = false;
          errors.password = '* Password is required!';
        }
        break;
      default:
        break;
    }

    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const changeStatusHandler = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const isFormValid = () => {
    const { enrollmentNo, email, password, valid } = state
    if (enrollmentNo && password && valid) {
      state.submitStudentDisabled = false;
    }

    if (email && password && valid) {
      state.submitAdminDisabled = false;
    }
  }

  isFormValid();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const submitAdminHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin/login', data, { "headers": headers })
      .then(function (response) {
        if (response.data.success === true) {
          history.push({
            pathname: '/admin',
            state: response.data.token
          });
        }
        else {
          alert("Incorrect email or password!");
        }
      })
      .catch(function () {
        alert("Incorrect email or password!");
      });
  }

  const submitStudentHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/student/login', data, { "headers": headers })
      .then(function (response) {
        if (response.data.success === true) {
          history.push({
            pathname: '/',
            state: response.data.token
          });
        }
        else {
          alert("Incorrect enrollment number or password!");
        }
      })
      .catch(function () {
        alert("Incorrect enrollment number or password!");
      });
  }

  return (
    <div className="container col-md-5">
      <div className="mt-5 mb-5 card card-body p-md-5">
        <div>
          <h1>
            Student<span className="text-primary">Center</span>
          </h1>
        </div>
        <div className="row ms mt-5">
          <div className="form-check col-6">
            <input className="form-check-input" type="radio" name="statusRadio" id="student" value="student" checked={state.statusRadio === "student"} onChange={changeStatusHandler} />
            <label className="form-check-label" htmlFor="student">
              Student
            </label>
          </div>
          <div className="form-check col-6">
            <input className="form-check-input" type="radio" name="statusRadio" id="admin" value="admin" checked={state.statusRadio === "admin"} onChange={changeStatusHandler} />
            <label className="form-check-label" htmlFor="admin">
              Admin
            </label>
          </div>
        </div>
        {state.statusRadio === 'student' ?
          <form className="mt-5" onSubmit={submitStudentHandler}>
            <div className="mb-3">
              <label htmlFor="enrollmentNo" className="form-label">Enrollment number</label>
              <input type="text" className="form-control" id="enrollmentNo" name='enrollmentNo' value={state.enrollmentNo} onChange={changeHandler} />
              <div id="enrollmentNoError" className="form-text text-danger">{state.errors.enrollmentNo}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' value={state.password} onChange={changeHandler} />
              <div id="passwordError" className="form-text text-danger text-preline">{state.errors.password}</div>
            </div>
            <div className="mt-5 d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={state.submitStudentDisabled}>Login</button>
            </div>
          </form>
          :
          <form className="mt-5" onSubmit={submitAdminHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name='email' value={state.email} onChange={changeHandler} />
              <div id="emailError" className="form-text text-danger">{state.errors.email}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name='password' value={state.password} onChange={changeHandler} />
              <div id="passwordError" className="form-text text-danger text-preline">{state.errors.password}</div>
            </div>
            <div className="mt-5 d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={state.submitAdminDisabled}>Login</button>
            </div>
          </form>}
        <div className="mt-5">
          Not registered yet? <Link to='/register'>Register yourself</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

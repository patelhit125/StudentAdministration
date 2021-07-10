import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [state, setState] = useState({
    enrollmentNo: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    semester: '',
    branch: '',
    dob: '',
    gender: 'Male',
    password: '',
    repassword: '',
    valid: false,
    submitStudentDisabled: true,
    submitAdminDisabled: true,
    statusRadio: 'student',
    errors: {
      enrollmentNo: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      semester: '',
      branch: '',
      dob: '',
      gender: '',
      password: '',
      repassword: ''
    }
  });

  const history = useHistory();

  const data = Object.keys(state).map((key) =>
    `${key}=${encodeURIComponent(state[key])}`)
    .join('&');

  const validEmailRegex =
    RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

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
      case 'firstName':
        if (value.length > 0) {
          state.valid = true;
          errors.firstName = '';
        }
        else {
          state.valid = false;
          errors.firstName = '\n* First name is required!';
        }
        break;
      case 'lastName':
        if (value.length > 0) {
          state.valid = true;
          errors.lastName = ''
        }
        else {
          state.valid = false;
          errors.lastName = '\n* Last name is required!'
        }
        break;
      case 'email':
        if (validEmailRegex.test(value)) {
          state.valid = true;
          errors.email = '';
        }
        else {
          state.valid = false;
          errors.mail = '\n* Email is not valid!';
        }
        break;
      case 'mobileNo':
        if (value.length === 10) {
          state.valid = true;
          errors.mobileNo = '';
        }
        else {
          state.valid = false;
          errors.mobileNo = '\n* Mobile number is not valid!';
        }
        break;
      case 'semester':
        if (value.length === 1) {
          state.valid = true;
          errors.semester = '';
        }
        else {
          state.valid = false;
          errors.semester = '\n* Semester is not valid!';
        }
        break;
      case 'password':
        if (value.length < 6) {
          state.valid = false;
          errors.password = '\n* Must be 6 characters long!';
        }
        else {
          state.valid = true;
          errors.password = '';
        }
        if (RegExp(/[A-Z]/).test(value)) {
          state.valid = true;
          errors.password += '';
        }
        else {
          state.valid = false;
          errors.password += '\n* Must contain upper case letter!';
        }
        if (RegExp(/[a-z]/).test(value)) {
          state.valid = true;
          errors.password += '';
        }
        else {
          state.valid = false;
          errors.password += '\n* Must contain lower case letter!';
        }
        if (RegExp(/[0-9]/).test(value)) {
          state.valid = true;
          errors.password += '';
        }
        else {
          state.valid = false;
          errors.password += '\n* Must contain number!';
        }
        if (RegExp(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/).test(value)) {
          state.valid = true;
          errors.password += '';
        }
        else {
          state.valid = false;
          errors.password += '\n* Must contain special character!';
        }
        break;
      case 'repassword':
        if (state.password === value) {
          state.valid = true;
          errors.repassword = '';
        }
        else {
          state.valid = false;
          errors.repassword = '* Please make sure your passwords match';
        }
        break;
      default:
        break;
    }

    setState({
      ...state,
      [name]: value
    });
  }

  const changeStatusHandler = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const isFormValid = () => {
    const { enrollmentNo, firstName, lastName, email, mobileNo, semester, branch, dob, gender, password, repassword, valid } = state
    if (enrollmentNo && firstName && lastName && email && mobileNo && semester && branch && dob && gender && password && repassword && valid) {
      state.submitStudentDisabled = false;
    }
    if (firstName && lastName && email && mobileNo && password && repassword && valid) {
      state.submitAdminDisabled = false;
    }
  }

  isFormValid();

  const submitStudentHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/student/register', data, { "headers": headers })
      .then(function (response) {
        if (response.data.success === true) {
          history.push({
            pathname: '/',
            state: response.data.token
          });
        }
        else {
          alert("Student is already exist...");
        }
      })
      .catch(function () {
        alert("Student is already exist...");
      });
  }

  const submitAdminHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/admin/register', data, { "headers": headers })
      .then(function (response) {
        if (response.data.success === true) {
          history.push({
            pathname: '/admin',
            state: response.data.token
          });
        }
        else {
          alert("Admin is already exist...");
        }
      })
      .catch(function () {
        alert("Admin is already exist...");
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
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="firstname" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstname" name='firstName' value={state.firstName} onChange={changeHandler} />
              <div id="firstnameError" className="form-text text-danger">{state.errors.firstName}</div>
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastname" name='lastName' value={state.lastName} onChange={changeHandler} />
              <div id="lastnameError" className="form-text text-danger">{state.errors.lastName}</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="enrollmentNo" className="form-label">Enrollment number</label>
            <input type="text" className="form-control" id="enrollmentNo" name='enrollmentNo' value={state.enrollmentNo} onChange={changeHandler} />
            <div id="enrollmentNoError" className="form-text text-danger">{state.errors.enrollmentNo}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={state.email} onChange={changeHandler} />
            <div id="emailError" className="form-text text-danger">{state.errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label">Mobile number</label>
            <input type="tel" className="form-control" id="mobileNo" name='mobileNo' value={state.mobileNo} onChange={changeHandler} />
            <div id="mobileNoError" className="form-text text-danger">{state.errors.mobileNo}</div>
          </div>
          <label htmlFor="department" className="form-label">Department</label>
          <select className="form-select mb-3" name="branch" onChange={changeHandler} value={state.branch}>
            <option defaultValue>Select</option>
            <option value="Civil">Civil</option>
            <option value="Structural">Structural</option>
            <option value="Computer">Computer</option>
            <option value="Electronics">Electronics</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Production">Production</option>
            <option value="Electronics and Communication">Electronics and Communication</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          <div id="branchError" className="form-text text-danger">{state.errors.branch}</div>
          <div className="mb-3">
            <label htmlFor="semester" className="form-label">Semester</label>
            <input type="number" className="form-control" id="semester" name='semester' value={state.semester} onChange={changeHandler} />
            <div id="semesterError" className="form-text text-danger">{state.errors.semester}</div>
          </div>
          <div className="mt-3 mb-3">
            <label htmlFor="dob" className="form-label">Date of birth</label>
            <input type="date" className="form-control" id="dob" name='dob' value={state.dob} onChange={changeHandler} />
            <div id="dobError" className="form-text text-danger">{state.errors.dob}</div>
          </div>
          <label htmlFor="gender" className="form-label">Gender</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={state.gender === "Male"} onChange={changeHandler} />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={state.gender === "Female"} onChange={changeHandler} />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="gender" id="other" value="Other" checked={state.gender === "Other"} onChange={changeHandler} />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
          <div id="genderError" className="form-text text-danger">{state.errors.gender}</div>
          <div className="mb-3 mt-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={state.password} onChange={changeHandler} />
            <div id="passwordError" className="form-text text-danger text-preline">{state.errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">Re-enter password</label>
            <input type="password" className="form-control" id="repassword" name='repassword' value={state.repassword} onChange={changeHandler} />
            <div id="repasswordError" className="form-text text-danger">{state.errors.repassword}</div>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-primary" disabled={state.submitStudentDisabled}>Register</button>
          </div>
        </form>
        :
        <form className="mt-5" onSubmit={submitAdminHandler}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label htmlFor="firstname" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstname" name='firstName' value={state.firstName} onChange={changeHandler} />
              <div id="firstnameError" className="form-text text-danger">{state.errors.firstName}</div>
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="lastname" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastname" name='lastName' value={state.lastName} onChange={changeHandler} />
              <div id="lastnameError" className="form-text text-danger">{state.errors.lastName}</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={state.email} onChange={changeHandler} />
            <div id="emailError" className="form-text text-danger">{state.errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label">Mobile number</label>
            <input type="tel" className="form-control" id="mobileNo" name='mobileNo' value={state.mobileNo} onChange={changeHandler} />
            <div id="mobileNoError" className="form-text text-danger">{state.errors.mobileNo}</div>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={state.password} onChange={changeHandler} />
            <div id="passwordError" className="form-text text-danger text-preline">{state.errors.password}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="repassword" className="form-label">Re-enter password</label>
            <input type="password" className="form-control" id="repassword" name='repassword' value={state.repassword} onChange={changeHandler} />
            <div id="repasswordError" className="form-text text-danger">{state.errors.repassword}</div>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-primary" disabled={state.submitAdminDisabled}>Register</button>
          </div>
        </form> }
        <div className="mt-5">
          Already registered? <Link to='/login'>Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register

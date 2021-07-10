import React, { useState, lazy } from 'react';
import { useLocation, useHistory } from 'react-router';
import axios from 'axios';
import { retry } from '../utils/CommonFunctions';
const Login = lazy(() => retry(() => import('./Login')));

const Edit = () => {
  const location = useLocation();
  const token = location.state;

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    semester: '',
    branch: '',
    dob: '',
    gender: '',
    valid: false,
    submitDisabled: true,
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      semester: '',
      branch: '',
      dob: '',
      gender: ''
    }
  });

  const validEmailRegex =
    RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let errors = state.errors;

    switch (name) {
      case 'firstName':
        if(value.length > 0) {
          state.valid = true;
          errors.firstName = '';
        }
        else {
          state.valid = false;
          errors.firstName = '\n* First name is required!';
        }
        break;
      case 'lastName':
        if(value.length > 0) {
          state.valid = true;
          errors.lastName = ''
        }
        else {
          state.valid = false;
          errors.lastName = '\n* Last name is required!'
        } 
        break;
      case 'email':
        if(validEmailRegex.test(value)) {
          state.valid = true;
          errors.email = '';
        }
        else {
          state.valid = false;
          errors.mail = '\n* Email is not valid!';
        }
        break;
      case 'mobileNo':
        if(value.length === 10) {
          state.valid = true;
          errors.mobileNo = '';
        }
        else {
          state.valid = false;
          errors.mobileNo = '\n* Mobile number is not valid!';
        }
        break;
      case 'semester':
        if(value.length === 1) {
          state.valid = true;
          errors.semester = '';
        }
        else {
          state.valid = false;
          errors.semester = '\n* Semester is not valid!';
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

  const isFormValid = () => {
    const {firstName, lastName, email, mobileNo, semester, branch, dob, gender, valid} = state
    if(firstName && lastName && email && mobileNo && semester && branch && dob && gender && valid) {
      state.submitDisabled = false;
    }
  }

  isFormValid();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const history = useHistory();

  const data = Object.keys(state).map((key) =>
    `${key}=${encodeURIComponent(state[key])}`)
    .join('&');

  const submitHandler = (e) => {
    e.preventDefault();
      axios.put('http://localhost:3000/student/edit', data, { "headers": headers })
      .then(function (response) {
        if (response.data.success === true) {
          history.push({
            pathname: '/profile',
            state: token
          });
        }
        else {
          alert("Failed to edit student details...");
        }
      })
      .catch(function () {
        alert("Failed to edit student details...");
      });
  }

  return (
    token ? 
    <div className="container col-md-5">
      <div className="mt-5 mb-5 card card-body p-md-5">
        <div>
          <h1>
            Student<span className="text-primary">Center</span>
          </h1>
        </div>
        <form className="mt-5" onSubmit={submitHandler}>
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
          <label htmlFor="department" className="form-label">Department</label>
          <select className="form-select mb-3" name="branch" onChange={changeHandler} value={state.branch}>
            <option defaultValue>Select</option>
            <option value="Civil">Civil</option>
            <option value="Structural">Structural</option>
            <option value="Computer">Computer</option>
            <option value="Electronics">Electronics</option>
            <option value="Electrica">Electrical</option>
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
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-primary" disabled={state.submitDisabled}>Edit</button>
          </div>
        </form>
      </div>
    </div> : <Login />
  )
}

export default Edit

import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import ErrorText from "../components/ErrorText";
import Loading from "../components/Loading";
import Success from "../components/Success";
import { VALID_EMAIL_REGEX } from "./Loginscreen";

export const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;;

export default function Registerscreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [errors, setErrors] = useState({});
  const registerstate = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerstate;
  const dispatch = useDispatch();

  const isRegisterDisabled = name && email && password && cpassword && !errors['email'] && !errors['password'] && !errors['cpassword'] && !errors['name'];

  function register() {
    if (!isRegisterDisabled) {
      return;
    }
    const user = {
      name,
      email,
      password,
    };
    dispatch(registerUser(user));
  }

  const validateField = (name, value) => {
    let fieldErrors = {...errors};
    switch (name) {
      case 'name':
        switch (true) {
          case !value:
            fieldErrors['name'] = 'Required';
            break;
          case /[^A-Za-z0-9]/.test(value):
            fieldErrors['name'] = 'Should not contain special characters';
            break;
          case `${value}`.length <= 3:
            fieldErrors['name'] = 'Should contain at least four characters';
            break;
          default:
            fieldErrors['name'] = '';
            break;
        }
        break;
      case 'email':
        switch (true) {
          case !value:
            fieldErrors['email'] = 'Required';
            break;
          case !VALID_EMAIL_REGEX.test(value):
            fieldErrors['email'] = 'Enter a valid email';
            break;
          default:
            fieldErrors['email'] = '';
            break;
        }
        break;
      case 'password':
        switch (true) {
          case !value || cpassword && value === cpassword:
            fieldErrors['cpassword'] = "";
            break;
          case cpassword && value !== cpassword:
            fieldErrors['cpassword'] = "Password doesn't match";
            break;
          default:
            break;
        }
        switch (true) {
          case !value:
            fieldErrors['password'] = 'Required';
            break;
          case !VALID_PASSWORD_REGEX.test(value):
            fieldErrors['password'] = 'Not a valid password';
            break;
          default:
            fieldErrors['password'] = '';
            break;
        }
        break;
      case 'cpassword':
        switch (true) {
          case !value:
            fieldErrors['cpassword'] = 'Required';
            break;
          case value !== password:
            fieldErrors['cpassword'] = "Password doesn't match";
            break;
          default:
            fieldErrors['cpassword'] = '';
            break;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  }

  return (
    <div className="register">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          {success && <Success success="User Registered Successfully" />}
          {error && <Error error="Email already registred" />}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input
              required
              type="text"
              placeholder="name"
              autoComplete={`input${Math.random()}`}
              className={`form-control ${errors['name'] ? 'border border-danger' : ''}`}
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                validateField('name', value);
                setname(value);
              }}
            />
            <ErrorText text={errors['name']} />
            <input
              required
              type="email"
              placeholder="email"
              autoComplete={`input${Math.random()}`}
              className={`form-control ${errors['email'] ? 'border border-danger' : ''}`}
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                validateField('email', value);
                setemail(value);
              }}
            />
            <ErrorText text={errors['email']} />
            <input
              type="password"
              placeholder="password"
              autoComplete={`input${Math.random()}`}
              className={`form-control ${errors['password'] ? 'border border-danger' : ''}`}
              value={password}
              required
              onChange={(e) => {
                const value = e.target.value;
                validateField('password', value);
                setpassword(value);
              }}
            />
            <p className="mb-0 small text-muted"><small><u><strong>NOTE:</strong></u> Password should contain 8 to 15 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</small></p>
            <ErrorText text={errors['password']} />
            <input
              type="password"
              placeholder="confirm password"
              autoComplete={`input${Math.random()}`}
              className={`form-control ${errors['cpassword'] ? 'border border-danger' : ''}`}
              value={cpassword}
              required
              onChange={(e) => {
                const value = e.target.value;
                validateField('cpassword', value);
                setcpassword(value);
              }}
            />
            <ErrorText text={errors['cpassword']} />
            <button style={{width: '120px', height: '40px'}} disabled={!isRegisterDisabled} onClick={register} className="btn mt-3 mb-3 d-flex align-items-center justify-content-center">
              {loading ? <Loading /> : 'REGISTER'}
            </button>
            <Link to="login">
              <a style={{ color: "black" }}>
                Click Here To Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

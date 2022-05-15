import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { loginUser } from "../actions/userActions";
import ErrorText from "../components/ErrorText";
import Loading from "../components/Loading";

export const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const loginstate = useSelector((state) => state.loginUserReducer);
  const { loading } = loginstate;
  const dispatch = useDispatch();

  const isLoginDisabled = email && password && !errors['email'] && !errors['password'];

  function login() {
    if (!isLoginDisabled) {
      return;
    }
    const user = { email, password };
    dispatch(loginUser(user));
  }

  const validateField = (name, value) => {
    let fieldErrors = {...errors};
    switch (name) {
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
      default:
        break;
    }

    setErrors(fieldErrors);
  }

  return (
    <div className="login">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Login
          </h2>
          <div>
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
                setpassword(value);
              }}
            />
            <button style={{width: '100px', height: '40px'}} disabled={!isLoginDisabled} onClick={login} className="btn mt-3 mb-3 d-flex align-items-center justify-content-center">
              {loading ? <Loading /> : 'LOGIN'}
            </button>
            <Link to="register">
              <a style={{ color: "black" }} className="mt-2">
                Click Here To Register
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

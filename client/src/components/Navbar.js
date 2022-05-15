import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link, withRouter} from 'react-router-dom';
import { logoutUser } from "../actions/userActions";
const Navbar = (props) => {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const isAdmin = currentUser?.isAdmin;
  const dispatch = useDispatch();
  const pathname = props?.location?.pathname || '';

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <Link className="navbar-brand" to="/">
          Amri's Pizzas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i style={{ color: "black" }} className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {
              isAdmin ? (
                <Link
                  style={{
                    textDecoration: pathname.includes('/admin') ? 'underline' : 'none'
                  }}
                  className="nav-item active" to="/admin">
                  <a className="nav-link">Dashboard</a>
                </Link>
              ) : null
            }
            <Link
              style={{
                textDecoration: pathname === '/orders' ? 'underline' : 'none'
              }}
              className="nav-item" to="/orders">
              <a className="nav-link">Orders</a>
            </Link>
          </ul>
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <div className="dropdown mt-2">
                <a
                  style={{ color: "black" }}
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {currentUser.name}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  style={{
                    right: 0,
                    left: 'unset'
                  }}
                >
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    <li>Logout</li>
                  </a>
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="login">
                    Login
                </Link>
              </li>
            )}
            {cartstate.cartItems.length ? (
              <li className="nav-item">
                <Link className="nav-link" to="cart">
                  Cart {cartstate.cartItems.length}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
import React from "react";
import { useContext } from "react";

import { Link } from "react-router-dom";
import "./auth.css";
import { AuthContext } from "../../context/AuthContext";
const NotView = () => {
 const {userId}=useContext(AuthContext)
  return (
    <div className="not-view is-flex is-align-items-center is-justify-content-center">
      <div className="container">
        <div className="column has-text-centered">
          {userId ? (
            <>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                Not Found This Page
              </h1>
              <Link to="/" className="button is-success large is-size-5 mt-6">
                Go Home
              </Link>
            </>
          ) : (
            <>
            <h1 className="has-text-white has-text-centered is-size-1  is-fullwidth">WELCOME TO OUR SOCIAL APP</h1>
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
                For Visit Website First Login
              </h1>
              <Link
                to="/login"
                className="button is-success large is-size-5 mt-6"
              >
                Login 
              </Link>
              <Link
                to="/register"
                className="button is-success large is-size-5 mt-6 ml-1"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotView;

import React from "react";


import { Link } from "react-router-dom";
import "./auth.css";


const AdminComponent = () => {

  return (
    <div className="not-view is-flex is-align-items-center is-justify-content-center">
      <div className="container">
        <div className="column has-text-centered">
          
              <h1 className="has-text-white has-text-centered is-size-2 is-fullwidth">
             You Are Not Admin And Cant Watch this Section
              </h1>
              <Link to="/" className="button is-success large is-size-5 mt-6">
                Go Home
              </Link>
            
     
        
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;

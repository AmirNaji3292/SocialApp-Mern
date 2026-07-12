import React from "react";
import "./follow.css";

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";



const Followers = () => {
  const { state } = useLocation();

  return (
    <div className="container">
    <Navbar/>
      <div >
        <div className="mt-4 mb-4">
          <span className="text-[40px] font-simibold ">
           Your Followers
          </span>
      
        </div>
        <div>
          <div >
          {
            state.map((item) => {
              return (
                <div  className="bg-sky-300 w-[25%] p-2 rounded-lg " key={item._id}>
               
                   <div className="ml-">
                   <img className="rounded-[47%]" src={item.profilePhoto} width="100" alt="" />
                   </div>

                   <div className="ml-4 ">

                    <span className="text-[25px] mr-4 mb-2 mt-2">{item.firstName}    </span>
                    <div>
                    <Link to={`/profileuser/${item._id}`}  className="text-semibold">
                      watch
                    </Link>
                    </div>
                
                   </div>
                   
                 
                   <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;

import React from "react";

import { useContext } from "react";

import { useEffect } from "react";
import "./users.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";

const Users = () => {
   const{alluser,getUser,blockUser,unBlockUser}=useContext(AuthContext)
   
  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="container bg-sky-950 p-4 min-h-[100vh]">
    <Navbar/>
      <div className="columns mt-4 ">
        <div className="column ">
          <table className="table table-user w-[80%] ">
            <thead >
              <tr >
                <th >Number</th>
                <th>Name</th>
                <th>Lastname </th>
                <th >Email</th>
                <th>Favorite</th>
                <th> Send Message</th>
                <th>See Profile</th>
                <th >Status</th>
              </tr>
            </thead>
            <tbody>
              {alluser &&
                alluser?.map((user, index) => {
                  return (
                    
                    <tr key={user._id}>
                      <th>{index + 1}</th>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user?.followers?.length}</td>
                      <td>
                        <Link
                          state={user.email}
                          to="/user/send-email"
                          className="button is-link"
                        >
                         Send Message
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/profileuser/${user._id}`}
                          className="button is-success"
                        >
                         Profile
                        </Link>
                      </td>

                      <td>
                        {user.isBlocked ? (
                          <button
                            onClick={() => unBlockUser(user._id)}
                            className="button is-dark"
                          >
                           Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUser(user._id)}
                            className="button is-danger"
                          >
                           Block
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

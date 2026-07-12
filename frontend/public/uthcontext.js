import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [errorRegsiter, setErrorRegister] = useState([]);
  const [loginError, setLoginError] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [expire, setExpire] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userData, setUserData] = useState([])
  const [emailUser, setEmailUser] = useState("")
  const [errorVerifyAccount,setErrorVerifyAccount] = useState(null)
  const [users, setUsers] = useState([])
  const [popularUsers, setPopularUsers] = useState([]);
  const [findFollow, setFindFollow] = useState(null)
  const [errorForgetPassword,setErrorForgetPassword] = useState("")
  const [isAdmin,setIsAdmin] = useState(true)
  const navigate = useNavigate();



  useEffect(() => {
    refreshToken();
  }, []);


  
  const refreshToken = async () => {
    try {
      const response = await axios.get(`${baseUrl}/token`);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUserId(decoded.userId);
      setExpire(decoded.exp);
      setProfilePhoto(decoded.profilePhoto);
      setEmailUser(decoded.emailuser)
      setIsAdmin(decoded.admin)
      // navigate("/");
    } catch (error) {
      console.log(error);
      // navigate("/login", { replace: true });
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${baseUrl}/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId);
        setExpire(decoded.exp);
        setProfilePhoto(decoded.profilePhoto);
        setEmailUser(decoded.emailuser)
        setIsAdmin(decoded.admin)
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const res = await axiosJWT.get("http://localhost:5000/api/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data)
  };

  const register = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/register`, data);
      toast(res.data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      navigate("/login")
    } catch (error) {
      console.log(error);
      setErrorRegister(error.response.data.message);
    }
  };

  const login = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/api/users/login`, data);
      setUserId(res.data.userId);
      setProfilePhoto(res.data.profilePhoto);
      setEmailUser(res.data.emailuser)
      setIsAdmin(res.data.admin)
      navigate("/")
      console.log(res);
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };


  const Profile = async(userId)=> {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${userId}`,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const ProfileUser = async(id)=> {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users/profile/${id}`,{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const profilePhotoUpload = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data);
      const res = await axiosJWT.put(`${baseUrl}/api/users/profilephoto-upload`, formData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      Profile()
      toast(res.data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  }


  const ProfileUpdate = async(data)=>{
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/${userId}`,data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast(res.data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  }

  const follow = async(followId)=> {
    const data = {
      followId: followId
    }
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/follow`,data, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
      ProfileUser(followId)
    } catch (error) {
      console.log(error);
    }
  }

  const unFollow = async(unFollowId) => {
    const data = {
      unFollowId: unFollowId
    }

    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/unfollow`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      ProfileUser(unFollowId)
    } catch (error) {
      console.log(error);
    }
  }

  const sendEmail = async(data)=>{
    try {
      const emailData = {
        to: data.email,
        subject: data.subject,
        message:data.description,
        email: emailUser
      }
      const res = await axiosJWT.post(`${baseUrl}/api/email`, emailData, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      toast(res.data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  }


  const verifyUser = async() => {
   try {
     const data = {
       user: userId
     }
    const res = await axiosJWT.post(`${baseUrl}/api/users/generate-verify-email-token`,data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    toast(res.data, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
   } catch (error) {
     console.log(error);
   }
  }


  const verifyAccount = async(token)=>{
    try {
      const data = {
        token: token,
      }
      const res = await axiosJWT.put(`${baseUrl}/api/users/verify-account`, data, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorVerifyAccount(error.response.data.message)
    }
  }


  const blockUser = async(id) => {
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/block-user/${id}`,id, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
      getUsers()
    } catch (error) {
      console.log(error);
    }
  }

  const unBlockUser = async(id) => {
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/unblock-user/${id}`,id, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
      getUsers()
    } catch (error) {
      console.log(error);
    }
  }


  const updataPassword = async(data) => {
    const formPassword = {
      password : data.password
    }
    try {
      const res = await axiosJWT.put(`${baseUrl}/api/users/password`, formPassword, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
      toast(res.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "dark",
      });
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }


  const logout = async()=> {
    try {
      const res = await axios.delete(`${baseUrl}/api/users/logout`);
      navigate("/login")
      setUserId("")
      toast(res.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  }


  const popularUser = async () => {
    try {
      const res = await axiosJWT.get(`${baseUrl}/api/users/popular`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setPopularUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const findFollower = async(followId)=>{
    const data = {
      userId: userId,
      followId: followId
    }
    try {
      const res = await axiosJWT.post(`${baseUrl}/api/users/findFollower`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setFindFollow(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const deleteUser = async() => {
    try {
      const res = await axiosJWT.delete(`${baseUrl}/api/users/${userId}`, {
        headers: {
          authorization : `Bearer ${token}`
        }
      })
     if(res.status === 200){
      toast(res.data, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      setUserId("")
      Cookies.remove("refreshToken")
      navigate("/register")
     }
    } catch (error) {
      console.log(error);
    }
  }


  const resetPasswordToken = async(data)=> {
    try {
      const res = await axios.post(`${baseUrl}/api/users/forget-password-token`, data)
      toast(res.data.msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      setErrorForgetPassword(error.response.data.message)
    }
  }

  const newPassword = async(data) => {
    try {
      const res = await axios.put(`${baseUrl}/api/users/reset-password`, data)
      toast(res.data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
      });
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        errorRegsiter,
        login,
        loginError,
        getUsers,
        userId,
        profilePhoto,
        axiosJWT,
        token,
        Profile,
        userData,
        profilePhotoUpload,
        ProfileUpdate,
        ProfileUser,
        follow,
        unFollow,
        sendEmail,
        verifyUser,
        verifyAccount,
        errorVerifyAccount,
        users,
        blockUser,
        unBlockUser,
        updataPassword,
        logout,
        popularUser,
        popularUsers,
        findFollower,
        findFollow,
        deleteUser,
        resetPasswordToken,
        errorForgetPassword,
        newPassword,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

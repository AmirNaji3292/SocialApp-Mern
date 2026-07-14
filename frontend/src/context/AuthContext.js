import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";


export const AuthContext=createContext()



export const AuthContextProvider=({children})=>{

    const [ErrorRegister,setErrorRegister]=useState([])
    const [errorLogin,setErrorLogin]=useState([])
    const [token , setToken]=useState('')
    const [userId,setUserId]=useState("")
    const [expire,setExpire]=useState("")
    const [ProfilePhoto,setProfilePhoto]=useState("")
    const [userData,setUserData]=useState([])
    const [userProfile,setUserProfile]=useState([])
    const [AccountError,setAccountError]=useState(null)
    const [alluser,setAlluser]=useState([])
    const [popularuser,setPopularuser]=useState([])
    const [findFollow,setFindFollow]=useState(null)
    const [chef , setChef]=useState(true)



    const navigate=useNavigate()
    




    useEffect(()=>{
        refreshToken()
    },[])
 
 
    const refreshToken=async()=>{
        try {
            const response=await axios.get(`${baseUrl}/api/token`, {
             withCredentials: true,})


             setToken(response.data.accessToken)
          const decode= jwtDecode(response.data.accessToken)
          setUserId(decode.userId)
          setExpire(decode.exp)
          setProfilePhoto(decode.profilePhoto)
          setChef(decode.isAdmin)
        //   navigate('/')

        } catch (error) {
            console.log(error)
            
        }
    }


const axiosJwt = axios.create({
  withCredentials: true,
});

axiosJwt.interceptors.request.use(async (config) => {
  const currentDate = new Date();

  if (expire * 1000 < currentDate.getTime()) {
    const response = await axios.get(`${baseUrl}/api/token`, {
      withCredentials: true,
    });

    config.headers.Authorization = `Bearer ${response.data.accessToken}`;

    setToken(response.data.accessToken);

    const decode = jwtDecode(response.data.accessToken);

    setUserId(decode.userId);
    setExpire(decode.exp);
    setProfilePhoto(decode.profilePhoto);
    setChef(decode.isAdmin);
  }

  return config;
});

    // const axiosJwt=axios.create()
    // axiosJwt.interceptors.request.use(async(config)=>{
    //     const currentDate=new Date()
    //     if(expire * 1000 < currentDate.getTime()){
    //         const response=await axios.get(`${baseUrl}/api/token`)
    //         config.headers.Authorization=`Bearer ${response.data.accessToken}`
    //         setToken(response.data.accessToken)
    //         const decode= jwtDecode(response.data.accessToken)
    //         setUserId(decode.userId)
    //         setExpire(decode.exp)
    //       setProfilePhoto(decode.profilePhoto)
    //       setChef(decode.isAdmin)

  
    //     }return config;
    // },(err)=>{
    //     return Promise.reject.error
    // })
    
// Get all users 
  const getUser=async()=>{
    try {
        const res=await axiosJwt.get(`${baseUrl}/api/users`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setAlluser(res.data)
    } catch (error) {
        console.log(error)
    }
  }



   
// register func

const register=async(data)=>{
    try {

       const result=await axios.post(`${baseUrl}/api/users/register`,data,{withCredentials:true})
      
       toast(result.data, {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
      
           });
          navigate('/login')
    } catch (error) {
     setErrorRegister(error.response.data.message)
    }
}


// login

const login=async(data)=>{
    try {
       const res=await axios.post(`${baseUrl}/api/users/login`,data, {
         withCredentials: true,})

  
        setUserId(res.data.userId)
        setProfilePhoto(res.data.profilePhoto)
        setChef(res.data.isAdmin)
      
     
    
      navigate('/')
       toast('you login successfully', {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
      
           });
          
    } catch (error) {
        // console.log(error)
      
     setErrorLogin(error.response.data.message)
    }
}


// PROFILE
     const Profile=async(userId)=>{
        
        try {
            const res=await axiosJwt.get(`${baseUrl}/api/profile/${userId}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
        
          setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
     }
   
    //   upload profile photo
     const uploadProfilePhoto=async(data)=>{
      
        try {
            const formData=new FormData()
            formData.append("image",data)
          
            const res=await axiosJwt.put(`${baseUrl}/api/upload-photo-profile`,formData,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
           
            toast(res.data, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
           
                });
                Profile()

        } catch (error) {
            console.log(error)
            
        }
     }

    //  update Profiel
    const UpdateProfile=async(data)=>{
        try {
            const res=await axiosJwt.put(`${baseUrl}/api/updateuser/${userId}`,data,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            navigate('/profile')

            toast(res.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
           
                });
        } catch (error) {
            console.log(error)
            
        }
    }


    // Profileuser
    const Profileuser=async(id)=>{
     
     try {
        const res=await axiosJwt.get(`${baseUrl}/api/user/${id}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
      
        setUserProfile(res.data)
     
     } catch (error) {
        console.log(error)
        
     }
    }

     // follow func
      const Follow=async(followId)=>{
        const data={
           followId:followId
        }
        try {
        const res=await axiosJwt.put(`${baseUrl}/api/follow`,data,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        Profileuser(followId)
      
        } catch (error) {
        console.log(error)
            
        }
      }
 
// unfollow function
   const Unfollow=async(unfollowId)=>{
    const data={
        unfollowId:unfollowId
     }
     try {
     const res=await axiosJwt.put(`${baseUrl}/api/unfollow`,data,{
         headers:{
             authorization:`Bearer ${token}`
         }
     })
     Profileuser(unfollowId)

    
     } catch (error) {
     console.log(error)
         
     }
   }

// Send Email
        const sendEmail=async(data)=>{
          try {
            const emailData={
                to:data.email,
                subject:data.subject,
                message:data.message
            }
            const res=await axiosJwt.post(`${baseUrl}/api/sendmessage`,emailData,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
              console.log(res)
            toast(res.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
           
                });
          } catch (error) {
         console.log(error)
            
          }
        }
//  verifyAccount
        const verifyAccount=async()=>{
            const data={
                user:userId
            }
            try {
                const res=await axiosJwt.post(`${baseUrl}/api/create-verifyaccount`,data,{
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                console.log(res)
            } catch (error) {
         console.log(error)
                
            }
        }
//  verifyEnd Account
 const endVerifyAccount=async(token)=>{
     const data={
        token:token
     }
    try {
        const res=await axiosJwt.put(`${baseUrl}/api/verifyaccount`,data,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(res)
    } catch (error) {
        console.log(error.response.data.message);
        setAccountError(error.response.data.message)
        
    }
 }

//  blockUser
  const blockUser=async(id)=>{
    
    try {
        const res=await axiosJwt.put(`${baseUrl}/api/block/${id}`,id,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        getUser()
    } catch (error) {
        console.log(error)
        
    }
  }



//  unBlockUser
const unBlockUser=async(id)=>{
    
    try {
        const res=await axiosJwt.put(`${baseUrl}/api/unblock/${id}`,id,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        getUser()
    } catch (error) {
        console.log(error)
        
    }
  }

// updataPassword
 const updataPassword=async(data)=>{
    try {
        const res=await axiosJwt.put(`${baseUrl}/api/editpassword`,data,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        toast(res.data, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
       
            });
    } catch (error) {
        console.log(error)
    }
 }

        // log out
       const logOut=async()=>{
        try {
            const res=await axiosJwt.delete(`${baseUrl}/api/user/logout`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            setUserData("")
            navigate('/login')
            toast(res.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
           
                });
            
        } catch (error) {
        console.log(error)
            
        }
       }
// getPopularUser
const getPopularuser=async()=>{
    try {
        const res=await axiosJwt.get(`${baseUrl}/api/getpopularusers`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        setPopularuser(res.data)
    } catch (error) {
        console.log(error)
        
    }
}

// findFollower
  const findFollower=async(followId)=>{
    const data={
        userId:userId,
        followId:followId
    }
    try {
        const res=await axiosJwt.post(`${baseUrl}/api/findfollower`,data,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        setFindFollow(res.data)
    } catch (error) {
        console.log(error)
        
    }
  }

//   delete account
  const deleteAccount=async(userId)=>{
    try {
        const res=await axiosJwt.delete(`${baseUrl}/api/delete/${userId}`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        toast(res.data, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
       
            });
        setUserData("")
        navigate('/register')
    } catch (error) {
        console.log(error)
    }
  }
  
//   reset password
   const getEmailForForgetPassword=async(data)=>{
    try {
        const res=await axios.post(`${baseUrl}/api/forgetpassword`,data)

        toast(res.data, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
       
            });
    } catch (error) {
        console.log(error)
    }
   }
        
  //new password
    const newPassword=async(data)=>{
        try {
       
            const res=await axios.put(`${baseUrl}/api/verifypassword`,data)
            toast(res.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
           
                });
                navigate('/login')
        } catch (error) {
          console.log(error)
            
        }
    }


    return(
        <AuthContext.Provider value={{chef,newPassword,getEmailForForgetPassword,deleteAccount,findFollower,findFollow,getPopularuser,popularuser,logOut,updataPassword,blockUser,unBlockUser,alluser,AccountError,endVerifyAccount,verifyAccount,sendEmail,Unfollow,Follow,Profileuser,userProfile,userData,UpdateProfile,uploadProfilePhoto,Profile,getUser,register,ErrorRegister,login,errorLogin,userId,ProfilePhoto,axiosJwt,token}}>
            {children}
        </AuthContext.Provider>
    )
}
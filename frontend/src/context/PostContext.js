import {createContext, useContext, useState}from 'react'
import { AuthContext } from './AuthContext'
import { toast } from "react-toastify";
import { baseUrl } from '../utils/baseUrl'
import { useNavigate } from 'react-router-dom'

export const PostContext=createContext()




export const PostContextProvider=({children})=>{
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const [singlePost,setSinglePost]=useState("")
    const [popularPoststate,setPopularPoststate]=useState([])
    const[errorPost,setErrorPost]=useState("")
    const{userId,token,axiosJwt}=useContext(AuthContext)


    const createPost=async(data)=>{
        try {
            const formData= new FormData();
            formData.append('title',data.title)
            formData.append('description',data.description)
            formData.append('image',data.image)
            formData.append('category',data.category)
            formData.append('user',userId)
          const res=await axiosJwt.post(`${baseUrl}/api/createpost`,formData,{
            headers:{
                authorization:`Bearer ${token}`
            }
          })
          navigate('/')
          toast(res.data, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
       
            });
        } catch (error) {
            setErrorPost(error.response.data.message)
        }
    }

    const getPosts=async()=>{
        try {
            const res=await axiosJwt.get(`${baseUrl}/api/getallpost`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            }
            )
            setPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const detailPost=async(id)=>{
        try {
            const res=await axiosJwt.get(`${baseUrl}/api/getsinglepost/${id}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            setSinglePost(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }
// edit post
    const EditPost=async(data)=>{
      try {
        const res=await axiosJwt.put(`${baseUrl}/api/updatepost/${data.id}`,data,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        navigate(`/detail-post/${data.id}`)
     
        toast(res.data, {
          position: "bottom-right",
          autoClose: 4000,
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


// delete post
    const deletPost=async(id)=>{
        try {
            const res=await axiosJwt.delete(`${baseUrl}/api/deletepost/${id}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            navigate('/')
            toast(res.data, {
              position: "bottom-right",
              autoClose: 4000,
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

   

    const likePost=async(id)=>{
        const data={
            id:id
        }

        try {
           const res= await axiosJwt.put(`${baseUrl}/api/likepost`,data,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            getPosts()
        } catch (error) {
        console.log(error)
            
        }
    }



    const dislikePost=async(id)=>{
        const data={
            id:id
        }
        try {
            await axiosJwt.put(`${baseUrl}/api/dislikepost`,data,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })
            getPosts()
        } catch (error) {
        console.log(error)
            
        }
    }
// popularposts
  const PopularPost=async()=>{
    try {
        const res=await axiosJwt.get(`${baseUrl}/api/popularposts`,{
            headers:{
                authorization:`Bearer ${token}`

            }
        })
        setPopularPoststate(res.data)
    } catch (error) {
        console.log(error)
        
    }
  }

    return(
        <PostContext.Provider value={{errorPost,PopularPost,popularPoststate,createPost,dislikePost,likePost,getPosts,posts,detailPost,singlePost,EditPost,deletPost}}>
            {children}
        </PostContext.Provider>
    )
}
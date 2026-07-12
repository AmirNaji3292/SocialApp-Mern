import {createContext, useContext, useEffect, useState}from 'react'
import { AuthContext } from './AuthContext'
import { baseUrl } from '../utils/baseUrl'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export const CategoryContext=createContext()




export const CategoryContextProvider=({children})=>{

    const{token,axiosJwt}=useContext(AuthContext)
    const [category,setCategory]=useState([])
    const navigate=useNavigate()

    const createCategory=async(data)=>{
     try {
        const result=await axiosJwt.post(`${baseUrl}/api/createcat`,data,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        
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
            getAllCategory()
     } catch (error) {
        console.log(error)
     }
    }

    useEffect(()=>{
        getAllCategory()
    },[])


    const getAllCategory=async()=>{
        try {
            const res=await axiosJwt.get(`${baseUrl}/api/getallcat`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }})
            setCategory(res.data)

        } catch (error) {
        console.log(error)
            
        }
    }




    const EditCat=async(data)=>{
        try {
            const res=await axiosJwt.put(`${baseUrl}/api/updatecat/${data.id}`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
           navigate('/add-category')
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
        } catch (error) {
        console.log(error)
            
        }
    }





  const deleteCat=async(id)=>{
    try {
        const res=await axiosJwt.delete(`${baseUrl}/api/deletecat/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
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
            getAllCategory()
    } catch (error) {
        console.log(error)
    }
  }






    return(
        <CategoryContext.Provider value={{getAllCategory,deleteCat,EditCat,createCategory,category}}>
            {children}
        </CategoryContext.Provider>
    )
}
import React, { useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import logo from "../../assets/images/logo.svg"
import { AuthContext } from '../../context/AuthContext'
import { AiOutlineDownload } from "react-icons/ai";





const Navbar = () => {

 const {userId,ProfilePhoto,logOut}=useContext(AuthContext)
 const [show , setShow]=useState(false)

  const {chef}=useContext(AuthContext)

  return (
     <nav className="navbar" role="navigation" aria-label="main navigation">
 
 <div className="navbar-brand">

 <Link to="/" className='navbar-item'>
               <img src={logo} width="200" height="28" alt="" />
          </Link>

      {
        userId && <Link to='/create-post' className='button is-danger mt-1'> <AiOutlineDownload className='is-size-4 mr-2 '/>Send Post</Link>
      }
          
     </div>

 

   
    <div className="navbar-end mr-[80px]">
      {
        userId?<>
         
           <Link to="/"  className="navbar-item font-semibold">Home</Link>
           {chef ?(<>
            <Link to="/users"  className="navbar-item font-semibold">Users</Link>
            <Link to="/add-category"  className="navbar-item font-semibold">Add Category</Link>
           </>):(<>
            <Link to="/admin"  className="navbar-item ">Users</Link>
            <Link to="/admin"  className="navbar-item ">Add Category</Link>
           </>)}
            
          
         
          
           <span className='relative ' onClick={()=>setShow(!show)}>
            <img src={ProfilePhoto} className='rounded-[47%] is-flex is-align-items-center is-justify-content-center mt-2'width={40}/>
            {show?<span className='flex flex-col  bg-lime-300 w-[120px] p-3 absolute rounded-lg '>
                <div >
                <Link className='hover:bg-white p-1 text-cyan-700 font-semibold' to='/change-password'>changePass</Link>
                </div> 
                <div>

                 <Link className='hover:bg-white p-1  text-cyan-700 font-semibold' to='/profile'>Profile</Link>
                </div>
                <div>

                 <Link className='hover:bg-white p-1  text-cyan-700 font-semibold' onClick={logOut} >Log out</Link>
                </div>
              </span>:""}
          </span>
          
          
        </>:<>
        <Link to="/login" className="navbar-item font-semibold text-xl">
          login
         </Link>
   
         <Link to="/register" className="navbar-item font-semibold text-xl">
           register
         </Link>
 
        </>
      }
 

       
       </div>
    
   
   </nav>
  )
}

export default Navbar
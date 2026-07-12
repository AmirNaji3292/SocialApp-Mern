import React, { useContext, useEffect } from 'react'
import { PostContext } from '../../../context/PostContext'
import { Link } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai";
import { AuthContext } from '../../../context/AuthContext';


function Sidebar() {

    const {popularPoststate,PopularPost}=useContext(PostContext)
    const{getPopularuser,popularuser}=useContext(AuthContext)

    useEffect(()=>{
      PopularPost()
      getPopularuser()
     
    },[])
 

  return (
    <aside className="menu">
      <div className="post-menu has-background-white box">
        <p className='menu-label is-size-5'> Popular Posts </p>
        <ul className="menu-list">
          {
            popularPoststate?.map(post => {
              return (
                <li key={post._id} className='mt-4'>
                  <div className="flex justify-between items-center bg-red-100">
                    <div className="img-box is-flex is-align-items-center w-[100%]">
                      <img src={post.image} width="50" alt="" />
                      <p className='mr-3 is-flex is-align-items-center'><AiOutlineEye className='ml-1' />{post.numViews}</p>
                      <h4 className='is-size-6 mr-2 '>{post.title}</h4>
                    </div>
                    <Link to={`/detail-post/${post._id}`} className='button max-w-[120px]'>View Post</Link>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>



      <div className="post-menu has-background-white box">
        <p className='menu-label is-size-5'> Popular User </p>
        <ul className="menu-list">
          {
            popularuser?.map(user => {
              return (
                <li key={user._id} className='mt-4'>
                  <div className="flex justify-between items-center bg-green-100">
                    <div className="img-box is-flex is-align-items-center w-[100%]">
                      <img src={user.image} width="50" alt="" />
                      <p className='mr-3 is-flex is-align-items-center'><AiOutlineEye className='ml-1' />{}</p>
                     
                      <h4 className='is-size-6 mr-2 '>{user.firstName}</h4>
                    </div>
                    <Link to={`/profileuser/${user._id}`} className='button max-w-[120px]'>View User</Link>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}


export default Sidebar
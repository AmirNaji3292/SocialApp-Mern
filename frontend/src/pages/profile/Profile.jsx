import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BsFillExclamationTriangleFill,  BsFillEmojiFrownFill, BsHeart,BsFillPencilFill,BsWalletFill } from "react-icons/bs";
import { AiOutlineEye,AiFillLike,AiTwotoneDislike } from "react-icons/ai";
import {BiImport} from 'react-icons/bi'
import "./profile.css";


import moment from "jalali-moment";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { PostContext } from '../../context/PostContext';


const Profile = () => {

    const {likePost, disLikePost} = useContext(PostContext)
    const { Profile, userData,uploadProfilePhoto,verifyAccount,deleteAccount,userId,chef } = useContext(AuthContext);
    const [file, setFile]=useState('')
    const [showbtn, setShowbtn]=useState(false)

    const inputRef=useRef(null)

    const handleClick=()=>{
      inputRef.current.click()
      setShowbtn(true)
    }

    const uploadphoto=async()=>{
  
      uploadProfilePhoto(file)
    }

    useEffect(() => {
      Profile(userId);
     
    }, []);

  
    return (
      <div className="container bg-sky-800 p-4">
        <Navbar/>
  
        {!userData.isAccountVerified ? (
          <div className="not-verified has-background-danger is-size-5 is-flex is-align-items-center mt-4">
            <h1 className="p-3 has-text-warning is-flex is-align-items-center">
              <BsFillExclamationTriangleFill className="ml-2" /> 
               account didnot verified
              <button onClick={verifyAccount} className="is-size-6 has-text-white button is-info mr-3">
                Click for Verify Your Account.
              </button>
            </h1>
          </div>
        ) : (
          ""
        )}
  
        <div className="columns mt-6">
          <div className="column bg-lime-200">
            <div className="profile-information">
              <div className="profile-photo is-flex">
                <div className="profile">
                  <img className='rounded-2xl' src={userData.profilePhoto} width="100" alt="" />
                   <div>
                   <button onClick={handleClick}>
                   <BiImport className='text-[28px]'/>
                       <input 
                        type="file"
                        name="file"
                        ref={inputRef}
                        hidden
                        onChange={e => setFile(e.target.files[0])} />
                   </button>
                  { showbtn && <button onClick={uploadphoto}>
                     upload
                   </button>}
                   
                   </div>
                </div>
                <div className="account-verify pr-5">
                  {userData?.isAccountVerified ? (
                    <div className="has-background-success box mb-0 p-1 has-text-centered has-text-white">
                      your account hasbeen verified.
                    </div>
                  ) : (
                    <div className="has-background-danger box mb-0 p-1 has-text-centered">
                       your account hasbeen Not verified.
                    </div>
                  )}
  
                  <div className="is-flex is-size-4 mt-4">
                    <div className='font-semibold ml-3'>{userData.firstName}</div>
                    <div className="mr-1 font-semibold ml-1">{userData.lastName}</div>
                  </div>
                  <div className="profile-info mt-6">
                     date for membership :{" "}
                    {moment(userData.createdAt).format("YYYY/M/D")}
                  </div>
                  <div className="total-follow mt-3 is-flex mb-4">
                       <div className="ml-4 ">
                            {userData?.posts?.length}  Posts
                       </div>
                       <Link to="/followers" state={userData.followers} className="ml-4">
                            {userData?.followers?.length}   followers
                       </Link>
                       <Link to="/following" state={userData.following} className="ml-4">
                            {userData?.following?.length}     following
                       </Link>
                       </div>
              </div>
            </div>

        
                    <div className="follower-item is-flex is-align-items-center  mr-6 ml-6">
                         
                         <div className="profile-update flex  ">
                         <button className="is-flex is-align-items-center is-size-6 ml-3 button is-warning">
                              <Link to="/update-profile" state={userData}>
                                   Edit Profile
                              </Link>
                              <BsFillPencilFill className='ml-1'/>
                         </button>
                         <button onClick={()=>{deleteAccount(userId)}} className='button is-danger ml-2'>
                           Delete Account
                         </button>
                    </div>
                    </div>

                    

                    <div className="send-message mt-6">
                        {chef &&  <button className="is-flex is-align-items-center is-size-6 mt-2 ml-3 button is-link">
                              <Link to="/user/send-email" className="has-text-white ml-2 ">
                                   Send Message
                              </Link>
                              <BsWalletFill className='ml-1'/>
                         </button>}
                    </div>


          </div>
          <div className="mt-6 mr-6 font-semibold"> about me : {userData.bio}</div>
        </div>
      </div>

     <div className="columns pt-6 bg-sky-400">
          <div className="column is-three-quarters">
          {userData.posts && userData?.posts?.map((post)=> (
       <div className="box" key={post._id}>
       <article className="media">
      
         <div className="media-content">
           <div className="content">
              <div className='is-flex is-justify-content-space-between mb-5'>
              <strong>{post.user.firstName}</strong>
              <strong>{moment(post.createdAt).locale("fa").format("YYYY/M/D")}</strong>

              </div>
              <Link to={`/detail-post/${post._id}`}>
              <figure className='image w-[256px]'>
                <img src={post?.image} alt="" className='rounded-xl' />
              </figure>

              <p>{post.title}</p>
              </Link>
           </div>
           <nav className="level is-mobile is-align-items-center">
             <div className="level-left">
                <a className='level-item'>
                  <span className='is-small is-flex is-align-content-center'>
                    <AiOutlineEye className='is-size-4 has-text-dark' />
                    <span className='has-text-dark is-size-6 mr-1'>
                      {post.numViews ? post.numViews : " no views"}
                    </span>
                  </span>
                </a>
             </div>
             <div className="level-right">
                <a className='level-item'>
                  <span className='is-small'>
                      <AiTwotoneDislike onClick={()=> disLikePost(post._id)} className='is-size-4 has-text-danger' />
                      <span className='has-text-danger is-size-4'>
                          {
                            post.disLikes.length
                          }
                      </span>
                  </span>
                </a>
                <a className='level-item mr-2'>
                  <span className='is-small'>
                      <AiFillLike onClick={()=> likePost(post._id)} className='is-size-4' />
                      <span className=' is-size-4'>
                          {
                            post.likes.length
                          }
                      </span>
                  </span>
                </a>
              </div>
           </nav>
         </div>
       </article>
     </div>
    ))}
          </div>
          <div className="column is-one-quarters">
            <h2 className='text-[30px]'>Viewd Your Profile</h2>
            {
              userData?.viewedBy?.map((user)=>(
                <div className='mt-2' key={user._id}>
                <img className='rounded-[47%] w-[120px]' src={user.profilePhoto} alt="" />
                <div className='flex'>
                   <p className='font-semibold'> {user.firstName}</p>
                   {". "}
                   
                    <p className='font-semibold'>{user.lastName}</p>
                </div>
             </div>
              ))
            }
             
          </div>
     </div>

    </div>
  );
};

export default Profile;

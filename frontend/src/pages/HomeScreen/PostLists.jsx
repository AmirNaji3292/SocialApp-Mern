import React from 'react'
import { useContext } from 'react'

import { useEffect } from 'react'
import moment from "jalali-moment";
import { AiOutlineEye,AiFillLike,AiTwotoneDislike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { PostContext } from '../../context/PostContext';


const PostLists = () => {

  const {getPosts,posts,dislikePost,likePost} = useContext(PostContext)
  
  useEffect(()=> {
    getPosts()
 
  }, [])
 
  return (
   <>
    {posts && posts.map((post)=> (
       <div className="box" key={post._id}>
       <article className="media">
         <div className="media-right">
           <figure className="image is-64x64">
            <Link to={`/profileuser/${post?.user?._id}`}>
               <img src={post?.user?.profilePhoto} className="rounded-[47%]" alt="Image" />
            </Link>
           </figure>
         </div>
         <div className="media-content">
           <div className="content">
              <div className='is-flex is-justify-content-space-between  mb-5'>
              <strong>{post.user?.firstName || ""}</strong> 
              <strong>{moment(post.createdAt).locale("fa").format("YYYY/M/D")}</strong>

              </div>
              <Link to={`/detail-post/${post._id}`} >
              <figure className='image w-[250px] ml-10 '>
                <img src={post?.image} alt=""className='rounded-2xl' />
              </figure>

              <div className='mt-6'>
                <span className='mt-4 text-md font-semibold text-black tracking-wide'>title:</span><span className='tracking-wider text-gray-600 ml-3 text-md'>{post.title}</span>
              </div>
              </Link>
           </div>
           <nav className="level is-mobile is-align-items-center">
             <div className="level-left">
                <a className='level-item'>
                  <span className='is-small is-flex is-align-content-center'>
                    <AiOutlineEye className='is-size-4 has-text-dark' />
                    <span className='has-text-dark is-size-6 mr-1'>
                      {post.numViews ? post.numViews : " No View"}
                    </span>
                  </span>
                </a>
             </div>
             <div className="level-right">
                <a className='level-item'>
                  <span className='is-small'>
                      <AiTwotoneDislike className='is-size-4 has-text-danger' onClick={()=>dislikePost(post._id)} />
                      <span className='has-text-danger is-size-4'>
                          {
                            post.disLikes.length
                          }
                      </span>
                  </span>
                </a>
                <a className='level-item mr-2'>
                  <span className='is-small'>
                      <AiFillLike className='is-size-4' onClick={()=>likePost(post._id)}/>
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
   </>
  )
}

export default PostLists
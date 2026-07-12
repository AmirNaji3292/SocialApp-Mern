import React, { useContext, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import { PostContext } from '../../context/PostContext'
import { useEffect } from 'react'
import {  BsChevronRight } from "react-icons/bs";
import { RiDeleteBinLine, RiImageEditFill } from "react-icons/ri";

import moment from 'jalali-moment'
import AddComment from '../../components/CommentPost/AddComment'
import ShowComment from '../../components/CommentPost/ShowComment'
import DOMPurify from 'dompurify'

const DeatailPost = () => {
  
  const {detailPost, singlePost,deletPost} = useContext(PostContext)
  const [addcommentshow,setAddcommentshow]=useState(false)
  const [showcommentshow,setShowcommentshow]=useState(false)
  const {id} = useParams();
  
  useEffect(()=> {
    detailPost(id)
 
  }, [])

  return (
   <div className="container bg-sky-200 px-4 py-8">
     <Navbar />
    <div className="mt-4 text-sky-700 flex text-xl">
      Social Application<BsChevronRight className='mr-3 ml-3'  /> Our Posts
      <BsChevronRight  className='mr-3 ml-3' /> {singlePost.category}
    </div>

    <div className="single-post">
      <div className="single-post-title  mt-6 is-flex is-justify-content-space-between is-align-items-center">
        <div>
          <span className='font-bold'>Post Title :{" "}</span>
        <span className='text-[20px] text-red-600'>{singlePost.title}</span>
        </div>
        <strong className='text-red-700'>
          {moment(singlePost.createdAt).locale("fa").format("YYYY-MM-DD")}
        </strong>
      </div>
    </div>


    <div className="columns mt-6">
      <div className="column is-three-fifths">
      <div className="content mb-6">
            <div className='is-flex is-justify-content-space-between mb-5'>
              <strong>
                <div className="post-detail-user">
                  <div className="author is-flex is-align-items-center">
                    <div className="image is-64x64">
                      <img className='rounded-[47%]' src={singlePost?.user?.profilePhoto} alt="" />
                    </div>
                    <div >
                      <h3 className='text-green-500 ml-3 mb-2 '> {singlePost?.user?.firstName}</h3>
                    </div>
                  </div>
                </div>
              </strong>
              <div className="edit-post mt-3 mb-3 py-4">
                <Link className='text-[40px] text-green-600 mb-2' state={singlePost} to={`/edit-post/${singlePost._id}`}><RiImageEditFill /></Link>
                <span onClick={()=>deletPost(singlePost._id)} className='text-[40px] text-red-600 mt-6'><RiDeleteBinLine /></span>
              </div>

            </div>
            <div className="single-desc">
            <p className='is-size-5 tex-slate-700'
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(singlePost.description)
           }}
          ></p>
        </div>
          </div>
     
      </div>
      <div className="column">
        <img className='h-[300px] rounded-md' src={singlePost.image} alt="" />
      </div>
    </div>
      
      <div className='button-comment mt-6 mb-4 '>
         <button className='button is-success is-medium mr-3' onClick={()=>setAddcommentshow(!addcommentshow)}>Add Comment</button>
         <button className='button is-info is-medium'onClick={()=>setShowcommentshow(!showcommentshow)} >Show Comment</button>
      </div>
     
      {addcommentshow?<AddComment/>:""}
      {showcommentshow?<ShowComment comments={singlePost.comments} />:""}
    
     
   </div>
  )
}

export default DeatailPost
import React, { useContext, useState } from 'react'

import { BsFillTrash2Fill, BsFillChatSquareDotsFill } from "react-icons/bs";
import { CommentContext } from '../../context/CommentContext';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ShowComment = ({comments}) => {
     const {id}=useParams()
  const {userId}=useContext(AuthContext)

const {updateComment,deleteComment}=useContext(CommentContext)
     
const [show, setShow] = useState(false);
const [editComment, setEditComment] = useState({
  description: "",
});

const handleChange = (e) => {
  setEditComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleClick = async(e) => {
  e.preventDefault();
  // console.log(editComment)
  await updateComment(editComment);
   setShow(false)
};

if (comments?.length === 0) {
  return <div className="box mt-6">there is no Idea.</div>;
}





  return (
    <div className="box bg-slate-600">
     {comments.map((com)=>{
          return(
     <div key={com._id} className="comment flex justify-between items-center mb-4 p-2 bg-slate-200">
              <div className="comment-desc">{com.description}</div>
              <div>
                      <img className='w-[40px] rounded-[47%] ' src={com?.user?.profilePhoto}/>
                      <p>{com?.user?.firstName}</p>
                  
              {com?.user?._id === userId? <>
                <div className='mt-2 flex mb-3'>
                   
                   <span className='mr-4 text-red-500 text-2xl'>
                        <BsFillTrash2Fill onClick={()=>deleteComment({
                         commentId:com._id,
                         postId:id
                        })} />
                   </span>
                   <span 
                      onClick={() => setShow(!show)}
                   className='text-2xl text-green-700'>
                        <BsFillChatSquareDotsFill  onClick={() =>
                        setEditComment({
                          commentId: com._id,
                          postId: id,
                        })
                      }/>
                   </span>
              </div>
              </>:""}
              </div>
         </div>
          )
     })}
          {show ? (
        <div className="comment-edit">
          <form onSubmit={handleClick}>
            <input
              type="text"
              className="input pt-5 pb-5"
              placeholder="your idea"
              name="description"
              onChange={handleChange}
            />
            <button type="submit" className="button is-success mt-4">
              edit idea
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ShowComment
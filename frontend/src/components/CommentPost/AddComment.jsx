import React,{useContext} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { CommentContext } from '../../context/CommentContext';

const formShema=Yup.object({
     description:Yup.string().required('required text ')
})

const AddComment = () => {

  const {createComment}=useContext(CommentContext)
 

  const {id}=useParams()

     const formik=useFormik({
          initialValues:{
               description:"",
               post:id
          },
          onSubmit:(values)=>{
            createComment(values)
          },
          validationSchema:formShema
     })
  return (
       <form onSubmit={formik.handleSubmit}>
            <div className="field">
                 <label className='text-xl font-bold mb-1'> Your Comment</label>
                 <div className="control flex justify-center items-center">
                      <textarea 
                      className='text-xl max-h-[50px] p-3  rounded-xl w-[90%] bg-slate-100'
                      name='description'
                       placeholder='Write your Comment  ' 
                    //    className='textarea'
                       value={formik.values.description}
                       onChange={formik.handleChange('description')}
                       onBlur={formik.handleBlur("description")}
                       ></textarea>
                 </div>
                 <span className='text-xl text-red-700'>
                    {formik.touched.description && formik.errors.description}
                 </span>
            </div>
            <div className="field">
                 <div className="control">
                      <button type='submit' className='button is-link'>Send</button>
                 </div>
            </div>
       </form>
  )
}

export default AddComment
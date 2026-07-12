import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import *as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'



const formSchema=Yup.object({
 
    subject:Yup.string().required('subject is required'),
    message:Yup.string().required('required message')
})

const SendEmail = () => {
 
    const {state}=useLocation()
    const{sendEmail}=useContext(AuthContext)

    const formik=useFormik({
        initialValues:{
            email:state,
            subject:"",
             message:"",
        },
        onSubmit:(values)=>{
            sendEmail(values)
        },
        validationSchema:formSchema
      })
  

  

  return (
      <div className='flex justify-center items-center  bg-sky-800 h-screen'>
        <div className='w-[40%]'>
        <form className='w-[100%] ' onSubmit={formik.handleSubmit}>
        <h3 className='text-white text-semibold text-2xl mb-2 ml-[40px]'>Send Email For User</h3>
             <div className='p-2 w-[100%]'>
                <input className='p-2 w-[100%] rounded-md text-xl bg-slate-400'
                 type="text"
                  placeholder='user email'
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  disabled
                  />
             </div>
       
             <div className='p-2 mt-2 w-[100%]'>
                <input className='p-2 w-[100%] rounded-md text-xl'
                
                type="text"
                name='subject'
                value={formik.values.subject}
                onChange={formik.handleChange('subject')}
                onBlur={formik.handleBlur('subject')}
                 placeholder='subject' />
             </div>
         <p className='text-red-500 text-xl'>  {formik.touched.subject && formik.errors.subject}</p>
             <div className='p-2 mt-2 w-[100%]'>
                <textarea className='p-2 w-[100%] rounded-md text-xl' 
                name='message'
                value={formik.values.message}
                onChange={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                type="text" 
                placeholder='your message for user' />
             </div>
             <p className='text-red-500 text-xl'>  {formik.touched.message && formik.errors.message}</p>

             <div className='p-1 mt-2 w-[100%] hover:bg-red-300 text-xl  bg-white flex justify-center rounded-lg'>
                 <button type='submit' >Send</button>
             </div>
        </form>
        </div>
    </div>
  )
}

export default SendEmail
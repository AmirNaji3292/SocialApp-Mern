import React, { useContext } from 'react'

import * as Yup from "yup"
import { useFormik } from 'formik'
import Navbar from '../../Navbar/Navbar'
import { AuthContext } from '../../../context/AuthContext'
const formShema = Yup.object({
     email: Yup.string().required("Required Your Email")
})



const ResetPassword = () => {
   
     const {getEmailForForgetPassword}=useContext(AuthContext)

     const formik = useFormik({
          initialValues: {
               email: "",
          },
          onSubmit: (values) => {
               getEmailForForgetPassword(values);
          },
          validationSchema: formShema
     })

  return (
    <div className="container">
      <Navbar/>
         <div className="columns is-flex is-justify-content-center">
              <div className="column is-two-fifths">
                   <h1 
                   className='has-text-white is-size-1 has-text-centered mb-6 mt-6 pt-6'>
                        forget Password form
                   </h1>
                   <form onSubmit={formik.handleSubmit} className='p-6 has-background-dark box'>
                        <h1 className='has-text-white is-size-4 has-text-centered mb-6'>
                             Enter Your Email
                        </h1>
                        <div className="field">
                             <label className="label"> your email</label>
                             <div className="control">
                             <input 
                             type="email"
                              className='input'
                               placeholder= 'your email'
                               value={formik.values.email}
                               onChange={formik.handleChange("email")}
                               onBlur={formik.handleBlur("email")}
                               />
                               <p className='help is-danger'>
                                    {formik.touched.email && formik.errors.email}
                               </p>
                             </div>
                        </div>

                        <div className="field">
                             <button 
                             className='button is-success is-fullwidth mt-5'
                              type='submit'> Send Activate Link </button>
                        </div>
                   </form>
              </div>
         </div>
    </div>
  )
}

export default ResetPassword
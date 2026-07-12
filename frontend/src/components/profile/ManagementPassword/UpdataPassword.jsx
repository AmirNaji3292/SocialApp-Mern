import React from 'react'

import { useFormik } from 'formik';
import * as Yup from "yup";
import { useContext } from 'react';

import Navbar from '../../Navbar/Navbar';
import { AuthContext } from '../../../context/AuthContext';
const formSchema = Yup.object({
     password: Yup.string().min(6, "  min 4 char ").max(20, "  max 20 char ").required("    Required password"),
})
const UpdataPassword = () => {

const {updataPassword}=useContext(AuthContext)
     const formik = useFormik({
          initialValues: {
               password: "",
          },
          onSubmit: (values) => {
               updataPassword(values)
          },
          validationSchema: formSchema
     });


  return (
    <div className="container bg-sky-600  p-5 h-[100vh]">
     <Navbar/>
         <div className="columns is-flex is-align-items-center is-justify-content-center mt-6 pt-6">
              <div className="column is-two-fifths mt-6 pt-6">
                   <form onSubmit={formik.handleSubmit}>
                        <h1 className='has-text-white is-size-4 has-text-centered mb-6'>
                              New Password</h1>
                             <div className="field">
                                  <label className="label">Password</label>
                                  <div className="control">
                                  <input type="text"
                                   className="input"
                                    placeholder=' your password' 
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    />
                             </div>
                             <p className='help is-danger'>
                                  {formik.touched.password && formik.errors.password}
                             </p>
                        </div>
                             <div className="field mt-5">
                                  <div className="control">
                                       <button type='submit' className='button is-link is-fullwidth '>Save</button>
                                  </div>
                             </div>
                   </form>
              </div>
         </div>
    </div>
  )
}

export default UpdataPassword
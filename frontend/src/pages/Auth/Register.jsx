import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./auth.css"

import { useFormik } from 'formik'
import *as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'

const formSchema=Yup.object({
     firstName:Yup.string().required("Name is required."),
     lastName:Yup.string().required('lastName is required'),
     email:Yup.string().email().required('email is required'),
     password:Yup.string().required('required password').min(4,'latest charakter is 4')
})



const Register = () => {

     const {register,ErrorRegister}=useContext(AuthContext)

   const formik=useFormik({
     initialValues:{
          firstName:"",
          lastName:"",
          email:"",
          password:"",
     },
     onSubmit:(values)=>{
          register(values)
     },
     validationSchema:formSchema
   })
 


  return (
    <div className='container bg-sky-900 p-5'>
         <Navbar />
         <div className="columns is-flex is-align-items-center auth">
         <div className="column ">
                   <h1 className='has-text-centered is-size-2 has-text-weight-bold text-black'> Wellcome our Society </h1>
                   <h2 className='has-text-centered is-size-3 text-black'>Sign up  </h2>
              </div>

              <div className="column is-two-fifths mr-4">
                   <form onSubmit={formik.handleSubmit} className='has-background-dark box p-6'>
                      <h1 className='has-text-white is-size-4 has-text-centered mb-6'>Sign Up</h1>  
                      <h1 className='has-text-danger is-size-5 has-text-centered mb-4'> {ErrorRegister}</h1>  
                      <div className="field">
                           <label className='label'>Name</label>
                           <div className="control">
                                <input 
                                type="text"
                                 name="firstName"
                                  className="input"
                                  placeholder='Your name '

                                  value={formik.values.firstName}
                                  onChange={formik.handleChange("firstName")}
                                  onBlur={formik.handleBlur("firstName")}
                                  />
                           </div>
                           <p className='text-red-400 text-xl font-bold'>{formik.touched.firstName && formik.errors.firstName}</p>
                      </div>
                      <div className="field">
                           <label className='label'>Last Name </label>
                           <div className="control">
                                <input 
                                type="text"
                                 name="lastName"
                                  className="input"
                                  placeholder=' last Name'

                                  value={formik.values.lastName}
                                  onChange={formik.handleChange("lastName")}
                                  onBlur={formik.handleBlur('lastName')}
                                  />
                           </div>
                           <p className='text-red-400 text-xl font-bold'>{formik.touched.lastName && formik.errors.lastName}</p>

                      </div>
                      <div className="field">
                           <label className='label'>Email</label>
                           <div className="control">
                                <input 
                                type="email"
                                 name="email"
                                  className="input"
                                  placeholder=' Your email'

                                  value={formik.values.email}
                                  onChange={formik.handleChange('email')}
                                  onBlur={formik.handleBlur('email')}
                                  />
                           </div>
                           <p className='text-red-400 text-xl font-bold'>{formik.touched.email && formik.errors.email}</p>
                      </div>
                      <div className="field">
                           <label className='label'>Password </label>
                           <div className="control">
                                <input 
                                type="text"
                                 name="password"
                                  className="input"
                                  placeholder='Password EX * 123456'

                                  value={formik.values.password}
                                  onChange={formik.handleChange('password')}
                                  onBlur={formik.handleBlur('password')}
                                  
                                  />
                           </div>
                           <p className='text-red-400 text-xl font-bold'>{formik.touched.password && formik.errors.password}</p>
                      </div>
                      <div className="field">
                        <button type='submit' className='button is-success is-fullwidth mt-5'> Sign up</button>
                      </div>
                   </form>
              </div>
             
         </div>
    </div>
  )
}

export default Register
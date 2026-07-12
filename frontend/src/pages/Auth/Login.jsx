import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./auth.css"

import { useFormik } from 'formik'
import *as Yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const formSchema=Yup.object({
 
     email:Yup.string().email().required('email is required'),
     password:Yup.string().required('required password').min(4,'latest charakter is 4')
})



const Login = () => {
const {login,errorLogin}=useContext(AuthContext)

   const formik=useFormik({
     initialValues:{
        
          email:"",
          password:"",
     },
     onSubmit:(values)=>{
         login(values)
     },
     validationSchema:formSchema
   })
 


  return (
    <div className='container bg-sky-950 p-5'>
         <Navbar />
         <div className="columns is-flex is-align-items-center auth">
         <div className="column ">
                   <h1 className='has-text-centered is-size-1 has-text-weight-bold text-sky-800'> Wellcome to our Blog. </h1>
              </div>

              <div className="column is-two-fifths">
                   <form onSubmit={formik.handleSubmit} className='has-background-dark box p-6'>
                      <h1 className='has-text-white is-size-4 has-text-centered mb-6'>Login page</h1>  
                      <h1 className='has-text-danger is-size-5 has-text-centered mb-4'>{errorLogin}</h1>  
                     
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
                        <button type='submit' className='button is-success is-fullwidth mt-5'> Login</button>
                      </div>
                      <Link className='text-red-700 text-xl font-semibold' to='/create-resetpassword'>forget password?</Link>
                   </form>
              </div>
         
         </div>
    </div>
  )
}

export default Login
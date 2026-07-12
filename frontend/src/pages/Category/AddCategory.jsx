import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { VscInbox } from "react-icons/vsc";
import ShowCategory from '../../components/Category/ShowCategory';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { CategoryContext } from '../../context/CategoryContext';

const formSchema = Yup.object({
     title: Yup.string().required("Required Name of Category" ),
})


const AddCategory = () => {
   
    const {createCategory}=useContext(CategoryContext)    
  

     const formik = useFormik({
          initialValues: {
              title: "",
          },
          onSubmit: (values) => {
               createCategory(values)
          },
          validationSchema: formSchema
     });


  return (
    <div className="container bg-sky-600 p-5 h-[100vh]">
         <Navbar />

         <div className="flex justify-center text-2xl font-bold mt-6">
              <VscInbox  />
         </div>

         <div className="columns is-justify-content-center">
              <div className="column is-two-thirds">
                   <form onSubmit={formik.handleSubmit} className='mt-6'>
                        <div className="field">
                             <div className="control">
                                  <input 
                                  type="text"
                                   className='input'
                                    placeholder='Category Name'
                                    value={formik.values.title}
                                    onChange={formik.handleChange("title")}
                                    onBlur={formik.handleBlur("title")}
                                    />
                             </div>
                             <p className='text-red-300 text-xl'>
                                  {formik.touched.title && formik.errors.title}
                             </p>
                        </div>

                        <div className="field mt-6">
                             <div className="control">
                                   <button type='submit' className='button is-link has-text-weight-bold is-fullwidth'>  Add Category</button>
                                  </div>
                        </div>
                   </form>
              </div>
         </div>


         <ShowCategory />
    </div>
  )
}

export default AddCategory

import { useLocation, useParams } from 'react-router-dom'
import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { VscInbox } from "react-icons/vsc";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { CategoryContext } from '../../context/CategoryContext';



const formSchema = Yup.object({
    title: Yup.string().required("Required Name of Category" ),
})




function EditCategory() {
    const {EditCat}=useContext(CategoryContext)
    const {id}=useParams()
    const{state}=useLocation()

    const formik = useFormik({
        initialValues: {
            title: state.title,
            id:state._id
        },
        onSubmit: (values) => {
            EditCat(values)
        },
        validationSchema: formSchema
   });

  return (
    <div>
        <Navbar/>
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
                                    defaultValue={state.title}
                                    onChange={formik.handleChange("title")}
                                    onBlur={formik.handleBlur("title")}
                                    />
                             </div>
                             <p className='help is-danger'>
                                  {formik.touched.title && formik.errors.title}
                             </p>
                        </div>

                        <div className="field mt-6">
                             <div className="control">
                                   <button type='submit' className='button is-link has-text-weight-bold is-fullwidth'>  Edit Category</button>
                                  </div>
                        </div>
                   </form>
              </div>
         </div>
    </div>
  )
}

export default EditCategory
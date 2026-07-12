import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {useFormik} from "formik";
import * as Yup from "yup";
import Navbar from '../../components/Navbar/Navbar';
import { CategoryContext } from '../../context/CategoryContext';
import { PostContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';







const formSchema = Yup.object({
    title: Yup.string().required("   post title is required"),
    description: Yup.string().required("post text is required"),
    category: Yup.string().required("post category is required"),
  })

function EditPost() {
   const{getAllCategory,category}=useContext(CategoryContext)
   const{EditPost}=useContext(PostContext)
   const{userId}=useContext(AuthContext)

   useEffect(()=>{
    getAllCategory()
   },[])
   const {state}=useLocation()
 
    
  const formik = useFormik({
    initialValues: {
        title: state.title,
        description: state.description,
        category: state.category,
        id:state._id,
        user:userId,
        
    },
    onSubmit: (values) => {
    
        EditPost(values)
    },
    validationSchema: formSchema
});

   

  return (
   
    <div className="container bg-slate-800 px-8 py-3 h-[100vh]">
    <Navbar />
    <div className="columns mt-6 pt-6">
      <div className="column">
        <form onSubmit={formik.handleSubmit}>
          <div className="post-editor is-flex">
            <div className="post-editor-right pr-5">
              <div className="field mt-5">
                <label className="label"> Edit Post</label>
                <div className="control">
                  <input 
                  type="text"
                  name="title"
                   placeholder="your post title"
                    className="input"
                    defaultValue={state.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    />
                    <p className="help is-danger">
                      {formik.touched.title && formik.errors.title}
                    </p>
                </div>
              </div>
              <div className="field mt-5">
                <label className="label">your text</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="your text"
                    defaultValue={state.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    >
                  
                  </textarea>
                  <p className="help is-danger">
                      {formik.touched.description && formik.errors.description}
                    </p>

                </div>
              </div>
            </div>
            <div className="post-editor-left">
                 <div className="field mt-5">
                      <label className="label"> category </label>
                     <div className="select is-fullwidth">
                     <select name=""
                       value={formik.values.category}
                       onChange={formik.handleChange("category")}
                       onBlur={formik.handleBlur("category")}
                       >
                           <option> select</option>
                           {
                             category?.map((cat) => (
                              <option key={cat._id} value={cat.title}>{cat.title}</option>
                             ))
                           }
                      </select>
                      <p className="help is-danger">
                      {formik.touched.category && formik.errors.category}
                    </p>
                     </div>
                 </div>
              
                 <div className="field mt-5">
                       <div className="control">
                            <button type="submit" className="button is-link"> Edit Post</button>
                       </div>
                 </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default EditPost
import React from "react";
import Navbar from '../../components/Navbar/Navbar'

import "./post.css"
import { useState } from "react";
import { useContext } from "react";
import {CategoryContext}from '../../context/CategoryContext'
import { useEffect } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { PostContext } from "../../context/PostContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const formSchema = Yup.object({
  title: Yup.string().required("   post title is required"),
  description: Yup.string().required("post text is required"),
  category: Yup.string().required("post category is required"),
})
const CreatePost = () => {
  const {category, getAllCategory} = useContext(CategoryContext)
  const {createPost,errorPost}=useContext(PostContext)
 
  useEffect(()=> {
    getAllCategory()
  },[])

  const [preview, setPreview] = useState("")
  const [file,setFile]=useState([])

  const loadImage = (e)=>{

    const image = e.target.files[0]
    setFile(image)

    setPreview(URL.createObjectURL(image));
  }

  const formik = useFormik({
    initialValues: {
        title: "",
        description: "",
        category: "",
        image:""
    },
    onSubmit: (values) => {
      const data={
       title:values.title,
       description:values.description,
       category:values.category,
       image:file
      }
      createPost(data)
    },
    validationSchema: formSchema
});



  return (
    <div className="container bg-sky-800 p-4 h-[100vh]">
      <Navbar />
        <div className="text-red-500 text-2xl flex justify-center p-2 mt-8 font-semibold bg-sky-200">{errorPost}</div>
      <div className="columns mt-2 pt-6">
        <div className="column">
          <form onSubmit={formik.handleSubmit}>
            <div className="post-editor is-flex">
              <div className="post-editor-right pr-5">
                <div className="field mt-5">
                  <label className="label"> post title</label>
                  <div className="control">
                    <input 
                    type="text"
                
                     placeholder="your post title"
                      className="input"
                      value={formik.values.title}
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      />
                      <p className="text-lg text-red-300">
                        {formik.touched.title && formik.errors.title}
                      </p>
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">your text</label>
                  <div className="control">


                  <ReactQuill
                      theme="snow"
                      className="h-[300px] bg-white"
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      // onBlur={formik.handleBlur("description")}
                  />


                    {/* <textarea
                      className="textarea"
                      placeholder="your text"
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      onBlur={formik.handleBlur("description")}
                      >
                    
                    </textarea> */}
                    <p className="text-lgtext-red-300">
                        {formik.touched.description && formik.errors.description}
                      </p>

                  </div>
                </div>
              </div>
              <div className="post-editor-left">
                   <div className="field mt-5 ">
                        <label className="label"> category </label>
                       <div className="select is-fullwidth">
                       <select 
                 
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
                        <p className="text-lg text-red-300">
                        {formik.touched.category && formik.errors.category}
                      </p>
                       </div>
                   </div>
                   <div className="field mt-5">
                        <label className="label"> Post Photo</label>
                        <div className="control">
                        <input type="file" className="input"
                         value={formik.values.image}
                         onBlur={formik.handleBlur('image')}
                          onChange={loadImage}
                        />
                        {
                          preview ? (
                            <figure className="image-preview mt-3">
                              <img src={preview} width="250"  alt="" />
                            </figure>
                          ) : ""
                        }
                        </div>
                   </div>

                   <div className="field mt-5">
                         <div className="control">
                              <button type="submit" className="button is-link"> Send Post</button>
                         </div>
                   </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

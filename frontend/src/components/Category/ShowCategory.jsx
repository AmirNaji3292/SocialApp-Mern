import React, { useContext, useEffect } from 'react'
import "./category.css"
import moment from 'jalali-moment'
import { CategoryContext } from '../../context/CategoryContext'
import { Link } from 'react-router-dom'



const ShowCategory = () => {

const {getAllCategory,category,deleteCat}=useContext(CategoryContext)

useEffect(()=>{
     getAllCategory()
     // console.log(category)
},[])


  return (
    <div className="columns is-justify-content-center">
         <div className="column is-two-thirds">
              <table className='table table-category is-fullwidth has-background-black'>
                   <thead>
                        <tr>
                             <th>Number</th>
                             <th>Category Name </th>
                             <th>Creator</th>
                             <th> Publish Date</th>
                             <th>Status</th>
                        </tr>
                   </thead>
                   <tbody>
                    {
                         category && category.map((cat,index)=>{
                              return(
                                   <tr>
                                   <th>{index+1}</th>
                                   <th>{cat.title}</th>
                                   <th>{cat?.user?.firstName}</th>
                                   <th>{moment(cat.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</th>
                                   <th>
                                        <Link state={cat} to={`/edit-category/${cat._id}`} className='button is-success ml-4 has-text-black'>Edit</Link>
                                        <button onClick={()=>deleteCat(cat._id)} className='button is-danger has-text-black'>Delete</button>
                                   </th>
                              </tr>
                              )
                         })
                    }
                       
                   </tbody>
              </table>
         </div>
    </div>
  )
}

export default ShowCategory
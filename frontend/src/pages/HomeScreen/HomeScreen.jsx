import React, { useContext, useEffect } from 'react'
import Sidebar from '../../components/HomeScreen/Sidebar/Sidebar'
import PostLists from './PostLists'
import Navbar from '../../components/Navbar/Navbar'

function HomeScreen() {

  

  return (
   
    <div className="container bg-sky-800 p-5">
    <Navbar/>

    <div className="columns mt-5">
         <div className="column is-two-thirds">
             <PostLists /> 
         </div>
         <div className="column">
               <Sidebar />
         </div>
    </div>
</div>
  )
}

export default HomeScreen
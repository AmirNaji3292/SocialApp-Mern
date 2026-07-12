import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const VerifyAccount = () => {
 
    const {endVerifyAccount,AccountError}=useContext(AuthContext)
    const {id}=useParams()

    useEffect(()=>{
        endVerifyAccount(id)
    },[])


    if(AccountError){
        <div className='flex justify-center items-center'>
        <div>
        <h3 className='text-[35px] mt-4 mb-5 font-semibold text-red-700'>{AccountError}</h3>
          <Link className='text-semibold text-2xl' to='/profile'>Go to Profile</Link>
        </div>
      </div>
    }
  return (
    <div className='flex justify-center items-center'>
      <div>
      <h3 className='text-[35px] mt-4 mb-5 font-semibold text-green-700'>You Successfully Verified Your Account.</h3>
        <Link className='text-semibold text-2xl' to='/profile'>Go to Profile</Link>
      </div>
    </div>
  )
}

export default VerifyAccount
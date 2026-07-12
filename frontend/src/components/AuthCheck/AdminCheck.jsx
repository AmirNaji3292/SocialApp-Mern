import React from 'react'
import { useContext } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const AdminCheck = () => {
     const {chef} = useContext(AuthContext)
  return chef ? <Outlet /> : <Navigate to="/" replace={true} />
}

export default AdminCheck
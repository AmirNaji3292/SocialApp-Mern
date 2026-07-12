
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Auth/Login';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import AddCategory from './pages/Category/AddCategory';
import EditCategory from './components/Category/EditCategory';
import CreatePost from './pages/Posts/CreatePost';
import DeatailPost from './pages/Posts/DeatailPost';
import EditPost from './pages/Posts/EditPost';
import Profile from './pages/profile/Profile';
import UpdateProfile from './pages/profile/UpdateProfile';
import ProfileUser from './pages/profile/ProfileUser';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import SendEmail from './components/profile/SendEmail';
import VerifyAccount from './components/profile/VerifyAccount';
import Users from './pages/Users/Users';
import UpdataPassword from './components/profile/ManagementPassword/UpdataPassword';
import ResetPassword from './components/profile/ManagementPassword/ResetPassword';
import NewPass from './components/profile/ManagementPassword/NewPass';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import NotView from './components/AuthCheck/NotView';
import AuthCheck from './components/AuthCheck/AuthCheck';
import AdminCheck from './components/AuthCheck/AdminCheck';
import AdminComponent from './components/AuthCheck/AdminComponent';

function App(){

  const{userId}=useContext(AuthContext)
 

  return(<div>
   
    <Routes>

      <Route path='/admin' element={<AdminComponent/>} />
      <Route path='/change-password' element={<UpdataPassword/>}/>
      <Route element={<AuthCheck/>}>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/create-resetpassword' element={<ResetPassword/>}/>
      </Route>

      {userId && (<>
        <Route path='/' element={<HomeScreen/>}/>

        <Route element={<AdminCheck/>}>
        <Route path='/add-category' element={<AddCategory/>}/>

        <Route path='/edit-category/:id' element={<EditCategory/>}/>
        <Route path='/users' element={<Users/>}/>
      <Route path='/user/send-email' element={<SendEmail/>}/>
        
         </Route>

      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/detail-post/:id'element={<DeatailPost/>}/>
      <Route path='/edit-post/:id'element={<EditPost/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profileuser/:id' element={<ProfileUser/>}/>
      <Route path='/update-profile' element={<UpdateProfile/>}/>
      <Route path='/followers' element={<Followers/>}/>
      <Route path='/following' element={<Following/>}/>
      <Route path='/verify-account/:id' element={<VerifyAccount/>}/>
      
      
      <Route path='/reset-password/:id' element={<NewPass/>}/></>)}

      <Route path='*' element={<NotView/>}/>
      
        
    </Routes>
    <ToastContainer/>
  </div>)
}

export default App;

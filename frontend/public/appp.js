import Register from "./pages/auth/Register";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./components/Category/EditCategory";
import CreatePost from "./pages/Posts/CreatePost";
import DeatailPost from "./pages/Posts/DeatailPost";
import EditPost from "./pages/Posts/EditPost";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import ProfileUser from "./pages/Profile/ProfileUser";
import Followers from "./components/Profile/Followers";
import Following from "./components/Profile/Following";
import SendEmail from "./components/Profile/sendEmail/SendEmail";
import VerifyAccount from "./components/Profile/verifyAcoount/VerifyAccount";
import Users from "./pages/Users/Users";
import UpdataPassword from "./components/Profile/ManagementPassword/UpdataPassword";
import ResetPassword from "./components/Profile/ManagementPassword/ResetPassword";
import NewPassword from "./components/Profile/ManagementPassword/NewPassword";
import AdminCheck from "./components/AuthCheck/AdminCheck";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthCheck from "./components/AuthCheck/AuthCheck";
import NotView from "./components/AuthCheck/NotView";

function App() {
  const { userId } = useContext(AuthContext);
  return (
    <div className="wrapper">
      <Routes>

        <Route  element={<AuthCheck />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate-password-token" element={<ResetPassword />} />
        <Route path="/reset-password/:id" element={<NewPassword />} />
        </Route>
        {userId && (
          <>
                  <Route path="/" element={<HomeScreen />} />

            <Route element={<AdminCheck />}>
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user/send-email" element={<SendEmail />} />
            </Route>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/detail-post/:id" element={<DeatailPost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileUser />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/following" element={<Following />} />
            <Route path="/user/update" element={<UpdateProfile />} />
            <Route path="/verify-account/:id" element={<VerifyAccount />} />
            <Route path="/update-password" element={<UpdataPassword />} />
          </>
        )}


        <Route path="*" element={<NotView />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

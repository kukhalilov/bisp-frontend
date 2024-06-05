import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import "./utilities/firebase";
import { jwtDecode } from "jwt-decode";
import { getData } from "./api/api";
import User from "./interfaces/User";
import { setAuthError, setUserInfo } from "./redux/reducers/rootSlice";
import { useDispatch } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import { AxiosError } from "axios";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyForDoctor = lazy(() => import("./pages/ApplyForDoctor"));
const Error = lazy(() => import("./pages/Error"));

const App = () => {
  const dispatch = useDispatch();
  
  const user = localStorage.getItem("token")
    ? jwtDecode<User>(localStorage.getItem("token") || "")
    : null;

    const getUser = async (id?: string) => {
      try {
        const user = await getData<User>(`/users/${id}`);
        dispatch(setUserInfo(user));
      } catch (error) {
          const err = error as AxiosError;
          console.log("err", err);
          if (err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 500) {
            localStorage.removeItem("token");
            dispatch(setAuthError(true));
          }
        return error;
      }
    };

  user && getUser(user.userId);

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <ScrollToTop>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/register'
              element={
                <Public>
                  <Register />
                </Public>
              }
            />
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route
              path='/appointments'
              element={
                <Protected>
                  <Appointments />
                </Protected>
              }
            />
            <Route
              path='/notifications'
              element={
                <Protected>
                  <Notifications />
                </Protected>
              }
            />
            <Route
              path='/applyfordoctor'
              element={
                <Protected>
                  <ApplyForDoctor />
                </Protected>
              }
            />
            <Route
              path='/profile'
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path='/dashboard/users'
              element={
                <Admin>
                  <Dashboard type={"users"} />
                </Admin>
              }
            />
            <Route
              path='/dashboard/doctors'
              element={
                <Admin>
                  <Dashboard type={"doctors"} />
                </Admin>
              }
            />
            <Route
              path='/dashboard/appointments'
              element={
                <Protected>
                  <Dashboard type={"appointments"} />
                </Protected>
              }
            />
            <Route
              path='/dashboard/applications'
              element={
                <Protected>
                  <Dashboard type={"applications"} />
                </Protected>
              }
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </ScrollToTop>
      </Suspense>
    </Router>
  );
};

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext, useRef } from 'react';
import { DarkModeContext } from '../context/dark_mode/darkModeContext';
import { AuthContext } from '../context/authContext/AuthContext';
import Home from '../pages/home/Home';
import AllSubscribers from '../pages/subscribers_list/AllSubscribers';
import ActiveSubscribers from '../pages/subscribers_list/ActiveSubscribers';
import AlmostExpiredSubscribers from '../pages/subscribers_list/AlmostExpiredSubscribers';
import ExpiredSubscribers from '../pages/subscribers_list/ExpiredSubscribers';
import Login from '../pages/login/Login';
import AddSubscriber from '../pages/add_subscriber/AddSubscriber';
import SingleSubscriber from '../pages/single_subscriber/SingleSubscriber';
import AllRecorders from '../pages/recorders_list/AllRecorders';
import SingleRecorder from '../pages/single_recorder/SingleRecorder';
import AddRecorder from '../pages/add_recorder/AddRecorder';
import EditSubscriber from '../pages/edit_subscriber/EditSubscriber';
import EditRecorder from '../pages/edit_recorder/EditRecorder';
import Profile from '../pages/profile/Profile';
import EditProfile from '../pages/edit_profile/EditProfile';
import ProtectedRoute from '../protect/ProtectedRoutes';
import PreventRecorders from '../protect/PreventRecorders';
import '../global_styles/main.scss';
import '../global_styles/darkmode.scss';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { admin } = useContext(AuthContext);

  const appRef = useRef();

  return (
    <div className={darkMode ? 'app dark' : 'app'} ref={appRef}>
      <Router>
        <Routes>
          <Route
            path='home'
            element={
              <ProtectedRoute admin={admin}>
                <Home appRef={appRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path='login'
            element={admin ? <Navigate replace to='/' /> : <Login />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute admin={admin}>
                <Home appRef={appRef} />
              </ProtectedRoute>
            }
          >
            <Route path='profile'>
              <Route index element={<Profile />} />
              <Route path='edit' element={<EditProfile />} />
            </Route>
            <Route path='subscribers'>
              <Route index element={<AllSubscribers />} />
              <Route path='all' element={<AllSubscribers />} />
              <Route path='active' element={<ActiveSubscribers />} />
              <Route
                path='almost-expired'
                element={<AlmostExpiredSubscribers />}
              />
              <Route path='expired' element={<ExpiredSubscribers />} />
              <Route path=':subscriberId' element={<SingleSubscriber />} />
              <Route path='add-new' element={<AddSubscriber />} />
              <Route path='edit/:subscriberId' element={<EditSubscriber />} />
            </Route>
            <Route
              path='recorders'
              element={
                <PreventRecorders admin={admin}>
                  <AllRecorders />
                </PreventRecorders>
              }
            >
              <Route index element={<AllRecorders />} />
              <Route path='all' element={<AllRecorders />} />
              <Route path=':recorderId' element={<SingleRecorder />} />
              <Route path='add-new' element={<AddRecorder />} />
              <Route path='edit/:recorderId' element={<EditRecorder />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate replace to='/' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import AllSubscribers from '../pages/subscribers_list/AllSubscribers';
import ActiveSubscribers from '../pages/subscribers_list/ActiveSubscribers';
import AboutToExpireSubscribers from '../pages/subscribers_list/AboutToExpireSubscribers';
import ExpiredSubscribers from '../pages/subscribers_list/ExpiredSubscribers';
import Login from '../pages/login/Login';
import AddSubscriber from '../pages/add_subscriber/AddSubscriber';
import SingleSubscriber from '../pages/single_subscriber/SingleSubscriber';
import AllRecorders from '../pages/recorders_list/AllRecorders';
import SingleRecorder from '../pages/single_recorder/SingleRecorder';
import AddRecorder from '../pages/add_recorder/AddRecorder';
import '../global_styles/main.scss';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Home />}>
            <Route path='subscribers'>
              <Route index element={<AllSubscribers />} />
              <Route path='all' element={<AllSubscribers />} />
              <Route path='active' element={<ActiveSubscribers />} />
              <Route
                path='about-to-expire'
                element={<AboutToExpireSubscribers />}
              />
              <Route path='expired' element={<ExpiredSubscribers />} />
              <Route path=':subscriberId' element={<SingleSubscriber />} />
              <Route path='add-new' element={<AddSubscriber />} />
            </Route>
            <Route path='recorders'>
              <Route index element={<AllRecorders />} />
              <Route path='all' element={<AllRecorders />} />
              <Route path=':recorderId' element={<SingleRecorder />} />
              <Route path='add-new' element={<AddRecorder />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

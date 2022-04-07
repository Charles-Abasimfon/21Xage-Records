import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import AllSubscribers from '../pages/subscribers_list/AllSubscribers';
import ActiveSubscribers from '../pages/subscribers_list/ActiveSubscribers';
import AboutToExpireSubscribers from '../pages/subscribers_list/AboutToExpireSubscribers';
import ExpiredSubscribers from '../pages/subscribers_list/ExpiredSubscribers';
import Login from '../pages/login/Login';
import AddNewSubscriber from '../pages/add_new/AddNewSubscriber';
import SingleSubscriber from '../pages/single/SingleSubscriber';
import AllRecorders from '../pages/recorders_list/AllRecorders';
import SingleRecorder from '../pages/single/SingleRecorder';
import AddNewRecorder from '../pages/add_new/AddNewRecorder';
import '../global_styles/main.scss';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='subscribers'>
              <Route index element={<AllSubscribers />} />
              <Route path='app' element={<AllSubscribers />} />
              <Route path='active' element={<ActiveSubscribers />} />
              <Route
                path='about-to-expire'
                element={<AboutToExpireSubscribers />}
              />
              <Route path='expired' element={<ExpiredSubscribers />} />
              <Route path=':subscriberId' element={<SingleSubscriber />} />
              <Route path='new' element={<AddNewSubscriber />} />
            </Route>
            <Route path='recorders'>
              <Route index element={<AllRecorders />} />
              <Route path=':recorderId' element={<SingleRecorder />} />
              <Route path='new' element={<AddNewRecorder />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

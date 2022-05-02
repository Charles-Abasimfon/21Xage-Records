import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widgets/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Datatable from '../../components/datatable/Datatable';
import { AuthContext } from '../../context/authContext/AuthContext';
import './home.scss';
import { getAllSubscribers } from '../../apicalls/subscriberCalls';

function Home(props) {
  const location = useLocation();
  const { pathname } = useLocation();

  const { appRef } = props;

  const [subscribers, setSubscribers] = useState(undefined);
  const { admin } = useContext(AuthContext);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (pathname === '/') {
      getAllSubscribers(admin.token)
        .then((res) => {
          setSubscribers(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
      });
    };
  }, [window.innerHeight]);

  const getNumberOfSubscribersInCategory = (category) => {
    if (!subscribers) return '...';
    switch (category) {
      case 'All':
        return subscribers.length;
      case 'Active':
        return subscribers.filter(
          (subscriber) => subscriber.status === 'Active'
        ).length;
      case 'Almost Expired':
        return subscribers.filter(
          (subscriber) => subscriber.status === 'Almost Expired'
        ).length;
      case 'Expired':
        return subscribers.filter(
          (subscriber) => subscriber.status === 'Expired'
        ).length;
      default:
        return 0;
    }
  };

  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard-container'>
        <Navbar appRef={appRef} />
        <div
          className='dashboard-content'
          style={{ height: `calc(${windowHeight}px - 70px)` }}
        >
          {/* ///// USE OF OUTLET ///// */}
          <Outlet />

          {/* IF DASHBOARD HOME PAGE DISPLAY: */}
          {location.pathname === '/' && (
            <div className='home-content'>
              <div className='widgets'>
                <Widget
                  type='all-subscribers'
                  counter={getNumberOfSubscribersInCategory('All')}
                />
                <Widget
                  type='active-subscribers'
                  counter={getNumberOfSubscribersInCategory('Active')}
                />
                <Widget
                  type='abouttoexpire-subscribers'
                  counter={getNumberOfSubscribersInCategory('Almost Expired')}
                />
                <Widget
                  type='expired-subscribers'
                  counter={getNumberOfSubscribersInCategory('Expired')}
                />
              </div>
              <div className='charts'>
                <Featured />
                <Chart />
              </div>
            </div>
          )}
          {location.pathname == 'home' && (
            <div className='home-content'>
              <div className='widgets'>
                <Widget type='all-subscribers' />
                <Widget type='active-subscribers' />
                <Widget type='abouttoexpire-subscribers' />
                <Widget type='expired-subscribers' />
              </div>
              {/* The below is for displaying charts of revenue */}
              {/* <div className='charts'>
                <Featured />
                <Chart />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

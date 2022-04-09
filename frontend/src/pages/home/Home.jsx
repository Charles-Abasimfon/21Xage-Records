import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widgets/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';
import './home.scss';

function Home() {
  const location = useLocation();
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard-container'>
        <Navbar />
        <div className='dashboard-content'>
          {/* ///// USE OF OUTLET ///// */}
          <Outlet />

          {/* IF DASHBOARD HOME PAGE DISPLAY: */}
          {location.pathname === '/' && (
            <div className='home-content'>
              <div className='widgets'>
                <Widget type='all-subscribers' />
                <Widget type='active-subscribers' />
                <Widget type='abouttoexpire-subscribers' />
                <Widget type='expired-subscribers' />
              </div>
              <div className='charts'>
                <Featured />
                <Chart />
              </div>
              <div className='list-container'>
                <div className='list'>
                  <div className='list-title'>Latest Subscribers</div>
                  <Table />
                </div>
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
              <div className='charts'>
                <Featured />
                <Chart />
              </div>
              <div className='list-container'>
                <div className='list'>
                  <div className='list-title'>Latest Subscribers</div>
                  <Table />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

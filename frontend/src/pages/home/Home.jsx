import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widgets/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';
import './home.scss';

function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <div className='home-container'>
        <Navbar />
        <CustomScroll heightRelativeToParent={`calc(100vh - 81.5px)`}>
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
          </div>
        </CustomScroll>
      </div>
    </div>
  );
}

export default Home;

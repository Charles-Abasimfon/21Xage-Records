import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './featured.scss';

function Featured() {
  // isExpanded controls toggling of the expanded featured component
  const [isExpanded, setIsExpanded] = useState(true);

  const [targetDetails, setTargetDetails] = useState({
    value: 10,
    isPostive: false,
  });
  const [lastWeekDetails, setLastWeekDetails] = useState({
    value: 50,
    isPostive: true,
  });
  const [lastMonthDetails, setLastMonthDetails] = useState({
    value: 30,
    isPostive: true,
  });

  return (
    <div className='featured'>
      <div className='top'>
        <h2 className='title'>Total Revenue</h2>
        <MoreVertIcon
          className='icon'
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <div
        className='bottom'
        style={{
          maxHeight: isExpanded ? '500px' : '0px',
          padding: isExpanded ? '10px' : '0px',
          overflow: 'hidden',
        }}
      >
        <div className='featured-chart'>
          <CircularProgressbar
            value={70}
            text={'70%'}
            strokeWidth={5}
            styles={{
              path: {
                stroke: `#14532d`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              trail: {
                stroke: '#f0fdf4',
              },
              text: {
                fill: '#14532d',
                fontSize: '24px',
                fontWeight: '500',
              },
            }}
          />
        </div>
        <p className='title'>Total Sales made today</p>
        <p className='amount'>$420</p>
        <p className='desc'>
          Previous transactions processing. Last payments may not be included.
        </p>
        {/*         <div className='summary'>
          <div className='item'>
            <div className='item-title'>Target</div>
            <div
              className={`item-result ${
                targetDetails.isPostive ? 'positive' : 'negative'
              }`}
            >
              {targetDetails.isPostive ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
              <div className='result-amount'>${targetDetails.value}k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Week</div>
            <div
              className={`item-result ${
                lastWeekDetails.isPostive ? 'positive' : 'negative'
              }`}
            >
              {lastWeekDetails.isPostive ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
              <div className='result-amount'>${lastWeekDetails.value}k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Month</div>
            <div
              className={`item-result ${
                lastMonthDetails.isPostive ? 'positive' : 'negative'
              }`}
            >
              {lastMonthDetails.isPostive ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
              <div className='result-amount'>${lastMonthDetails.value}k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Featured;

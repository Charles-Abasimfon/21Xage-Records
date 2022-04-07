import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import './widget.scss';

function Widget(props) {
  const { type } = props;
  /* the type prop carries information on the type of the widget */

  const [percentageDetails, setPercentageDetails] = useState({
    percentage: 0,
    isPositive: true,
  });

  const [counter, setCounter] = useState(0);

  const [widgetDetails, setWidgetDetails] = useState({
    title: '',
    linkText: '',
    linkUrl: '',
    icon: '',
    color: '#111827',
    backgroundColor: '#d1d5db',
  });

  useEffect(() => {
    switch (type) {
      case 'all-subscribers':
        setWidgetDetails({
          title: 'All subscribers',
          linkText: 'View list',
          linkUrl: '/subscribers/all',
          icon: PeopleAltOutlinedIcon,
          color: '#374151',
          backgroundColor: '#d1d5db',
        });
        break;

      case 'active-subscribers':
        setWidgetDetails({
          title: 'Active subscribers',
          linkText: 'View list',
          linkUrl: '/subscribers/active',
          icon: CheckIcon,
          color: '#16a34a',
          backgroundColor: '#86efac',
        });
        break;

      case 'abouttoexpire-subscribers':
        setWidgetDetails({
          title: 'About to expire',
          linkText: 'View list',
          linkUrl: '/subscribers/about-to-expire',
          icon: AccessTimeIcon,
          color: '#ca8a04',
          backgroundColor: '#fef08a',
        });
        break;

      case 'expired-subscribers':
        setWidgetDetails({
          title: 'Expired subscribers',
          linkText: 'View list',
          linkUrl: '/subscribers/expired',
          icon: ClearIcon,
          color: '#e11d48',
          backgroundColor: '#fda4af',
        });
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{type && widgetDetails.title}</span>
        <span className='counter'>{counter}</span>
        <Link className='link' to={widgetDetails.linkUrl}>
          {type && widgetDetails.linkText}{' '}
          <CallMadeOutlinedIcon className='link-icon' />
        </Link>
      </div>
      <div className='right'>
        <div
          className={`percentage ${
            percentageDetails.isPositive ? 'positive' : 'negative'
          }`}
        >
          <KeyboardArrowUpIcon />
          {percentageDetails.percentage}%
        </div>
        {type && widgetDetails.icon && (
          <widgetDetails.icon
            className='icon'
            style={{
              backgroundColor: widgetDetails.backgroundColor,
              color: widgetDetails.color,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Widget;

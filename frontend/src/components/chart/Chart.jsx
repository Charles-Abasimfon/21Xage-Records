import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './chart.scss';
function Chart() {
  const data = [
    {
      name: 'January',
      Total: 1200,
    },
    {
      name: 'February',
      Total: 1100,
    },
    {
      name: 'March',
      Total: 1600,
    },
    {
      name: 'April',
      Total: 1200,
    },
    {
      name: 'May',
      Total: 800,
    },
    {
      name: 'June',
      Total: 500,
    },
  ];

  return (
    <div className='chart'>
      <div className='title'>Last 6 Months (Revenue) In USD</div>
      <ResponsiveContainer
        width='100%'
        aspect={2 / 1}
        className='chart-container'
      >
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#14532d' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#14532d' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#14532d'
            fillOpacity={1}
            fill='url(#total)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

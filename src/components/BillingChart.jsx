import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { axisClasses, chartsGridClasses, lineClasses } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

// project imports
// import { withAlpha } from '../utils/colorUtils';

// Sample data

// Billing
const labels = [
  '26-03-18', 
'26-02-18', 
'26-01-16', 
'25-12-16', 
'25-11-14', 
'25-10-15', 
'25-09-15', 
'25-08-12', 
'25-07-16', 
'25-05-12', 
'25-04-14', 
'25-03-17', 
'25-02-12', 
'25-01-16', 
'24-12-16', 
'24-11-14', 
'24-10-10', 
'24-09-12', 
'24-08-14', 
'24-07-12', 
'24-06-12', 
'24-05-11', 
'24-04-12', 
'24-03-14', 
'24-02-12'
];

const data1 = [
987000, 
1148000, 
1036000, 
1134000, 
1022000, 
1099000, 
1337000, 
1050000, 
2415000, 
994000, 
966000, 
1169000, 
952000, 
1064000, 
1183000, 
1260000, 
1036000, 
1106000, 
1260000, 
1078000, 
1127000, 
1008000, 
1022000, 
1092000, 
1169000
];

const data2 = [
350000, 
378000, 
385000, 
364000, 
378000, 
399000, 
448000, 
357000, 
840000, 
336000, 
329000, 
392000, 
315000, 
378000, 
385000, 
427000, 
357000, 
392000, 
427000, 
385000, 
378000, 
350000, 
357000, 
399000, 
364000
];

const data3 = [
224000, 
259000, 
259000, 
252000, 
252000, 
273000, 
301000, 
245000, 
574000, 
224000, 
217000, 
259000, 
217000, 
259000, 
252000, 
294000, 
238000, 
273000, 
287000, 
266000, 
252000, 
238000, 
238000, 
266000, 
245000
];

const data4 = [
  1561000, 
1785000, 
1680000, 
1750000, 
1652000, 
1771000, 
2086000, 
1652000, 
3829000, 
1554000, 
1512000, 
1820000, 
1484000, 
1701000, 
1820000, 
1981000, 
1631000, 
1771000, 
1974000, 
1729000, 
1757000, 
1596000, 
1617000, 
1757000, 
1778000
];

function Legend({ items, onToggle }) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', mt: 2.5, mb: 1.5 }}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          sx={{ gap: 1.25, alignItems: 'center', cursor: 'pointer' }}
          onClick={() => onToggle(item.label)}
        >
          <Box sx={{ width: 12, height: 12, bgcolor: item.visible ? item.color : 'text.secondary', borderRadius: '50%' }} />
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// ==============================|| INCOME AREA CHART ||============================== //

export default function BillingChart({ view }) {
  const theme = useTheme();

  const [visibility, setVisibility] = useState({
    'Base': true, 
    'Low': true, 
    'High': true, 
    'Total': true
  });

//   const labels = view === 'billing' ? billingLabels : averageLabels;
//   const data1 = view === 'billing' ? billingData1 : averageData1;
//   const data2 = view === 'billing' ? billingData2 : averageData2;
//  const data3 = view === 'billing' ? billingData3 : averageData3;
//   const data4 = view === 'billing' ? billingData4 : averageData4;

  const line = theme.vars.palette.divider;

  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const visibleSeries = [
    {
      data: data1,
      label: 'Base',
      showMark: false,
      area: false,
      id: 'base',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Base']
    },
    {
      data: data2,
      label: 'Low',
      showMark: false,
      area: false,
      id: 'low',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Low']
    },
    {
      data: data3,
      label: 'High',
      showMark: false,
      area: false,
      id: 'high',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['High']
    },
    {
      data: data4,
      label: 'Total',
      showMark: false,
      area: false,
      id: 'total',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Total']
    }
  ];

  return (
    <>
      <LineChart
        hideLegend
        grid={{ horizontal: true, vertical: false }}
        xAxis={[{ scaleType: 'point', data: labels, tickSize: 7, disableLine: true }]}
        yAxis={[{ tickSize: 7, disableLine: true }]}
        height={450}
        margin={{ top: 40, bottom: -5, right: 20, left: 5 }}
        series={visibleSeries
          .filter((series) => series.visible)
          .map((series) => ({
            type: 'line',
            data: series.data,
            label: series.label,
            showMark: series.showMark,
            area: series.area,
            id: series.id,
            color: series.color,
            stroke: series.color,
            strokeWidth: 2
          }))}
        sx={{
          [`& .${chartsGridClasses.line}`]: { strokeDasharray: '4 4', stroke: line },
          [`& .${lineClasses.area}`]: {
            '&[data-series-id="page-views"]': { fill: "url('#myGradient1')", strokeWidth: 2, opacity: 0.8 },
            '&[data-series-id="sessions"]': { fill: "url('#myGradient2')", strokeWidth: 2, opacity: 0.8 }
          },
          [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' },
          [`& .${axisClasses.root}.${axisClasses.directionY} .${axisClasses.tick}`]: { stroke: 'transparent' }
        }}
      >
        <defs>
          <linearGradient id="myGradient1" gradientTransform="rotate(90)">
            <stop offset="10%" 
            // stopColor={withAlpha(theme.vars.palette.primary.main, 0.4)}
             />
            <stop offset="90%" 
            // stopColor={withAlpha(theme.vars.palette.background.default, 0.4)} 
            />
          </linearGradient>
          <linearGradient id="myGradient2" gradientTransform="rotate(90)">
            <stop offset="10%" 
            // stopColor={withAlpha(theme.vars.palette.primary[700], 0.4)} 
            />
            <stop offset="90%" 
            // stopColor={withAlpha(theme.vars.palette.background.default, 0.4)} 
            />
          </linearGradient>
        </defs>
      </LineChart>
      <Legend items={visibleSeries} onToggle={toggleVisibility} />
    </>
  );
}

Legend.propTypes = { items: PropTypes.array, onToggle: PropTypes.func };

BillingChart.propTypes = { view: PropTypes.oneOf(['billing', 'average']) };

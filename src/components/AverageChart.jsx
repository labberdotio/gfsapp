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

// Average
const labels = [
  'Jan', 
  'Feb', 
  'Mar', 
  'Apr', 
  'May', 
  'Jun', 
  'Jul', 
  'Aug', 
  'Sep', 
  'Oct', 
  'Nov', 
  'Dec'
];

///

const data11 = [
  35250, 
34787, 
33419, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
];

const data12 = [
35437, 
34066, 
36633, 
39323, 
38888, 
37153, 
37153, 
35500, 
34500, 
35424, 
35259, 
34322
];

const data13 = [
null, 
36968, 
36000, 
37000, 
38137, 
38181, 
35933, 
35218, 
34758, 
35241, 
35225, 
37709
];

///

const data21 = [
  12500, 
11454, 
12419, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
];

const data22 = [
11375, 
12600, 
13300, 
13176, 
13222, 
12923, 
12923, 
12000, 
11750, 
11878, 
11666, 
12193, 
];

const data23 = [
  null, 
12031, 
12200, 
12750, 
13517, 
12939, 
12833, 
11812, 
12068, 
12310, 
12870, 
11741, 
];

///

const data31 = [
  8000, 
7848, 
8354, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
];

const data32 = [
7875, 
8400, 
9100, 
8852, 
9074, 
8830, 
8830, 
8000, 
7750, 
7848, 
8037, 
8354, 
];

const data33 = [
    null, 
7875, 
8400, 
8500, 
9413, 
8696, 
8866, 
7875, 
8206, 
8206, 
8580, 
7903
];

///

const data41 = [
  55750, 
54090, 
54193, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
null, 
];

const data42 = [
54687, 
55066, 
59033, 
61352, 
61185, 
58907, 
58907, 
55500, 
54000, 
55151, 
54962, 
54870, 
];

const data43 = [
      null, 
56875, 
56600, 
58250, 
61068, 
59818, 
57633, 
54906, 
55034, 
55758, 
56677, 
57354
];

///

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

export default function AverageChart({ view }) {
  const theme = useTheme();

  const [visibility, setVisibility] = useState({
    'Base 24': true, 
    'Low 24': true, 
    'High 24': true, 
    'Total 24': true, 
    'Base 25': true, 
    'Low 25': true, 
    'High 25': true, 
    'Total 25': true, 
    'Base 26': true, 
    'Low 26': true, 
    'High 26': true, 
    'Total 26': true
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
      data: data11,
      label: 'Base 26',
      showMark: false,
      area: false,
      id: 'base26',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Base 26']
    },
    {
      data: data12,
      label: 'Base 25',
      showMark: false,
      area: false,
      id: 'base25',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Base 25']
    },
    {
      data: data13,
      label: 'Base 24',
      showMark: false,
      area: false,
      id: 'base24',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Base 24']
    },

    {
      data: data21,
      label: 'Low 26',
      showMark: false,
      area: false,
      id: 'low26',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Low 26']
    },
    {
      data: data22,
      label: 'Low 25',
      showMark: false,
      area: false,
      id: 'low25',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Low 25']
    },
    {
      data: data23,
      label: 'Low 24',
      showMark: false,
      area: false,
      id: 'low24',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Low 24']
    },

    {
      data: data31,
      label: 'High 24',
      showMark: false,
      area: false,
      id: 'high24',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['High 24']
    },
    {
      data: data32,
      label: 'High 25',
      showMark: false,
      area: false,
      id: 'high25',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['High 25']
    },
    {
      data: data33,
      label: 'High 26',
      showMark: false,
      area: false,
      id: 'high26',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['High 26']
    },

    {
      data: data41,
      label: 'Total 24',
      showMark: false,
      area: false,
      id: 'total24',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Total 24']
    }, 
    {
      data: data42,
      label: 'Total 25',
      showMark: false,
      area: false,
      id: 'total25',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Total 25']
    }, 
    {
      data: data43,
      label: 'Total 26',
      showMark: false,
      area: false,
      id: 'total26',
      // color: theme.vars.palette.primary.main || '',
      visible: visibility['Total 26']
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

AverageChart.propTypes = { view: PropTypes.oneOf(['billing', 'average']) };

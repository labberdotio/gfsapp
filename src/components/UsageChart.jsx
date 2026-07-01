'use client';

// material-ui
import { useTheme } from '@mui/material/styles';

import { axisClasses, barClasses, BarChart } from '@mui/x-charts';

// const data = [80, 95, 70, 42, 65, 55, 78];
// const xLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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
28, 
33, 
31, 
32, 
30, 
30, 
34, 
27, 
65, 
28, 
28, 
33, 
27, 
31, 
32, 
35, 
28, 
29, 
33, 
30, 
32, 
29, 
29, 
31, 
31
];

const xLabels = [
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

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function UsageBarChart() {
  const theme = useTheme();

  return (
    <BarChart
      hideLegend
      height={380}
      series={[{ data: data1, label: 'kWh per cycle' }, { data: data2, label: 'Days per cycle' }] }
      xAxis={[{ data: xLabels, scaleType: 'band', tickSize: 7, disableLine: true, categoryGapRatio: 0.4 }]}
      yAxis={[{ position: 'none' }]}
      slotProps={{ bar: { rx: 5, ry: 5 } }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.vars.palette.info.light]}
      sx={{
        [`& .${barClasses.element}:hover`]: { opacity: 0.6 },
        [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' }
      }}
    />
  );
}

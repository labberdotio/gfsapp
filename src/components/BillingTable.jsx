import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import Dot from './@extended/Dot';
// import { NumericFormat } from './third-party';

// function createData(tracking_no, name, fat, carbs, protein) {
//   return { tracking_no, name, fat, carbs, protein };
// }

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570),
//   createData(98764564, 'Laptop', 300, 0, 180139),
//   createData(98756325, 'Mobile', 355, 1, 90989),
//   createData(98652366, 'Handset', 50, 1, 10239),
//   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   createData(86739658, 'TV', 99, 0, 410780),
//   createData(13256498, 'Keyboard', 125, 2, 70999),
//   createData(98753263, 'Mouse', 89, 2, 10570),
//   createData(98753275, 'Desktop', 185, 1, 98063),
//   createData(98753291, 'Chair', 100, 0, 14001)
// ];

const rows = [
  {
    "bill-date": "26-03-18",
    "days": 28,
    "base-kwh": 987000,
    "base-kw": 3290,
    "low-kwh": 350000,
    "low-kw": 3290,
    "high-kwh": 224000,
    "high-kw": 3150,
    "total-kwh": 1561000,
    "billing-kw": 3710,
    "total-cost": 417576.69
  },
  {
    "bill-date": "26-02-18",
    "days": 33,
    "base-kwh": 1148000,
    "base-kw": 34787.8787878788,
    "low-kwh": 378000,
    "low-kw": 3010,
    "high-kwh": 259000,
    "high-kw": 3080,
    "total-kwh": 1785000,
    "billing-kw": 3710,
    "total-cost": 469242.93
  },
  {
    "bill-date": "26-01-16",
    "days": 31,
    "base-kwh": 1036000,
    "base-kw": 33419.3548387097,
    "low-kwh": 385000,
    "low-kw": 3080,
    "high-kwh": 259000,
    "high-kw": 3080,
    "total-kwh": 1680000,
    "billing-kw": 3710,
    "total-cost": 444028.56
  },
  {
    "bill-date": "25-12-16",
    "days": 32,
    "base-kwh": 1134000,
    "base-kw": 35437.5,
    "low-kwh": 364000,
    "low-kw": 3080,
    "high-kwh": 252000,
    "high-kw": 3640,
    "total-kwh": 1750000,
    "billing-kw": 3710,
    "total-cost": 460309.98
  },
  {
    "bill-date": "25-11-14",
    "days": 30,
    "base-kwh": 1022000,
    "base-kw": 34066.6666666667,
    "low-kwh": 378000,
    "low-kw": 3080,
    "high-kwh": 252000,
    "high-kw": 3150,
    "total-kwh": 1652000,
    "billing-kw": 3710,
    "total-cost": 436172.06
  },
  {
    "bill-date": "25-10-15",
    "days": 30,
    "base-kwh": 1099000,
    "base-kw": 36633.3333333333,
    "low-kwh": 399000,
    "low-kw": 3430,
    "high-kwh": 273000,
    "high-kw": 3360,
    "total-kwh": 1771000,
    "billing-kw": 3710,
    "total-cost": 476178.83
  },
  {
    "bill-date": "25-09-15",
    "days": 34,
    "base-kwh": 1337000,
    "base-kw": 39323.5294117647,
    "low-kwh": 448000,
    "low-kw": 3500,
    "high-kwh": 301000,
    "high-kw": 3570,
    "total-kwh": 2086000,
    "billing-kw": 3710,
    "total-cost": 560352.64
  },
  {
    "bill-date": "25-08-12",
    "days": 27,
    "base-kwh": 1050000,
    "base-kw": 38888.8888888889,
    "low-kwh": 357000,
    "low-kw": 3360,
    "high-kwh": 245000,
    "high-kw": 3290,
    "total-kwh": 1652000,
    "billing-kw": 3640,
    "total-cost": 458328.05
  },
  {
    "bill-date": "25-07-16",
    "days": 65,
    "base-kwh": 2415000,
    "base-kw": 37153.8461538462,
    "low-kwh": 840000,
    "low-kw": 3290,
    "high-kwh": 574000,
    "high-kw": 3360,
    "total-kwh": 3829000,
    "billing-kw": 3640,
    "total-cost": 973991.71
  },
  {
    "bill-date": "25-05-12",
    "days": 28,
    "base-kwh": 994000,
    "base-kw": 35500,
    "low-kwh": 336000,
    "low-kw": 3150,
    "high-kwh": 224000,
    "high-kw": 3150,
    "total-kwh": 1554000,
    "billing-kw": 3640,
    "total-cost": 374962.1
  },
  {
    "bill-date": "25-04-14",
    "days": 28,
    "base-kwh": 966000,
    "base-kw": 34500,
    "low-kwh": 329000,
    "low-kw": 3080,
    "high-kwh": 217000,
    "high-kw": 2940,
    "total-kwh": 1512000,
    "billing-kw": 3640,
    "total-cost": 361236.79
  },
  {
    "bill-date": "25-03-17",
    "days": 33,
    "base-kwh": 1169000,
    "base-kw": 35424.2424242424,
    "low-kwh": 392000,
    "low-kw": 3080,
    "high-kwh": 259000,
    "high-kw": 3150,
    "total-kwh": 1820000,
    "billing-kw": 3640,
    "total-cost": 420627.12
  },
  {
    "bill-date": "25-02-12",
    "days": 27,
    "base-kwh": 952000,
    "base-kw": 35259.2592592593,
    "low-kwh": 315000,
    "low-kw": 3010,
    "high-kwh": 217000,
    "high-kw": 3010,
    "total-kwh": 1484000,
    "billing-kw": 3640,
    "total-cost": 351821.2
  },
  {
    "bill-date": "25-01-16",
    "days": 31,
    "base-kwh": 1064000,
    "base-kw": 34322.5806451613,
    "low-kwh": 378000,
    "low-kw": 3150,
    "high-kwh": 259000,
    "high-kw": 3220,
    "total-kwh": 1701000,
    "billing-kw": 3640,
    "total-cost": 389149.77
  },
  {
    "bill-date": "24-12-16",
    "days": 32,
    "base-kwh": 1183000,
    "base-kw": 36968.75,
    "low-kwh": 385000,
    "low-kw": 3220,
    "high-kwh": 252000,
    "high-kw": 3150,
    "total-kwh": 1820000,
    "billing-kw": 3640,
    "total-cost": 402180.25
  },
  {
    "bill-date": "24-11-14",
    "days": 35,
    "base-kwh": 1260000,
    "base-kw": 36000,
    "low-kwh": 427000,
    "low-kw": 3290,
    "high-kwh": 294000,
    "high-kw": 3220,
    "total-kwh": 1981000,
    "billing-kw": 3640,
    "total-cost": 434088.36
  },
  {
    "bill-date": "24-10-10",
    "days": 28,
    "base-kwh": 1036000,
    "base-kw": 37000,
    "low-kwh": 357000,
    "low-kw": 3220,
    "high-kwh": 238000,
    "high-kw": 3290,
    "total-kwh": 1631000,
    "billing-kw": 3640,
    "total-cost": 381933.45
  },
  {
    "bill-date": "24-09-12",
    "days": 29,
    "base-kwh": 1106000,
    "base-kw": 38137.9310344828,
    "low-kwh": 392000,
    "low-kw": 3570,
    "high-kwh": 273000,
    "high-kw": 3640,
    "total-kwh": 1771000,
    "billing-kw": 3640,
    "total-cost": 422235.85
  },
  {
    "bill-date": "24-08-14",
    "days": 33,
    "base-kwh": 1260000,
    "base-kw": 38181.8181818182,
    "low-kwh": 427000,
    "low-kw": 3500,
    "high-kwh": 287000,
    "high-kw": 3570,
    "total-kwh": 1974000,
    "billing-kw": 3710,
    "total-cost": 459329.02
  },
  {
    "bill-date": "24-07-12",
    "days": 30,
    "base-kwh": 1078000,
    "base-kw": 35933.3333333333,
    "low-kwh": 385000,
    "low-kw": 3500,
    "high-kwh": 266000,
    "high-kw": 3150,
    "total-kwh": 1729000,
    "billing-kw": 3710,
    "total-cost": 392269.71
  },
  {
    "bill-date": "24-06-12",
    "days": 32,
    "base-kwh": 1127000,
    "base-kw": 35218.75,
    "low-kwh": 378000,
    "low-kw": 3080,
    "high-kwh": 252000,
    "high-kw": 3080,
    "total-kwh": 1757000,
    "billing-kw": 3710,
    "total-cost": 366453.05
  },
  {
    "bill-date": "24-05-11",
    "days": 29,
    "base-kwh": 1008000,
    "base-kw": 34758.6206896552,
    "low-kwh": 350000,
    "low-kw": 3010,
    "high-kwh": 238000,
    "high-kw": 3010,
    "total-kwh": 1596000,
    "billing-kw": 3710,
    "total-cost": 328822.16
  },
  {
    "bill-date": "24-04-12",
    "days": 29,
    "base-kwh": 1022000,
    "base-kw": 35241.3793103448,
    "low-kwh": 357000,
    "low-kw": 3080,
    "high-kwh": 238000,
    "high-kw": 3010,
    "total-kwh": 1617000,
    "billing-kw": 3710,
    "total-cost": 336682.83
  },
  {
    "bill-date": "24-03-14",
    "days": 31,
    "base-kwh": 1092000,
    "base-kw": 35225.8064516129,
    "low-kwh": 399000,
    "low-kw": 3080,
    "high-kwh": 266000,
    "high-kw": 3080,
    "total-kwh": 1757000,
    "billing-kw": 3710,
    "total-cost": 365354.86
  },
  {
    "bill-date": "24-02-12",
    "days": 31,
    "base-kwh": 1169000,
    "base-kw": 37709.6774193548,
    "low-kwh": 364000,
    "low-kw": 3290,
    "high-kwh": 245000,
    "high-kw": 3150,
    "total-kwh": 1778000,
    "billing-kw": 3710,
    "total-cost": 368245.46
  }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = [...array.map((el, index) => [el, index])];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'bill-date',
    label: 'Billing date'
  },
  {
    id: 'days',
    label: 'Days in period'
  },
  {
    id: 'base-kwh',
    label: 'Base kWh'
  },
  {
    id: 'base-kw',
    label: 'Base kW'
  },
  {
    id: 'low-kwh',
    label: 'Low kWh'
  },
  {
    id: 'low-kw',
    label: 'Low kW'
  },
  {
    id: 'high-kwh',
    label: 'High kWh'
  },
  {
    id: 'high-kw',
    label: 'High kW'
  },
  {
    id: 'total-kwh',
    label: 'Total kWh'
  },
  {
    id: 'billing-kw',
    label: 'Billing kW'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function BillingTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function BillingStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function BillingTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <BillingTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell>{row["bill-date"]}</TableCell>
                  <TableCell>{row["days"]}</TableCell>
                  <TableCell>{row["base-kwh"]}</TableCell>
                  <TableCell>{row["base-kw"]}</TableCell>
                  <TableCell>{row["low-kwh"]}</TableCell>
                  <TableCell>{row["low-kw"]}</TableCell>
                  <TableCell>{row["high-kwh"]}</TableCell>
                  <TableCell>{row["high-kw"]}</TableCell>
                  <TableCell>{row["total-kwh"]}</TableCell>
                  <TableCell>{row["billing-kw"]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

BillingTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

BillingStatus.propTypes = { status: PropTypes.number };

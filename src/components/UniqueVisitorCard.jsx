'use client';

import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from './MainCard';

import BillingChart from './BillingChart';
import AverageChart from './AverageChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard() {
  const [view, setView] = useState('billing'); // 'billing' or 'average'

  return (
    <>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid>
          <Typography variant="h5">Usage</Typography>
        </Grid>
        <Grid>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Button
              size="small"
              onClick={() => setView('billing')}
              color={view === 'billing' ? 'primary' : 'secondary'}
              variant={view === 'billing' ? 'outlined' : 'text'}
            >
              Billing
            </Button>
            <Button
              size="small"
              onClick={() => setView('average')}
              color={view === 'average' ? 'primary' : 'secondary'}
              variant={view === 'average' ? 'outlined' : 'text'}
            >
              Average
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          {/* <IncomeAreaChart view={view} /> */}
          {view === "billing" && 
            <BillingChart view={view} />
          }
          {view === "average" && 
            <AverageChart view={view} />
          }
        </Box>
      </MainCard>
    </>
  );
}

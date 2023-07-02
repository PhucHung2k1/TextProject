import { Box, Grid, Typography } from '@mui/material';

export const renderPayStructureDetail = (
  payStructureStyle: string,
  selectPaystructureConfig: any
) => {
  if (payStructureStyle === 'Commission') {
    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Commission Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .CommissionPayout
                }
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Max Commission Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .MaxCommissionPayout
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  if (payStructureStyle === 'Commission - Guarantee') {
    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Commission Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .CommissionPayout
                }
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Max Commission Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .MaxCommissionPayout
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Salary Guarantee Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .SalaryGuaranteePayout
                }
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Max Salary Guarantee Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .MaxSalaryGuaranteePayout
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  if (payStructureStyle === 'Hourly') {
    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Hourly Payout: </Typography>
              <Typography fontWeight="bold">
                %{selectPaystructureConfig?.PayStructureSettings.HourlyPayout}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Max Hourly Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {selectPaystructureConfig?.PayStructureSettings.MaxHourlyPayout}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  if (payStructureStyle === 'Salary') {
    return (
      <>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Salary Guarantee Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .SalaryGuaranteePayout
                }
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box className="m-1 flex">
              <Typography>Max Salary Guarantee Payout: </Typography>
              <Typography fontWeight="bold">
                %
                {
                  selectPaystructureConfig?.PayStructureSettings
                    .MaxSalaryGuaranteePayout
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
  return '';
};

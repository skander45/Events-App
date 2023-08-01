import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import DashboardCard from './DashboardCard';

const Upcoming_Events1 = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const successlight = theme.palette.success.light;
  return (
    <DashboardCard>
      <>
        <Typography variant="h3" fontWeight="700" align="center" color={primary}>
          Upcoming Events
        </Typography>
        <Typography variant="h2" fontWeight="700" mt="+10px" align="center" color={successlight}>
          5
        </Typography>
        <Typography variant="h5" fontWeight="400" mt="+10px" align="center">
          You didn't vote for 3 events
        </Typography>
      </>
    </DashboardCard>
  );
};

export default Upcoming_Events1;

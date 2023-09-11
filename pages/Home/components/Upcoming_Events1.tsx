import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import DashboardCard from './DashboardCard';
import { useEffect, useState } from "react"

export const Upcoming_Events1 = (props: any) => {
  const [events, setEvents] = useState([]);
  const [votedupevents, setVotedupevents] = useState([]);

  useEffect(() => {

    fetch('/api/upcommingEvents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(response => response.json()).then(data => {
      setEvents(data)
    })
    fetch(`/api/getupcommingeventsvoted/${props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(response => response.json()).then(data => {
      setVotedupevents(data)
    })

  }, [props.id])

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  return (
    <DashboardCard>
      <>
        <Typography variant="h3" fontWeight="700" align="center" color="#207EC2">
          Upcoming Events
        </Typography>
        <Typography variant="h2" fontWeight="700" mt="+10px" align="center" color="#007B86">
          {events.length}
        </Typography>
        <Typography variant="h5" fontWeight="400" mt="+10px" align="center">
          You won't attend {events.length - votedupevents.length} events
        </Typography>
      </>
    </DashboardCard>
  );
};

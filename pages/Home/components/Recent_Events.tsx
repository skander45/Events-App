
import DashboardCard from './DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
import { useEffect, useState } from "react"

interface Event {
  eventId: number;
  title: string;
  budget: number
  description: string
  end_date_and_time: string
  start_date_and_time: Date
  location: string
  uidcreator: string
}
const Recent_Events = () => {
  const [events, setEvents] = useState<Event[]>([{
    eventId: 0,
    title: "",
    description: "",
    end_date_and_time: "",
    start_date_and_time: new Date(),
    location: "",
    uidcreator: "",
    budget: 0,
  }])
  useEffect(() => {
    fetch('/api/recentEvents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

    }).then(response => response.json()).then(data => {
      setEvents(JSON.parse(JSON.stringify(data.sort((a: any, b: any) => Date.parse(b.start_date_and_time) - Date.parse(a.start_date_and_time)))))
    })
  }, [])
  const currentYear = new Date().getFullYear();
  const parseAdjust = (eventDate: any) => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
  };
  let a = new Date()
  return (
    <DashboardCard title="Recent Events">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[0]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[0]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{events[0]?.title}</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[1]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[1]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{events[1]?.title}</Typography>{' '}
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[2]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[2]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{events[2]?.title}</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[3]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[3]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{events[3]?.title}</Typography>{' '}
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[4]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[4]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">{events[4]?.title}</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>{String(new Date(events[5]?.start_date_and_time)).slice(0, 21) != "Invalid Date" && String(new Date(events[5]?.start_date_and_time)).slice(0, 21)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>{events[5]?.title}</TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default Recent_Events;


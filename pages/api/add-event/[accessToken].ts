// pages/api/create-calendar-event.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis'; // You'll need to install the googleapis library

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const accessToken = req.query.accessToken as string;

    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: accessToken });

    const calendar: any = google.calendar({ version: 'v3', auth: oAuth2Client });

    const event = {
        summary: req.body.title,
        description: req.body.description,
        start: {
            dateTime: req.body.start_date_and_time, // Replace with your desired start time
            timeZone: 'UTC',
        },
        end: {
            dateTime: req.body.end_date_and_time, // Replace with your desired end time
            timeZone: 'UTC',
        },
    };

    try {
        const createdEvent = await calendar.events.insert({
            calendarId: 'primary', // Use 'primary' for the user's primary calendar
            resource: event,
        });

        console.log('Event created:', createdEvent.data);
        res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Error creating event' });
    }
}

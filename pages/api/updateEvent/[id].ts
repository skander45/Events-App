// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

// pages/api/addData.js


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    req.body.start_date_and_time = new Date(req.body.start_date_and_time)
    req.body.end_date_and_time = new Date(req.body.end_date_and_time)
    const eventid = req.query.id

    const { title, location, description, start_date_and_time, end_date_and_time, type } = req.body;

    try {
        await prisma.event.update({
            where: { eventId: Number(eventid) },
            data: {
                title,
                location,
                description,
                start_date_and_time,
                end_date_and_time,
                type,
            },

        });
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

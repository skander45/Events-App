import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const eventid = req.query.id
    try {
        const data = await prisma.event.findUnique(
            {
                where: { eventId: Number(eventid) }
            }
        );
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data.' });
    }


}
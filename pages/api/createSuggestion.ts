import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    req.body.eventEventId = parseInt(req.body.eventEventId)
    req.body.date_and_time = new Date(req.body.date_and_time)

    const { eventEventId, name, suggestion, uid, date_and_time } = req.body;
    try {
        await prisma.suggestion.create({
            data: {
                eventEventId,
                name,
                suggestion,
                uid,
                date_and_time
            }
        })
        res.status(200).json({ message: 'Suggestion created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
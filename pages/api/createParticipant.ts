import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    req.body.eventEventId = parseInt(req.body.eventEventId)
    const { eventEventId, uid } = req.body;
    try {
        await prisma.participant.create({
            data: {
                eventEventId,
                uid
            }
        })
        res.status(200).json({ message: 'Participant created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

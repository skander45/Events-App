import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uidu = req.query.id
    try {
        const data = await prisma.event.findMany({
            where: {
                start_date_and_time: { gte: new Date(), },
                participants: {
                    some: {
                        uid: String(uidu)
                    }
                }
            },
            include: {
                participants: true
            }
        })
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data.' });
    }


}
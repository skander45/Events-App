import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uidu = req.query.id
    let month = new Date().getMonth()
    month = month + 1
    const year = new Date().getFullYear()
    const date = new Date().getDate()
    try {
        const data = await prisma.event.findMany({
            where: {
                start_date_and_time: { lte: new Date(`${year}-${month}-${date}`), gte: new Date(`${year}-${month}-01`), },
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
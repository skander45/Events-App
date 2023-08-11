import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let month = new Date().getMonth()
    month = month + 1
    const year = new Date().getFullYear()
    try {
        const data = await prisma.event.findMany({
            where: {
                start_date_and_time: { lte: new Date(`${year}-${month}-31`), gte: new Date(`${year}-${month}-01`), },
            },

        })
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data.' });
    }


}
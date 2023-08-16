import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uidu = req.query.id
    try {
        const data = await prisma.committee.findMany({
            select: {
                uid: true
            }
        });
        let datauser = data.map((obj: any) => obj.uid)
        res.status(200).json(datauser.includes(uidu));
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data.' });
    }

}
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const data = await prisma.event.findMany(); // Replace 'yourModelName' with the actual name of your Prisma model
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving data.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
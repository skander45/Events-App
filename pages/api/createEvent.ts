// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  req.body.start_date_and_time = new Date(req.body.start_date_and_time)
  req.body.end_date_and_time = new Date(req.body.end_date_and_time)

  const { title, location, description, uidcreator, start_date_and_time, end_date_and_time, type } = req.body;
  try {
    await prisma.event.create({
      data: {
        title,
        location,
        description,
        uidcreator,
        start_date_and_time,
        end_date_and_time,
        type,
      },

    });


    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

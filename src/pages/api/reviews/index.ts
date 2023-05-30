import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getReviews();
    case 'POST':
      return createReview();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getReviews() {
    const data = await prisma.review.findMany(convertQueryToPrismaUtil(req.query, 'review'));
    return res.status(200).json(data);
  }

  async function createReview() {
    await reviewValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.review.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

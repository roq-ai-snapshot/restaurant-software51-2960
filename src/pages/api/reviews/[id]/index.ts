import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getReviewById();
    case 'PUT':
      return updateReviewById();
    case 'DELETE':
      return deleteReviewById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getReviewById() {
    const data = await prisma.review.findFirst(convertQueryToPrismaUtil(req.query, 'review'));
    return res.status(200).json(data);
  }

  async function updateReviewById() {
    await reviewValidationSchema.validate(req.body);
    const data = await prisma.review.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteReviewById() {
    const data = await prisma.review.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

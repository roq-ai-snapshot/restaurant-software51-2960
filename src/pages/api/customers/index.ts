import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { customerValidationSchema } from 'validationSchema/customers';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCustomers();
    case 'POST':
      return createCustomer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCustomers() {
    const data = await prisma.customer.findMany(convertQueryToPrismaUtil(req.query, 'customer'));
    return res.status(200).json(data);
  }

  async function createCustomer() {
    await customerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.order?.length > 0) {
      const create_order = body.order;
      body.order = {
        create: create_order,
      };
    } else {
      delete body.order;
    }
    if (body?.review?.length > 0) {
      const create_review = body.review;
      body.review = {
        create: create_review,
      };
    } else {
      delete body.review;
    }
    const data = await prisma.customer.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { userValidationSchema } from 'validationSchema/users';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUser();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.user.findMany(convertQueryToPrismaUtil(req.query, 'user'));
    return res.status(200).json(data);
  }

  async function createUser() {
    await userValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.customer?.length > 0) {
      const create_customer = body.customer;
      body.customer = {
        create: create_customer,
      };
    } else {
      delete body.customer;
    }
    if (body?.restaurant?.length > 0) {
      const create_restaurant = body.restaurant;
      body.restaurant = {
        create: create_restaurant,
      };
    } else {
      delete body.restaurant;
    }
    if (body?.staff?.length > 0) {
      const create_staff = body.staff;
      body.staff = {
        create: create_staff,
      };
    } else {
      delete body.staff;
    }
    const data = await prisma.user.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

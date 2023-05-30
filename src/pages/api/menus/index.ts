import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menuValidationSchema } from 'validationSchema/menus';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenus();
    case 'POST':
      return createMenu();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenus() {
    const data = await prisma.menu.findMany(convertQueryToPrismaUtil(req.query, 'menu'));
    return res.status(200).json(data);
  }

  async function createMenu() {
    await menuValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.order_item?.length > 0) {
      const create_order_item = body.order_item;
      body.order_item = {
        create: create_order_item,
      };
    } else {
      delete body.order_item;
    }
    const data = await prisma.menu.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

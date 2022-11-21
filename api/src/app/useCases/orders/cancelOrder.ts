import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response) {
  //res.send('OK POST CREATE CATEGORY');
  try {
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

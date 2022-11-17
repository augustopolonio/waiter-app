import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProductsbyCategory(req: Request, res: Response) {
  const { categoryId } = req.params;

  const product = await Product.find().where('category').equals(categoryId);

  res.json(product);
}

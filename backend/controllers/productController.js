import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req, res) => {
  try {
    const response = await prisma.product.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!response) return res.status(404).json({ msg: "data tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
    // 400 = bad request
  }
};
export const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!response) return res.status(404).json({ msg: "data tidak ditemukan" });
    await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        price: price,
      },
    });
    res.status(201).json({ msg: "product updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!response) return res.status(404).json({ msg: "data tidak ditemukan" });
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(201).json({ msg: "product deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

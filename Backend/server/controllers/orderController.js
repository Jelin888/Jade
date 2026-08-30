import Order from '../models/Order.js';
import { generateOrderId } from '../utils/generateOrderId.js';

export const createOrder = async (req, res, next) => {
  try {
    const { itemType, item, itemName, amount } = req.body;
    const order = await Order.create({
      orderId: generateOrderId(),
      user: req.user.id,
      itemType,
      item,
      itemTypeModel: itemType === 'note' ? 'Note' : 'Course',
      itemName,
      amount,
    });
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

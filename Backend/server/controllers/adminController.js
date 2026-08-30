import User from '../models/User.js';
import Note from '../models/Note.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';

export const getAdminStats = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalNotes = await Note.countDocuments();
    const totalCourses = await Course.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalStudents,
        totalNotes,
        totalCourses,
        totalRevenue: 145800,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json({ students });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    next(error);
  }
};

export const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    next(error);
  }
};

import User from '../models/User.js';
import Note from '../models/Note.js';

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;
    user.class = req.body.class || user.class;

    const updatedUser = await user.save();
    res.json({
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentStats = async (req, res, next) => {
  try {
    res.json({
      stats: {
        purchasedNotes: 4,
        enrolledCourses: 2,
        totalOrders: 6,
        totalSpent: 1249,
        recentOrders: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentLibrary = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

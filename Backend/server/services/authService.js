import User from '../models/User.js';

export const validateUserCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return user;
  }
  return null;
};

import Note from '../models/Note.js';

export const getNotes = async (req, res, next) => {
  try {
    const { subject, class: className, type, search } = req.query;
    const query = {};

    if (subject) query.subject = subject;
    if (className) query.class = className;
    if (type) query.type = type;
    if (search) query.title = { $regex: search, $options: 'i' };

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    next(error);
  }
};

export const getPurchasedNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

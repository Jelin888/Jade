import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    class: { type: String, required: true },
    type: { type: String, enum: ['free', 'paid'], default: 'paid' },
    price: { type: Number, required: true, default: 0 },
    pages: { type: Number, default: 1 },
    fileUrl: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    downloads: { type: Number, default: 0 },
    topics: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;

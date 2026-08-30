import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  isFree: { type: Boolean, default: false },
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    level: { type: String, default: 'Beginner' },
    type: { type: String, enum: ['free', 'paid'], default: 'paid' },
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number },
    thumbnail: { type: String, default: '' },
    totalVideos: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    enrolled: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    learningOutcomes: [{ type: String }],
    videos: [videoSchema],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;

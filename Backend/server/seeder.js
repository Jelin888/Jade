import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Note from './models/Note.js';
import Course from './models/Course.js';
import Order from './models/Order.js';

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@edujade.in',
    password: 'password123',
    phone: '9876543210',
    role: 'admin',
    isVerified: true,
  },
  {
    name: 'Rohan Sharma',
    email: 'student@edujade.in',
    password: 'password123',
    phone: '9876543211',
    role: 'student',
    class: '10',
    isVerified: true,
  },
];

const sampleNotes = [
  {
    title: 'Class 10 Physics: Electricity & Magnetism',
    description: 'Complete comprehensive notes covering electric current, Ohm’s law, circuits, magnetic effects, and solved numericals.',
    subject: 'Physics',
    class: '10',
    price: 299,
    type: 'paid',
    fileUrl: '/uploads/sample_physics_notes.pdf',
    pageCount: 45,
  },
  {
    title: 'Class 12 Mathematics: Calculus Quick Formulas & Shortcuts',
    description: 'Handwritten revision formulas for Differentiation, Integration, and Differential Equations with step-by-step examples.',
    subject: 'Mathematics',
    class: '12',
    price: 399,
    type: 'paid',
    fileUrl: '/uploads/sample_maths_notes.pdf',
    pageCount: 60,
  },
  {
    title: 'Class 11 Chemistry: Organic Reaction Mechanisms Quick Guide',
    description: 'Free starter guide detailing key organic reaction pathways, substitution, elimination, and named reactions.',
    subject: 'Chemistry',
    class: '11',
    price: 0,
    type: 'free',
    fileUrl: '/uploads/sample_chem_notes.pdf',
    pageCount: 20,
  },
  {
    title: 'Class 9 Biology: Cell Unit of Life & Tissues',
    description: 'Detailed diagrams, key definitions, and NCERT exercise solutions for Class 9 Biology chapter 5 & 6.',
    subject: 'Biology',
    class: '9',
    price: 149,
    type: 'paid',
    fileUrl: '/uploads/sample_bio_notes.pdf',
    pageCount: 30,
  },
];

const sampleCourses = [
  {
    title: 'Class 10 Science Complete Tuition Batch (2026)',
    description: 'Master Physics, Chemistry, and Biology for Class 10 Board Examinations with live interactive classes, assignments, and mock tests.',
    subject: 'Physics',
    class: '10',
    price: 1499,
    type: 'paid',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    instructor: 'Dr. A. K. Sharma',
    videos: [
      { title: 'Intro to Electricity', videoUrl: 'https://www.youtube.com/embed/example1', duration: '45 mins' },
      { title: 'Ohm’s Law & Resistance', videoUrl: 'https://www.youtube.com/embed/example2', duration: '50 mins' },
    ],
  },
  {
    title: 'Class 12 Board Maths Masterclass & Problem Solving',
    description: 'Comprehensive tuition covering Calculus, Vectors, 3D Geometry, and Probability with previous 10-year board questions solved.',
    subject: 'Mathematics',
    class: '12',
    price: 2499,
    type: 'paid',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    instructor: 'Prof. Rajesh Kumar',
    videos: [
      { title: 'Limits & Continuity', videoUrl: 'https://www.youtube.com/embed/example3', duration: '60 mins' },
    ],
  },
];

const importData = async () => {
  await connectDB();
  try {
    console.log('🧹 Clearing existing database collections...');
    await User.deleteMany();
    await Note.deleteMany();
    await Course.deleteMany();
    await Order.deleteMany();

    console.log('🌱 Seeding Users...');
    const createdUsers = [];
    for (const u of sampleUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
    }

    const adminUser = createdUsers[0];

    console.log('🌱 Seeding Notes...');
    for (const n of sampleNotes) {
      await Note.create({ ...n, createdBy: adminUser._id });
    }

    console.log('🌱 Seeding Courses...');
    for (const c of sampleCourses) {
      await Course.create({ ...c, createdBy: adminUser._id });
    }

    console.log('🎉 Data successfully seeded into database!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

importData();

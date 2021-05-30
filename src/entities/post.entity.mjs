import mongoose from 'mongoose';

export default mongoose.model(
  'Post',
  new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    sections: [
      {
        sectionTitle: String,
        sectionBody: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  }),
);

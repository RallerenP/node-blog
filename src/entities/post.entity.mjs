import mongoose from 'mongoose';
import Comments from './comment.entity.mjs';

const postSchema = new mongoose.Schema({
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
});

export default mongoose.model(
  'Post',
  postSchema,
);

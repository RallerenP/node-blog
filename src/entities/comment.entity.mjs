import mongoose from 'mongoose';

export default mongoose.model(
  'Comment',
  new mongoose.Schema({
    author: String,
    text: String,
    timestamp: Date,
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  })
);

import mongoose from 'mongoose';

export default mongoose.model('Post', {
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

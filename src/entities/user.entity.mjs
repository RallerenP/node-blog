import mongoose from 'mongoose';

export default mongoose.model('User', {
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false, required: false },
  password: { type: String, required: true },
});

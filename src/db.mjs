import mongoose from 'mongoose';

export default async function connect() {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

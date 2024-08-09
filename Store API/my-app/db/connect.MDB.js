import mongoose from 'mongoose';

const connectMDB = (url) => {
  return mongoose.connect(url)
};

export default connectMDB;
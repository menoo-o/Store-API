import mongoose from 'mongoose';

const connectMDB = (url) => {
  return mongoose.connect(url, {
    useUnifiedTopology: true,
  })
};

export default connectMDB;
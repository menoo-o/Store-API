
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

//async errors
import "express-async-errors";

import connectMDB from './db/connect.MDB.js';
import Prouter from './routes/products.js'


import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js'

//express json middleware
app.use(express.json())

//routes
app.get('/', (req,res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products">Products Route</a>')
})

//products route
app.use('/api/v1/products', Prouter)

//products route

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectMDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};


start()
import dotenv from 'dotenv';
dotenv.config();

import connectMDB from './db/connect.MDB.js';
import { Product } from './model/product.js';
import jsonProducts from './products.json' assert { type: 'json' };

const start = async () =>{
    try{
        await connectMDB (process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log("success");
        process.exit(0)
    } catch (error){
        console.log(error);
        process.exit(1)
    }
}

start()
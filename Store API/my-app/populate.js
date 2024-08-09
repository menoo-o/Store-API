import dotenv from 'dotenv';
dotenv.config();

import connectMDB from './db/connect.MDB.js';
import { Product } from './model/product.js';
import products from './products.json' assert { type: 'json' };

const start = async () =>{
    try{
        await connectMDB (process.env.MONGO_URI)
        console.log("success");
        
    } catch (error){
        console.log(error);
        
    }
}

start
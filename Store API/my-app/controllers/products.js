import { Product } from '../model/product.js';



const getAllProductsStatic = async (req, res)=>{
    const products = await Product.find({})
    res.status(200).json({products , nbHits: products.length})
}

const getAllProducts= async (req, res)=>{
    const {featured, company, name} = req.query;
    const queryObject = {}
    if (featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company){
        queryObject.company = company.toLowerCase();
    }

    if (name){
        queryObject.name = name;
    }

    console.log(queryObject);
    
    const products = await Product.find(req.query)
    res.status(200).json({products , nbHits: products.length})
}


export default { getAllProducts, getAllProductsStatic };
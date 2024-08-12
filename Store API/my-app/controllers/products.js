import { Product } from '../model/product.js';



const getAllProductsStatic = async (req, res) => {
    try {
      
      const products = await Product.find({}).sort('-name price')
      res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const getAllProducts= async (req, res)=>{
    const {featured, company, name, sort} = req.query;
    const queryObject = {}
    if (featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company){
        queryObject.company = company.toLowerCase();
    }

    if (name){
        queryObject.name = { $regex: name, $options: 'i' };
    }


    
    let results = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ');
        results= results.sort(sortList);
        console.log(results);
        
    }else{
        results = results.sort('createdAt');
    }
    const products = await results
    res.status(200).json({products , nbHits: products.length})
}


export default { getAllProducts, getAllProductsStatic };
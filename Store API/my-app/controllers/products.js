import { Product } from '../model/product.js';



const getAllProductsStatic = async (req, res) => {
    try {
      const products = await Product.find({price:{$gt: 30 }})
      .sort('price')
      .limit(4)

      res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const getAllProducts= async (req, res)=>{
    const {featured, company, name, sort, numericFilters} = req.query;
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
    if (numericFilters) {
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        };
    
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    
        console.log(queryObject); // See what the query object looks like
    }
    
    let results = Product.find(queryObject);
    
    if(sort){
        const sortList = sort.split(',').join(' ');
        results= results.sort(sortList);
        
    }else{
        results = results.sort('createdAt');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1 ) * limit;

    results = results.skip(skip).limit(limit)
    //23 products
    //4 7 7 7 2
    const products = await results
    res.status(200).json({products , nbHits: products.length})
}


export default { getAllProducts, getAllProductsStatic };
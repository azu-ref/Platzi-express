const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productsService = new ProductsService();

router.get('/', async function (req, res, next)  {

    const {tag} = req.query;
    try{
    const products = await productsService.getProducts({tag})
    console.log(products);
    res.render('products', {products});
    }catch(err){
        next(err);
    }
});

module.exports = router;
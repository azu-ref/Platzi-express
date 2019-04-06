const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productsService = new ProductsService();

router.get('/', async function (req, res, next)  {

    const {tag} = req.query;
    try{
    const products = productsService.getProducts({tag})
    res.render('products', {products});
    }catch(err){
        next(err);
    }
});

module.exports = router;
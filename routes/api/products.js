const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products')

const { productIdSchema, 
    productTagSchema, 
    createProductSchema, 
    updateProductSchema } = require('../../utils//schemas/products')

const ProductsServices = new ProductsService();

router.get('/', async function(req, res, next){

    const {tags} = req.query;
   
        try{
            const products = await ProductsServices.getProducts({ tags })

            res.status(200).json({
                data: products,
                message: "products listed"           
                });
            }
            catch(err){
                next(err)
            }

});

router.get('/:productId', async function(req, res, next){

    const {productId} = req.params;

    try{
        const product = await ProductsServices.getProduct({ productId });

        res.status(200).json({
            data: product,
            message: "product retrieved"
        });
        }catch(err){
            next(err)
        }
});

router.post('/', async function(req, res, next){

    const { body: product } = req;

    try{
        
        const createProduct = await ProductsServices.createProducts({ product });

        res.status(201).json({
            data: createProduct,
            message: "product listed"
        });
        }catch(err){
            next(err)
        }
})

router.put('/:productId', async function(req, res, next){

    const { productId } = req.params;
    const { body: product } = req;

    try{
            
        const updatedProduct = await ProductsServices.updateProducts({ productId, product });

        res.status(200).json({
            data: product,
            message: "product update"
        });
    }catch(err){
        next(err)
    }
})

router.delete('/:productId', async function(req, res, next){
    const { productId } = req.params;

    try{
        const product = await ProductsServices.deleteProducts({ productId });

        res.status(200).json({
            data: product,
            message: "product deleted"
        });
        }catch(err){
            next(err)
        }
})

module.exports = router;
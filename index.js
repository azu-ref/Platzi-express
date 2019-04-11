const express = require('express');
const path = require('path')
const boom = require('boom');
const productsRoutes = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

const {
logErrors,
wrapErrors,
clienteErrorHandler,
errorHandler
} = require ('./utils/middlewares/erroHandler');

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// init app
const app = express();

// midlewares
app.use(express.json())

// static files
app.use("/static", express.static(path.join(__dirname, 'public')))

// define port
app.set('port', process.env.PORT || 3000)
// view ingine setup
  .set('views', path.join(__dirname,'views'))
  .set('view engine', 'pug')
  
  // routes
app.use('/products', productsRoutes)
  .use('/api/products', productsApiRouter)

  // redirect
app.get('/', function(req, res){
  res.redirect('/products');
})

app.use(function(req, res, next){
  if(isRequestAjaxOrApi(req)){
    const {
      output: {statusCode, payload}
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
})

 //error handlers
 app.use(logErrors)
    .use(wrapErrors)
    .use(clienteErrorHandler)
    .use(errorHandler);  

const server = app.listen(app.get('port'), () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})


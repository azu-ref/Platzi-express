const express = require('express');
const path = require('path')
const app = express();
const engines = require('consolidate');
const productsRouter = require('./routes/products');

app.engine('hbs', engines.handlebars)

app.set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname,'views'))
  .set('view engine', 'hbs');

app.get('/', (req, res)=>{
  res.render("index", {hello: "hola", world: "mundo"});
})

app.use('/products', productsRouter);


const server = app.listen(app.get('port'), () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})


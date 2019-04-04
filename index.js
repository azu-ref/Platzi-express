const express = require('express');
const path = require('path')
const app = express();
const routes = require('./routes')

app.set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname,'views'))
  .set('view engine', 'pug')

app.get('/products', routes.productsRoutes)

const server = app.listen(app.get('port'), () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})


const express = require('express');
const path = require('path')
const app = express();
const productsRoutes = require('./routes/products')

app.use("/static", express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || 3000)
  .set('views', path.join(__dirname,'views'))
  .set('view engine', 'pug')

app.use('/products', productsRoutes)

const server = app.listen(app.get('port'), () => {
    console.log(`Listening http://localhost:${server.address().port}`);
})


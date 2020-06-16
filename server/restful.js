const express = require('express');
const app = express()
const router = express.Router()

const config = require('./config')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json() 

const knex = require('knex')({
    client: 'mysql',
    connection: config.database
})

app.locals.knex = knex

// CORS configuration
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', ['GET, PUT, POST, DELETE']);
    res.append('Access-Control-Allow-Headers', ['Content-Type']);
    next();
})

const routes = require('./routes')

// API Routing
router.get('/users', routes.UserRoutes.GetAllUsers);
router.get('/users/:name', routes.UserRoutes.GetUserLogin);
router.post('/users', jsonParser, routes.UserRoutes.PostUser);
router.put('/users/:id', jsonParser, routes.UserRoutes.UpdateUser);
router.delete('/users/:id', routes.UserRoutes.DeleteUser);

router.get('/products', routes.ProductRoutes.GetAllProducts);
router.get('/products/:id', routes.ProductRoutes.GetProduct);
router.post('/products', jsonParser, routes.ProductRoutes.PostProduct);
router.put('/products/:id', jsonParser, routes.ProductRoutes.UpdateProduct);
router.delete('/products/:id', routes.ProductRoutes.DeleteProduct);

router.get('/gamedev', routes.gamedevList.listAllGameDevs);
router.get('/gamedev/:id', routes.gamedevList.listSingleGameDev);
router.post('/gamedev', jsonParser, routes.gamedevList.postGameDev);
router.put('/gamedev/:id', jsonParser, routes.gamedevList.updateGameDev);
router.delete('/gamedev/:id', routes.gamedevList.deleteGameDev);

app.use('/api', router);

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
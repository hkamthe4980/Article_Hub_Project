const express = require('express');//: Framework for building APIs
var cors = require('cors');//Allows requests from different origins (useful for frontend-backend communication).

const connection = require('./connection');
const appuserRoute = require('./Routes/appuser')
const categoryRoutes = require('./routes/category')

const articleRoute = require('./Routes/article')

const app = express();//we are creating an Express application instance. This app object represents 
// our web server, which handles incoming requests and sends responses.

app.use(cors());
app.use(express.json());

app.use('/appuser',appuserRoute);
app.use('/category',categoryRoutes);
app.use('/article',articleRoute)
module.exports = app;//The server is exported so it can be used in another file, likely server.js or index.js.

// require('dotenv').config();
const http = require('http');
const app = require('./index');


app.get('/',(req,resp)=>{
    resp.send("Server is running");
});
const server = http.createServer(app);
server.listen(process.env.PORT);
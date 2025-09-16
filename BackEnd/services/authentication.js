require('dotenv').config()
const jwt = require('jsonwebtoken')


function authenticateToken(req, resp, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //authHeader.split(' '): The split(' ') method divides the string into an array by separating it at each space (' '). The first part is the type of token 
    //(usually Bearer), and the second part is the token itself.
    if (token == null)
        return resp.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) 
        return resp.sendStatus(403);
        
        resp.locals = response;//In Node.js, particularly when using Express.js, res.locals is an 
        // object that is available only for the life cycle of the request. It is used to store data 
        // that you want to pass to the response, typically for rendering templates or sharing data across middleware functions.
        next()

    })

}


module.exports={
    authenticateToken:authenticateToken
}
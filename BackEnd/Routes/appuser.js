const express = require('express');// Framework for building APIs
const connection = require('../connection');
const router = express.Router();//In Express.js, routes define how an application responds to client 
// requests for specific endpoints (URLs)

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../services/authentication');


router.post('/addnewAppuser', auth.authenticateToken, (req, res) => {
    let user = req.body;
    query = "select email,password,status from appuser where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into appuser(name,email,password,status,isDeletable) values(?,?,?,'false','true')";
                connection.query(query, [user.name, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Succesfully Registerd" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email Already Exist" })
            }

        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, resp) => {
    const user = req.body;
    query = " select email,password,status,isDeletable from appuser where email=?";
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <= 0 || result[0].password != user.password) {
                return resp.status(401).json({ message: "Incorret email or password" });


            }
            else if (result[0].status === 'false') {
                return resp.status(401).json({ message: "Wait For Admin Approval" });
            }
            else if (result[0].password == user.password) {
                const response = { email: result[0], isDeletable: result[0].isDeletable }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                resp.status(200).json({ token: accessToken });
            }
            else {
                return resp.status(400).json({ message: "Something went wrong ,Please try again later " });

            }
        }
        else {
            return resp.status(500).json(err);
        }
    })

})


router.get('/getAllAppUser', auth.authenticateToken, (req, resp) => {
    const tokenPayload = resp.locals;
    var query;
    if (tokenPayload.isDeletable === 'false') {
        query = "select id,name,email,status from appuser where isDeletable='true' ";
    }
    else {
        query = "select id,name,email,status from appuser where isDeletable= 'true' where row=0"
    }
    connection.query(query, [tokenPayload.email], (err, result) => {
        if (!err) {
            return resp.status(200).json(result);
        }
        else {
            return resp.status(500).json(err);
        }

    })
})


router.post('/updateUserStatus', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    var query = "update appuser set status=? where id=? and isDeletable='true'";
    connection.query(query, [user.status, user.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return resp.status(404).json({ message: "User ID Does not exist" });

            }
            return resp.status(200).json({ message: "User Updated Succesfully" });
        }
        else {
            return resp.status(500).json(err);

        }

    })
})

router.post('/updateUser', auth.authenticateToken, (req, resp) => {
    let user = req.body;
    var query = "update appuser set name=?,email=? where id=?";
    connection.query(query, [user.name, user.email,user.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return resp.status(404).json({ message: "User ID Does not exist" });

            }
            return resp.status(200).json({ message: "User Updated Succesfully" });
        }
        else {
            return resp.status(500).json(err);

        }

    })

})
router.get('/checkToken',auth.authenticateToken,(req,resp)=>{
    return resp.status(200).json({message:"true"});

})


module.exports = router;
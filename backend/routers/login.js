const express = require('express');
const db = require('./database/dbCon');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (data.email !== "" && data.pass !== "") {
            let dbCon = await db.handler();
            let collection = dbCon.collection('user');

            let json = {
                "email": data.email
            }

            let getData = await collection.findOne(json);
            console.log(getData);

            if (await bcrypt.compare(data.pass, getData.pass)) {
                await db.close();
                let token = await jwt.sign(
                    getData,
                    'secret', { expiresIn: 12});
                
                console.log(token);
                return res.json({
                    status:200,
                    body: token
                });
            } else {
                return res.json({
                    status:404,
                    body: "Password is not correct"
                });
            }
        } else {
            return res.json({
                status:404,
                body: "Text should not be empty"
            });
        }
    } catch (e) {
        return res.json({
            status:500,
            body: e.message
        });
    }
})


module.exports = router;
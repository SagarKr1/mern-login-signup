const express = require('express');
const db = require('./database/dbCon');
var bcrypt = require('bcryptjs');

const router = express.Router()

router.post('/post', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (data.email !== "" && data.name !== "" && data.pass !== "") {
            let dbCon = await db.handler();
            let collection = dbCon.collection('user');
            const json = {
                "email": data.email
            }
            let getData = await collection.findOne(json);
            console.log(getData);
            if (getData !== null) {
                return res.json({
                    status:404,
                    body: "user already exist"
                });
            } else {

                var salt = bcrypt.genSaltSync(8);
                var hashPass = bcrypt.hashSync(data.pass, salt);

                const userData = {
                    "name": data.name,
                    "nameFW":data.name[0],
                    "email": data.email,
                    "pass": hashPass
                }
                console.log(userData);

                await collection.insertOne(userData);
                await db.close();

                return res.json({
                    status:200,
                    body: "Account created successfully"
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
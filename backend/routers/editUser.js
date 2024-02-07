const express = require('express');
const db = require('./database/dbCon');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router()

router.put('/user', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (data.name !== "" && data.email !== "") {
            let dbCon = await db.handler();
            let collection = dbCon.collection('user');
            let getData = await collection.findOne({ email: data.email });
            if (getData !== null) {
                await collection.updateOne({ "email": data.email }, { $set: { name: data.name, nameFW: data.name[0] } });
                await db.close();
                let json = {
                    "name": data.name,
                    "email": data.email,
                    "nameFW": data.name[0]
                }
                let token = await jwt.sign(
                    json,
                    'secret',
                    { expiresIn: 12 }
                );

                console.log(token);
                return res.json({
                    status: 200,
                    body: token
                });
            } else {
                return res.json({
                    status: 404,
                    body: "data not found"
                });
            }
        } else {
            return res.json({
                status: 404,
                body: "Text should not be empty"
            });
        }
    } catch (e) {
        return res.json({
            status: 500,
            body: e.message
        });
    }
})



router.put('/password', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if (data.newPass !== "" && data.email !== "" && data.oldPass) {
            let dbCon = await db.handler();
            let collection = dbCon.collection('user');
            let getData = await collection.findOne({ email: data.email });
            if (getData !== null) {
                if (await bcrypt.compare(data.oldPass, getData.pass)) {
                    var salt = bcrypt.genSaltSync(8);
                    var hashPass = bcrypt.hashSync(data.newPass, salt);
                    await collection.updateOne({ "email": data.email }, { $set: { pass: hashPass } });
                    return res.json({
                        status: 200,
                        body: "Data updated"
                    });
                } else {
                    return res.json({
                        status: 404,
                        body: "Password is not correct"
                    });
                }

            } else {
                return res.json({
                    status: 404,
                    body: "data not found"
                });
            }
        } else {
            return res.json({
                status: 404,
                body: "Text should not be empty"
            });
        }
    } catch (e) {
        return res.json({
            status: 500,
            body: e.message
        });
    }
})




module.exports = router;
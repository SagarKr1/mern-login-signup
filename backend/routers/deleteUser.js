const express = require('express');
const db = require('./database/dbCon');

const router = express.Router()

router.delete('/user', async (req, res) => {
    try {
        console.log("delete api");
        const data = req.body;
        console.log(data);
        if(data.email!=="" && data.email!==undefined){
            let dbCon = await db.handler();
            let collection = dbCon.collection('user');
            await collection.deleteOne({"email":data.email});
            await db.close();
            return res.json({
                status:200,
                body: "User Deleted Successfully"
            });
        }else{
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
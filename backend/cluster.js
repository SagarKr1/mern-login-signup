const cluster = require('node:cluster');
const os = require('os');
const express = require('express');

const totalCPUs = os.cpus().length;
console.log(totalCPUs);


if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {

    const app = express();

    app.get("/", (req, res) => {
        res.send(`Hello world ${process.pid}`);
    })

    // app.use('/login', login);

    // app.use('/signup', signup);

    // app.use('/edit', editUser);

    // app.use('/delete', deleteUser);


    app.listen(4000, () => {
        console.log("Port is running at 4000");
    })
}
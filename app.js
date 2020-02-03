'use strict';

const express = require('express');
const basicAuth = require('./src/basic-auth-middleware.js');
const users = require('./src/users.js');
const oauth = require('./src/oauth-middleware.js');

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.post('/signup', (req, res) => {
    try {
        users.save(req.body)
            .then(user => {
                let token = users.generateToken(user);
                res.status(200).send(token);
            });

    } catch (error) {

        next(`ERROR: ${e.message}`);
    }

});

app.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.token);
});

app.get('/users', basicAuth, (req, res) => {
    res.status(200).json(users.list());
});

app.get('/oauth', oauth, (req, res) => {
    res.status(200).send(req.token);
});
let PORT = 3000;
app.listen(PORT, () => console.log(`server listen on port ${PORT}`));
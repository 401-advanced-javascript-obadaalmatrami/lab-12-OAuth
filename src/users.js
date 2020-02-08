'use strict';

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

let SECRET = 'mynameissecret';

let db = {};
let users = {};

users.save = async function(record) {

    if (!db[record.username]) {
        record.password = await bcryptjs.hash(record.password, 5);

        db[record.username] = record;

        return record;
    }

    return Promise.reject();
}

users.authenticateBasic = async function(user, pass) {
    let valid = await bcryptjs.compare(pass, db[user].password);
    return valid ? db[user] : Promise.reject();
}

users.generateToken = function(user) {
    let token = jwt.sign({ username: user.username }, SECRET);
    return token;
}

users.list = () => db;

module.exports = users;
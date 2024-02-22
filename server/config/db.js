const mongoose = require('mongoose');

const connect = () => {mongoose.connect(process.env.dbURI)
        .then(() => {
            console.log("Connected to Database");
        })
        .catch(err => console.log(err))}

module.exports = connect;
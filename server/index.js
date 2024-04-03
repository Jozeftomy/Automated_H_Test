// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const Automated_H_TestModel = require('./models/Automated_H_Test')


// const app = express()
// app.use(express.json())
// app.use(cors())


// mongoose.connect("mongodb://127.0.0.1:27017/Automated_H_Test");

// app.post('/users', (req,res) => {
//     Automated_H_TestModel.create(req.body)
//     .then(Automated_H_Test => res.json(Automated_H_Test))
//     .catch(err => res.json(err))

// })

// app.listen(3001,()=>{
//     console.log("server is running")
// })

// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/User'); // Import the User model instead of Automated_H_Test

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/Automated_H_Test");

app.post('/users', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("server is running");
});

const mongoose = require("mongoose");
mongoose.Promise=Promise
mongoose.set('strictQuery', true)
require('dotenv').config();
mongoose.connect(
    `mongodb+srv://indra:indra1999@cluster0.aadkh.mongodb.net/axlr`,{
        useNewUrlParser : true,
        useUnifiedTopology: true,
    }

).then(()=>{
    console.log("DB connection successfull")
})

exports.User = require('../models/user')
exports.Book = require('../models/book')


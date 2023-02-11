const express = require('express')
const readXlsxFile = require("read-excel-file/node");
const db = require("../models/index")



exports.dashboard = async (req, res) => {
    try{
        let data = await db.Book.find({})
        console.log(data)
        return res.render("dashboard.ejs",{error:'',data:data})
    }catch(error){
        return res.status(500).send("Internal server error",error)
    }
    
}

exports.uploadFile =  async (req, res) => {
    try{
        console.log("file",req.file)
        console.log(req.file.mimetype.includes("spreadsheetml"))
        let data = await db.Book.find({})
        if(!req.file.mimetype.includes("spreadsheetml")){
            return res.render("dashboard.ejs",{error:{
                error:"upload  excel file only"},data:data})
        }
        readXlsxFile(req.file.path).then(async(rows)=>{
            console.log(rows)
            for(let i=1;i<rows.length;i++){
                console.log(rows[i][0])
                 await db.Book.create({title:rows[i][0],author:rows[i][1],published:rows[i][2]})
            }
        })
        data = await db.Book.find({})
        console.log("updated",data)
        return res.render("dashboard.ejs",{error:{
            message:"file upload successfull"},data:data})

    }catch(error){
        return res.status(500).send("Internal server error",error)
    }
    
}

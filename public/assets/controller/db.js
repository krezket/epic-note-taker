const express = require('express')
const router = express.Router();
const uuid = require('uuid');
const fs = require('fs');

router.get('/',(req,res) => {
    console.info(`${req.method} request received`);
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) {
            return res.status(500).json({msg:"error reading db"})
        }
        else {
            const dataArr = JSON.parse(data);
            return res.json(dataArr);
        }
    })
});

router.post('/', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).json({msg:"error reading db"})
        }
        else {
            const dataArr = JSON.parse(data);
            const newText = {
                id:uuid.v4(),
                title:req.body.title,
                text:req.body.text
            }
            console.log(newText)
            dataArr.push(newText)
            fs.writeFile("./db/db.json", JSON.stringify(dataArr,null,4),(err)=>{
                if (err) {
                    return res.status(500).json({msg:"error reading db"});
                }
                else {
                    return res.json(newText);
                }
            })
        }
    })


});

router.get("/:textId",(req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } 
        else {
            const text = JSON.parse(data);
            const textId = req.params.textId;
            for (let i = 0; i < text.length; i++) {
                if(text[i].id==textId){
                    return res.json(text[i])
                }   
            }
        }
    })
});

router.delete("/:textId", (req,res)=>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).json({msg:"error reading db"})
        } 
        else {
            const text = JSON.parse(data);
            const textId = req.params.textId;
            for (let i = 0; i < text.length; i++) {
                if(text[i].id==textId){
                    text.splice(i, 1)
                }   
            }
            fs.writeFile("./db/db.json", JSON.stringify(text,null,4),(err)=>{
                if (err) {
                    return res.status(500).json({msg:"error reading db"});
                }
                else {
                    return res.json(text);
                }
            })
        }
    })
});

module.exports = router;
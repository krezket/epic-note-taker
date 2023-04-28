const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname,'../pages/notes.html'))
});

const textRoute = require('./db')
router.use('/api/notes',textRoute);

module.exports = router;
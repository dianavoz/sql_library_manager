const express = require('express');
const router = express.Router();

//redirect index to books page
router.get('/',(req,res)=>{
    res.redirect('/books');

});


module.exports=router;

const express = require('express');
const router = express.Router();

//@router   GET api/users/test
//@description   tests users router
//@access   Public router 

router.get('/test', (req, res) => {
    res.json({
        msg: 'Users works' 
    })
});
module.exports = router;
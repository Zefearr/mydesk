const express = require('express');
const router = express.Router();

//@router   GET api/posts/test
//@description   tests post router
//@access   Public router 

router.get('/test', (req, res) => {
    res.json({
        msg: 'Posts works' 
    })
});
module.exports = router;
const express = require('express');
const router = express.Router();

//@router   GET api/profile/test
//@description   tests profile router
//@access   Public router 

router.get('/test', (req, res) => {
    res.json({
        msg: 'Profile works'
    })
});
module.exports = router;
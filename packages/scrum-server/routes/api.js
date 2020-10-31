var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json( { "message": "API is working properly"} );
});

router.post('/login', (req, res, next) => {
    res.json({
        anObject: { item1: "item1val", item2: "item2val" },
        anArray: ["item1", "item2"],
        another: "item"
    });
});

module.exports = router;
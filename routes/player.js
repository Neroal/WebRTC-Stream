var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const tableID  = tableParser(req.query);
    res.render('player', { 
        TITLE: 'WebRTC', 
        TABLE_ID: tableID,
    });
});

function tableParser(queryString) {
    if (queryString && queryString.table) {
        return queryString.table;
    }

    console.warn('Invalid table ID.', queryString);
    return ''
}

module.exports = router;

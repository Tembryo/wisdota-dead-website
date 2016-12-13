var express         = require('express'),
    async           = require('async');

var database        = require("/shared-code/database.js"),
    config          = require("/shared-code/config.js");

var router = express.Router();

router.use(function(req, res, next)
{
    next();
});

function collectTemplatingData(req)
{
    var data = {};
    data["user"] = req.user;

    return data;
}

function addNavigationData(data)
{
}

router.get('/', function(req, res)
{
    var data = collectTemplatingData(req);
    res.render("pages/index.ejs", data);
});

router.get('/faq', function(req, res)
{
    var data = collectTemplatingData(req);
    res.render("pages/faq.ejs", data);
});

router.get('/about', function(req, res)
{
    var data = collectTemplatingData(req);
    res.render("pages/about.ejs", data);
});



router.get('/match-reports', function(req, res)
{
    var data = collectTemplatingData(req);
    res.render("pages/match-reports.ejs", data);
});

router.get('/in-memoriam', function(req, res)
{
    var data = collectTemplatingData(req);
    res.render("pages/in-memoriam.ejs", data);
});

exports.router = router;

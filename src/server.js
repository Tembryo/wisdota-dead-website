// server.js

var express         = require("express"),
    bodyParser      = require("body-parser"),
    cookieParser    = require("cookie-parser"),
    session         = require("express-session"),
    morgan          = require("morgan"),
    favicon         = require('serve-favicon'),
    ejs_mate        = require('ejs-mate'),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    pgSession       = require('connect-pg-simple')(session);

var config          = require("/shared-code/config.js"),
    database        = require("/shared-code/database.js");

var website_routes  = require("./routes-website.js");


var session_secret = "mega-secret-wisdota-session";

var app = express();

var host = process.env.VIRTUAL_HOST.split(",")[0];
var port = process.env.VIRTUAL_PORT;
var cookie_domain = '.wisdota.com';
if(config.version === "LOCAL")
  cookie_domain = null;

app.set('client-url',"http://"+host);
app.disable('x-powered-by');

app.engine('ejs', ejs_mate);
app.set('view engine', 'ejs');
app.set('views', config.files+"/views");

app.use(favicon(config.files+"/static/img/favicon.ico"));
app.use("/static", express.static(config.files+"/static"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());


app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    //console.log("Webserver callled for "+req.originalUrl);
    next();
});

//register routes
app.use("/", website_routes.router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

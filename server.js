// BASE SETUP
// =============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// test route (GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// SIMULATION DE BASE DE DONNÉES (Pour le TP Docker)
var bears = []; // On stocke les ours dans une liste en mémoire
var idCounter = 1;

router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = {};
        bear.id = idCounter++;
        bear.name = req.body.name;
        bears.push(bear);
        res.json({ message: 'Bear created!', bear: bear });
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        res.json(bears);
    });

router.route('/bears/:bear_id')
    // get the bear with that id
    .get(function(req, res) {
        var bear = bears.find(b => b.id == req.params.bear_id);
        if (bear) res.json(bear);
        else res.status(404).json({message: "Bear not found"});
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

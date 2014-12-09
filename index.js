var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request");
var db = require("./models/index.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

// Display Home page
app.get("/", function(req, res){
    res.render("movies/home");
});

// Search Movies
app.get("/movies/search/", function(req, res){
    console.log("search get")
    var request = require("request");
    var searchTerm = req.query.search
    request("http://www.omdbapi.com/?s=" + searchTerm, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            console.log(stuff["Search"])
            res.render("movies/search", stuff)
        }
        else {
            console.log("ERRR000R");
        };
    });
});

// Add to Watch List
app.post("/movies/added", function(req,res) {
    db.Watchlist.findOrCreate({where: {code: req.body.code, title: req.body.title, year: req.body.year }})
    .spread(function(Watchlist, created) {
        res.render("movies/added", {Watchlist: Watchlist});
    });
});


// ??!?!?!? NEW WHAT?!?!?
app.post("/movies/watchlist", function(req,res) {
    db.Watchlist.findOrCreate({where: {code: req.body.code, title: req.body.title, year: req.body.year }})
    .spread(function(Watchlist, created) {
        res.render("movies/added", {Watchlist: Watchlist});
    });
});


// Delete item from Watch List
app.delete("/movies/watchlist/:id", function(req,res) {
    db.Watchlist.destroy({where:{id:req.params.id}}).then(function(data){
        res.send(req.params);
    });
});

// Display Watch List
app.get("/movies/watchlist", function(req,res){
    db.Watchlist.findAll({order: 'id ASC'}).done(function(err, Watchlist) {
        res.render("movies/watchlist", {Watchlist: Watchlist})
    });
});

// Specific movie info
app.get("/movies/:imdb", function(req, res){
    var request = require("request");
    var id = req.params.imdb
    request("http://www.omdbapi.com/?i=" + id + "&tomatoes=true&", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            res.render("movies/movies", stuff)
        }
        else {
            console.log("ERRR000R");
        };
    });
});



app.listen(3000, function(){
    console.log("DEATH RACE 3000!")
});

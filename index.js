var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var movies = [{title: "Matrix", year: 1999}]

app.get('/', function(req, res){
    res.render('movies/home');
})

app.get('/movies/search/', function(req, res){
    var request = require('request');
    var searchTerm = req.query.search
    request("http://www.omdbapi.com/?s=" + searchTerm, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            console.log(stuff["Search"])
            res.render("movies/search", stuff)
        }
        else {
            console.log("ERRR000R");
        }
    })
})

app.get('/movies/:imdb', function(req, res){
    var request = require('request');
    var id = req.params.imdb
    request("http://www.omdbapi.com/?i=" + id + "&tomatoes=true&", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            console.log(stuff["Search"])
            res.render("movies/movies", stuff)
        }
        else {
            console.log("ERRR000R");
        }
    })

})

app.listen(3000, function(){
    console.log("DEATH RACE 3000!")
}
);

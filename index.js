var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var request = require('request');
var db = require('./models/index.js');
var session = require('express-session');
var flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'sparkles',
    resave: false,
    saveUnititialized: true
}));
app.use(flash());
app.use(function(req, res, next){
    req.getUser = function(){
        return req.session.user || false;
    }
    next();
});

// GENERAL
app.get('*',function(req,res,next){
    var alerts = req.flash();
    res.locals.alerts = alerts;
    res.locals.currentUser = req.getUser();
    next();
});

// HOME
app.get('/', function(req, res){
    res.render('home');
});

// SEARCH
app.get('/search/', function(req, res){
    console.log('search get')
    var request = require('request');
    var searchTerm = req.query.search
    request('http://www.omdbapi.com/?s=' + searchTerm, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            if(stuff.Error){
                req.flash('warning','Invalid Search')
                res.redirect('/search')
            } else{
                res.render('search', stuff)
            }
        } else{
            console.log(stuff['Search'])
        };
    });
});

// Add to Watch List
app.post('/', function(req,res) {
    var currentUser = req.getUser();
    if (req.getUser()) {
        var currentUser = req.getUser();
        db.userwatchlist.findOrCreate({
            where: {userId: currentUser.id, code: req.body.code, title: req.body.title, year: req.body.year}
        }).spread(function(data, created) {
        res.send({data: data});
        })
    }else {
        db.watchlist.findOrCreate({where: {code: req.body.code, title: req.body.title, year: req.body.year }})
        .spread(function(data, created) {
            res.send({data: data});
        });
    }
});

// COMMENTS
app.route('/watchlist/:id/comments')
.get(function(req, res){
    if (req.getUser()){
        var currentUser = req.getUser();
        var commentId = req.params.id
        db.userwatchlist.find({where: {userId: currentUser.id}})
        .then(function(newComment){
            db.usercomment.findAll({where: {userwatchlistId:commentId}, order: 'id DESC'})
                .then(function(returnMe){
                    res.render('comments', {commentId: commentId, returnMe: returnMe})
                })
        })
    }
    else {
        var commentId = req.params.id
        db.comment.findAll({where: {watchlistId:commentId}, order: 'id DESC'})
            .then(function(returnMe){
                res.render('comments', {commentId: commentId, returnMe: returnMe});
        });
    }

})
.post(function(req, res){
    if (req.getUser()) {
        var currentUser = req.getUser();
        db.userwatchlist.find({where: {userId: currentUser.id}})
        .then(function(newComment){
            newComment.createUsercomment({text: req.body.text})
            .then(function(theComment){
                console.log("hi")
                res.redirect('comments')
            });
    })
    } else{
    db.watchlist.find({where: {id: req.params.id}})
    .then(function(newComment){
        newComment.createComment({text: req.body.text})
        .then(function(theComment){
            res.redirect('comments')
        });
    });
    }
});

// WATCHLIST
app.get('/watchlist', function(req,res){
    var currentUser = req.getUser();
    if (req.getUser()) {
        db.userwatchlist.findAll({where: {userId: currentUser.id}, order: 'id DESC'}).done(function(error, watchlist){
        res.render('watchlist', {watchlist: watchlist})
    })} else {
        db.watchlist.findAll({order: 'id ASC'}).done(function(err, watchlist) {
        res.render('watchlist', {watchlist: watchlist})
    })}
});

// WATCHLIST delete item
app.delete('/watchlist/:id', function(req,res) {
    var currentUser = req.getUser();
    if (req.getUser()) {
        db.userwatchlist.destroy({where:{id:req.params.id}}).then(function(data){
        res.send(req.params);
    });
    } else {
        db.watchlist.destroy({where:{id:req.params.id}}).then(function(data){
        res.send(req.params);
    });
    }

});

// MOVIES
app.get('/movie/:imdb', function(req, res){
    var request = require('request');
    var id = req.params.imdb
    request('http://www.omdbapi.com/?i=' + id + '&plot=full&tomatoes=true&', function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var stuff = JSON.parse(body);
            res.render('movies', stuff)
        } else{
            console.log('ERRR000R');
        };
    });
});

// MOVIES delete from watchlist
app.delete('/movie/:imdb', function(req,res) {
    db.watchlist.destroy({where:{code:req.params.imdb}}).then(function(data){
        res.send(req.params);
    });
});

// LOGIN FORM
app.route('/login')
.get(function(req,res){
    res.render('login');
})
.post(function(req,res){
    db.user.find({where: {email:req.body.email}}).then(function(userObj){
        if(userObj){
            bcrypt.compare(req.body.password, userObj.password, function(err, match){
                if(match === true){
                    req.session.user = {
                        id: userObj.id,
                        email: userObj.email,
                        name: userObj.name
                    };
                    res.redirect('/');
                } else{
                    req.flash('warning','Invalid password');
                    res.redirect('/login')
                }
            })
        } else{
            req.flash('warning','Unknown user');
            res.redirect('/login')
        }
    });
});

// SIGNUP FORM
app.route('/signup')
.get(function(req,res){
    res.render('signup');
})
.post(function(req,res){
    var newUser = {
        where: {name:req.body.name},
        defaults:{name:req.body.name, email:req.body.email, password:req.body.password}
    }
    db.user.findOrCreate(newUser).spread(function(createdUser, created){
        if(created == true) {
          req.flash('info', 'Account Created Successfully');
          res.redirect('/login');
        } else{
          req.flash('warning', 'User Name already taken');
          res.redirect('/signup');
        }
    }).catch(function(error){
        if(error && Array.isArray(error.errors)){
            error.errors.forEach(function(errorItem){
                req.flash('danger',errorItem.message);
            })
        } else{
            req.flash('danger', 'Something weird happened.')
        }
        res.redirect('/signup')
    });
});

//LOGOUT
app.get('/logout',function(req,res){
    delete req.session.user;
    req.flash('info', 'You have been logged out.')
    res.redirect('/')
});

app.listen(process.env.PORT || 3000, function(){
    console.log('DEATH RACE 3000!')
});

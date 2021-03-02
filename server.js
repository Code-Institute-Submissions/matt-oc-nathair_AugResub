// load the things we need
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

var test = [{name:"test", b:"4"}]

// index page
app.get('/', function(req, res) {
    res.render('pages/index',{
      test: test
    });
});

// about page
app.get('/leaderboard', function(req, res) {
    res.render('pages/leaderboard',{
      test: test
    });
});

app.listen(8000);
console.log('App running');

async function m()  {
const storage = require('node-persist');

//you must first call storage.init
await storage.init( /* options ... */ );
await storage.setItem('name','yourname')
console.log(await storage.getItem('name'));
}
m();

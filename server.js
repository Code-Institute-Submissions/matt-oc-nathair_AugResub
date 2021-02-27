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
app.get('/about', function(req, res) {
    res.render('pages/about',{
      test: test
    });
});

app.listen(8080);
console.log('8080 is the magic port');

(async () => {
const storage = require('node-persist');

//you must first call storage.init
await storage.init( /* options ... */ );
await storage.setItem('name','yourname')
console.log(await storage.getItem('name'));
})();

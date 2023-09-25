const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const app = express();


app.set('trust proxy', 1);
app.use(
    cors({
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept'
        ],
        credentials: true,
        origin: [
            'http://localhost:3000',
        ]
    })
);
app.use(cookieParser());
app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: 'none',
            secure: true
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'secret'
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!'); // This will serve your request to '/'.
  });

  function kalimat(kalimat) {
    return findLongestWord(kalimat);
  }
app.get('/algoritma/nosatu', function (req, res) {
    function findLongestWord(str) {
        var t = 0;
        var ts = str.split(' ');
        for(var i=0; i<ts.length;i++){
        if(ts[i].length>t){
        str = ts[i];
        t = ts[i].length;
        }
        }
        return str;
        }
    const kalimat = "Saya sangat senang mengerjakan soal algoritma"
    var str = findLongestWord(kalimat)
    //let jumlah = findLongestWord(kalimat);
    res.send(str.length); // This will serve your request to '/'.
  });
app.get('/algoritma/nodua', function (req, res) {
    const kalimat = "Saya sangat senang mengerjakan soal algoritma"
    res.send(findLongestWord(kalimat)); // This will serve your request to '/'.
  });
app.listen(3000, function () {
    console.log('Run Express!');
   });

app.use(router);
module.exports = app;

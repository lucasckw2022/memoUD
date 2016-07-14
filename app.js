var express       = require('express');
var path          = require('path');
var app           = express();
var bodyParser    = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cookieParser  = require('cookie-parser');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port          = process.env.PORT || 3000;
// setup server
var mongoose      = require('mongoose');
mongoose.connect('mongodb://localhost/memodbtest');
var router        = express.Router();
var Memos         = require('./public/javascripts/models/memos');
// this is middleware everytime access to the database
router.use('/', function (req,res,next) {
  console.log("accessed to DB");
  next();
});
router.route('/memos')
    .post((req,res)=>{
      var memo = new Memos();
      memo.content = req.body.content;
      memo.year = req.body.year;
      memo.month = req.body.month;
      memo.date = req.body.date;
      memo.save((err)=>{
        if(err){
          res.send(err);
        }
      })
    })
    .get((req,res)=>{
      Memos.find((err, memos)=>{
        if(err){
          res.send(err);}
        res.json(memos);
      })
    })

router.route('/memos/:memo_id')
    .get((req,res)=>{
      Memos.findById(req.params.memo_id,(err, memo)=>{
        if(err){
          res.send(err);}
        res.json(memo);
      })
    })
    .put((req,res)=>{
      Memos.findById(req.params.memo_id,(err,memo)=>{
        if(err){
          res.send(err);}
        memo.year = req.body.year
        memo.save((err)=>{
          if(err){
            res.send(err);}
          res.json({message: "Memo Updated Successfully"})
        })
      })
    })
    .delete((req,res)=>{
      Memos.findById(req.params.memo_id,(err,memo)=>{
        if(err){
          res.send(err);}
        memo.remove({
          _id: req.params.memo_id
        },(err)=>{
          if(err){
            res.send(err)}
          res.json({message: "Memo Removed Successfully"})
        })
      })
    })

app.use('/api',router);

// render the index.html
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port);

module.exports = app;

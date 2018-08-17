const express       = require('express');
const path          = require('path');
const app           = express();
const bodyParser    = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser  = require('cookie-parser');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port          = process.env.PORT || 8080;
// setup server
const mongoose      = require('mongoose');
const MongoClient   = require('mongodb').MongoClient;
//config for switching real and test mongoDB
const mongoUri      = process.env.PORT ? 'mongodb://admin:y20229763@ds023435.mlab.com:23435/memoud' : 'mongodb://localhost:27017/memoud'
const router        = express.Router();
const Memos         = require('./public/javascripts/models/memos');
// this is middleware everytime access to the database
mongoose.connect(mongoUri, { useNewUrlParser: true })
.then(() => {
  console.log("Connected to Database");
})
.catch((err)=>{
  console.log('cannot connect to mongoDB', err)
});

router.use('/', function (req,res,next) {
  console.log("accessed to landing page");
  next();
});
router.route('/memos')
    .post((req,res)=>{
      var memo = new Memos();
      memo.content = req.body.content;
      memo.year = req.body.year;
      memo.month = req.body.month;
      memo.date = req.body.date;
      memo.save((err,memos)=>{
        if(err){
          res.send(err);}
          res.status(200).json(memos)
      })
    })
    .get((req,res)=>{
      Memos.aggregate([ {$project: {year: 1, month: 1, date: 1,content: 1}},
                        {$sort: {date: 1}}
      ],(err, memos)=>{
        if(err){
          res.send(err);}
          res.status(200).json(memos);
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
    .patch((req,res)=>{
      Memos.findById(req.params.memo_id,(err,memo)=>{
        if(err){
          res.send(err);}
        memo.content = req.body.content
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

app.listen(port, ()=>{
  console.log('connected to port ' + port);
});

module.exports = app;

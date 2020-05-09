var express = require('express');
var router = express.Router();
//KEt Noi Toi MySql
var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'blog'
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  res.render('index', { title: 'Express' });
});
router.get('/getdata', function(req, res, next) {
  connection.query('SELECT * from tbtin', function (error, results, fields) {
    if (error)
    {
      res.send(error);
      connection.end();//ket thuc
    }
    else
    {
      console.log(results);
      res.send(results);
    }
    
  });
});

// Get User 
router.get('/getuser', function(req, res, next) {
  connection.query('SELECT * from tbuser', function (error, results, fields) {
    if (error)
    {
      res.send(error);
      connection.end();//ket thuc
    }
    else
    {
      console.log(results);
      res.send(results);
    }
    
  });
});
//Xu Ly Them TIn
router.post('/add_tin', function(req, res, next) {
  var subject = req.body.subject;
  var category = req.body.category;
  var title = req.body.title;
  var link = req.body.link;
  var date = req.body.date;
  //them du lieu vao mysql
  connection.query('INSERT INTO tbtin(subject, category, title, link, date) VALUES ("'+subject+'","'+category+'","'+title+'","'+link+'","'+date+'")',
  function (error,results) {
    if (error){
      res.send(error);
      connection.end();//ket thuc
    }
    else
    {
      res.send(`Bạn Đã Thêm Môn ${subject} Vào CSDL !!! `);
    }
  });
 
});
// Xoa Tin 

router.post('/del_tin', function(req, res, next){
  var id = req.body.id;
  // Thao Tac Voi CSDL
  connection.query(`DELETE FROM tbtin WHERE id  = ${id} ` , function(err,result){
    if(err){
      console.log(err);
      connection.end();
    }
    else{
      res.send(`Xóa Thành Công Tin Có Id Là ${id} !!! `);
    }

  })
})

// Update TIn
router.post('/update_tin', function(req, res, next) {
  console.log(req.body)
  var id = req.body.id;
  var subject = req.body.subject;
  var category = req.body.category;
  var title = req.body.title;
  var link = req.body.link;
  var date = req.body.date;
  //them du lieu vao mysql
  connection.query(`UPDATE tbtin SET subject = '${subject}',category = '${category}',title = '${title}',link ='${link}' , date = '${date}'  WHERE id = ${id} `,
  function (error,results) {
    if (error){
      res.send(error);
      connection.end();//ket thuc
    }
    else
    {
      res.send(`Bạn Đã Sửa  Môn ${subject} Vào CSDL !!! `);
    }
  });
});
module.exports = router;

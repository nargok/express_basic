var express = require('express');
var ejs = require('ejs');

var app = express();
app.engine('ejs', ejs.renderFile);
app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var data = {
  'Taro': 'taro@example,com',
  'Hanako': 'hanako@example,com',
  'Sachiko': 'sachiko89@example,com',
  'Ichiro': 'ichiro110@example,com',
}

app.get('/', (req, res) => {
  var msg = 'This is Express page!<br>' + 
            '※メッセージを書いて送信してください';
  var url = '/other?name=taro&pass=yamada'
  res.render('index.ejs', {
    title: 'Index',
    content: msg,
    data: data,
  });
});

app.post('/', (req, res) => {
  var msg = 'This is Posted Page!<br>' +
            'あなたは「<b>' + req.body.message +
            '</b>」と送信しました。';
  res.render('index.ejs', {
    title: 'Posted',
    content: msg,
  })
});

app.get('/other', (req, res) => {
  var name = req.query.name;
  var pass = req.query.pass;
  var msg = 'あなたの名前は「' + name +
            '」<br>パスワードは「' + pass + '」です。';
  res.render('index.ejs', {
    title: 'other',
    content: msg,
    link:{href:'/', text:'※トップページに戻る'}
  });
});

var server = app.listen(3000, () => {
  console.log('server is running!');
});

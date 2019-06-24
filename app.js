var express = require('express');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Control = require('./app/controller/control.js');
const fileUpload = require('express-fileupload');

var VerificacaoModel = require('./app/model/verificacaoModel');
var verificacao = new VerificacaoModel;

var login = require('./app/controller/login');
var index = require('./app/controller/index');
var api = require('./app/controller/api');
var perfil = require('./app/controller/perfil');
var investimento = require('./app/controller/investimento');
var financeiro = require('./app/controller/financeiro');
var coaching = require('./app/controller/coaching');
var cursos = require('./app/controller/cursos');
var club = require('./app/controller/club');
var simulador = require('./app/controller/simulador');
var administracao = require('./app/controller/administracao');
var comissoes = require('./app/controller/comissoes');
var coachees = require('./app/controller/coachees');
var estatisticas = require('./app/controller/estatisticas');
var suporte = require('./app/controller/suporte');
var agenda = require('./app/controller/agenda');
var projetosSociais = require('./app/controller/projetos_sociais');


var indexMob = require('./app/controller/indexMob');
var loginMob = require('./app/controller/loginMob');
var apiMob = require('./app/controller/apiMob');
var perfilMob = require('./app/controller/perfilMob');
var investimentoMob = require('./app/controller/investimentoMob');
var financeiroMob = require('./app/controller/financeiroMob');
var coachingMob = require('./app/controller/coachingMob');
var cursosMob = require('./app/controller/cursosMob');
var clubMob = require('./app/controller/clubMob');
var simuladorMob = require('./app/controller/simuladorMob');
var administracaoMob = require('./app/controller/administracaoMob');
var comissoesMob = require('./app/controller/comissoesMob');
var coacheesMob = require('./app/controller/coacheesMob');
var estatisticasMob = require('./app/controller/estatisticasMob');
var suporteMob = require('./app/controller/suporteMob');
var agendaMob = require('./app/controller/agendaMob');
var projetosSociaisMob = require('./app/controller/projetos_sociaisMob');



var app = express();
var control = new Control;

app.use(require('express-is-ajax-request'));
// INICIANDO SESSION
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'eagleapp',
  resave: true,
  saveUninitialized: true
}));


// app.use(function (req, res, next){
//   var pathname = parseurl(req).pathname;


//   if((pathname != '/' && pathname != '') && 
//     (pathname.indexOf('css') == -1 && pathname.indexOf('js') == -1 && pathname.indexOf('imgs') == -1 && pathname.indexOf('fonts') == -1 && pathname.indexOf('uploads') == -1)
//     && (req.isAjaxRequest() == true))
//   {
//    console.log('@@@@@ PATHNAME @@@@');
//    console.log(pathname);
//    console.log('@@@@@@@@@@@@@@@@@@@');

//    var id = req.headers['Authority-Eagle-id'];
//    var hash = req.headers['Authority-Eagle-hash'];

//    console.log('dddddddddd id dddddddddddd');
//    console.log(id);
//    console.log('dddddddddddddddddddddddddd');

//    console.log('hhhhhhhhhhhh hash hhhhhhhhhhh');
//    console.log(hash);
//    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
//    console.log('req headers');
//    console.log(req.headers);
//    next();
//    // var id = req.headers['authority-eagle-id'];
//    // var hash = req.headers['authority-eagle-hash'];
//    // var nivel = req.headers['authority-eagle-nivel'];

//  }else{

//    next();
//  }


// });

// Verifica usuario se esta logado ou não
// app.use(function (req, res, next) {
//   var pathname = parseurl(req).pathname;
//   if ((pathname != '/' && pathname != '') && 
//       (pathname.indexOf("css") == -1 && pathname.indexOf("js") == -1 && pathname.indexOf("imgs") == -1 && pathname.indexOf("fonts") == -1) && 
//         req.isAjaxRequest() == true){
//     var id = req.headers['authority-eagle-id'];
//     var hash = req.headers['authority-eagle-hash'];
//     var nivel = req.headers['authority-eagle-nivel'];
//     verificacao.VerificarUsuario(id, hash,nivel).then(data => {
//       if (data.length > 0) {
//         req.session.usuario = {};
//         req.session.usuario.id = id;
//         req.session.usuario.hash_login = hash;
//         req.session.usuario.nivel = nivel;
//         next();
//       } else {
//         req.session.destroy(function(err) {
//           res.json('<img src="/assets/imgs/logout.gif"><script>setTimeout(function(){ window.location.replace("/"); }, 4100);</script>');
//         });
//       }
//     });
//   } else if (control.Isset(req.session.usuario, false)
//     && (pathname != '/' && pathname != '')
//       && (pathname.indexOf("css") == -1 && pathname.indexOf("js") == -1 && pathname.indexOf("imgs") == -1 && pathname.indexOf("fonts") == -1)) {
//     res.redirect('/');
//   } else {
//     next();
//   }
// });

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/assets", express.static(__dirname + '/assets'));
// app.use(express.static(path.join(__dirname, '/assets')));
// console.log(path.join(__dirname, 'assets'));

app.use(fileUpload({
  limitHandler:500
}));

app.use('/', login);
app.use('/sistema', index);
app.use('/sistema/investimento', investimento);
app.use('/sistema/financeiro', financeiro);
app.use('/sistema/coaching', coaching);
app.use('/sistema/cursos', cursos);
app.use('/sistema/estatisticas', estatisticas);
app.use('/sistema/suporte', suporte);
app.use('/sistema/coachees', coachees);
app.use('/sistema/club', club);
app.use('/sistema/agenda', agenda);
app.use('/sistema/simulador', simulador);
app.use('/sistema/administracao', administracao);
app.use('/sistema/comissoes', comissoes);
app.use('/sistema/projetos_sociais', projetosSociais);
app.use('/sistema/api', api);
app.use('/sistema/perfil', perfil);




app.use('/mobsmart', indexMob);
app.use('/mobsmart/login', loginMob);
app.use('/mobsmart/investimento', investimentoMob);
app.use('/mobsmart/financeiro', financeiroMob);
app.use('/mobsmart/coaching', coachingMob);
app.use('/mobsmart/cursos', cursosMob);
app.use('/mobsmart/estatisticas', estatisticasMob);
app.use('/mobsmart/suporte', suporteMob);
app.use('/mobsmart/coachees', coacheesMob);
app.use('/mobsmart/club', clubMob);
app.use('/mobsmart/agenda', agendaMob);
app.use('/mobsmart/simulador', simuladorMob);
app.use('/mobsmart/administracao', administracaoMob);
app.use('/mobsmart/comissoes', comissoesMob);
app.use('/mobsmart/projetos_sociais', projetosSociaisMob);
app.use('/mobsmart/api', apiMob);
app.use('/mobsmart/perfil', perfilMob);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('ERROR --------------------- ERROR');
  console.log(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (typeof req.session.id_usuario != 'undefined' && req.session.id_usuario != 0) {
    res.render('error', { erro: 'Página não existente.', tipo_erro: '404' });
  } else {
    res.render('login/index', { erro: 'Página não existente, faça o login para acessar o sistema.', tipo_erro: '404' });
  }
});
// app.listen(3000);

module.exports = app;

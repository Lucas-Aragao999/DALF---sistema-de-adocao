var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var user = require('../routes/tutores.routes');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("Ocorreu um problema ao registrar o usuário.")
      // criar o token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expira em 24 horas
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  module.exports = router;
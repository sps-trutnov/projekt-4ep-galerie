const bcrypt = require("bcrypt");
const dbModel = require(require('path').join(__dirname, '..', 'models', 'dbModel'));

exports.main = (req, res) => {
    var data = dbModel.nacistVse();
    //dbModel.editArticle("ID_1", {"autor":[{"jmeno":"", "e-mail":""}], "datum":"", "viditelny":false, "nadpis":"", "popis_short":"", "popis_full":"", "tagy": []});
    //dbModel.editArticle("ID_1", {"datum":"", "viditelny":false});
    res.render('test', {data});
}

exports.upload = (req, res) => {
    res.render('upload_form');
}

exports.admin = (req, res) => {
    res.render('admin_page');
}

exports.postLoginInfo = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let login_udaje = dbModel.nacistUdaje();
    // hashovaní hesla
    bcrypt.hash(login_udaje.admin[0].password, 5, function (err, hash) {
        console.log(hash);
        // porovnávání hashem s heslem
        bcrypt.compare(password, hash, function (err, result) {
          console.log("heslo prošlo:", result);

          // porovnaní údajů
          if(username == login_udaje.admin[0].username && result == true){
              console.log("Correct");

          }
          else{
              console.log("Wrong username or password");

          }
        });

    });
    
    
}

exports.uploadArticle = (req, res) => {
    let name = req.body.name;
    let desc_short = req.body.desc_short;
    let desc_full = req.body.desc_full;
    let author = req.body.author;
    let mail = req.body.mail;
    let tags = req.body.tags;

    dbModel.newDbItem(name, desc_short, desc_full, author, mail, tags);
}
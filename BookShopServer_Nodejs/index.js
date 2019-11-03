var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(process.env.PORT || 3000);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minhtuan:mFyRMqr8s7l3tMLv@cluster0-qah5q.mongodb.net/BookShop2019?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongo connected error :" +  err);
    }else{
        console.log("Mongo connected successfull.");
    }
});

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// JWT
var jwt = require('jsonwebtoken');
var secret = "Mr.KAsh*(&!@yASD??AAAA";

// Session (for Web Browser login)
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: '*(A&SDHha*&^@H46', cookie: { maxAge: 60000000 }, resave: true,
saveUninitialized: true}))

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if( file.mimetype=="image/bmp" || 
            file.mimetype=="image/png" ||
            file.mimetype=="image/gif" ||
            file.mimetype=="image/jpg" ||
            file.mimetype=="image/jpeg" 
        ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("fileImage");

// Models
const Category = require("./Models/Category");
const Book = require("./Models/Book");
const User = require("./Models/User");

// Book
app.get("/page/book", function(req, res){

    Category.aggregate([{
        $lookup: {
            from: "books",
            localField: "books_id",
            foreignField: "_id",
            as: "sach"
        }
    }], function(err, mang){
        console.log(mang);
        if(!err){
            //res.json(mang);
            res.render("home", {page:"book", cats:mang});
        }else{
            res.json({kq:0});
        }
    });

});

app.post("/page/book", function(req, res){
    // Upload
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("A Multer error occurred when uploading."); 
          res.json({kq:0});
        } else if (err) {
          console.log("An unknown error occurred when uploading." + err);
          res.json({kq:0});
        }else{
            console.log("Upload is okay");
            console.log(req.file); // Thông tin file đã upload
            
            //save book 
            var book = new Book({
                title: req.body.txtTitle,
                image: req.file.filename,
                file: req.body.txtPdf,
                description: req.body.txtPdfurl,
                ordering: 1,
                active: 1
            });
            book.save(function(err){
                if(err){
                    res.json({kq:0, "err": err});
                }else{
                    // Add item book -> Category.Books_id
                    Category.findOneAndUpdate({_id:req.body.selectCate}, {$push: {books_id:book._id} }, function(err){
                        if(err){
                            res.json({kq:0, "err": err});
                        }else{
                            console.log("Book is okay");
                            res.json({kq:1});
                        }
                    });
                }
            });
        }

    });
});


// Caterogy
app.post("/page/category", function(req, res){

    var cate = new Category({
        title: req.body.txtTitle,
        orderring: 1,
        active: 1,
        books_id: []
    });
    cate.save(function(err){
        if(err){
            console.log("Save category error :" + err);
            res.render("home", {page:"category", message:"Save category error"});
        }else{
            console.log("Save category successfully " + cate._id);
            Category.find(function(err, items){
                if(err){
                    console.log(err);
                    res.render("home", {page:"category", categories:[]});            
                }else{
                    console.log(items);
                    res.render("home", {page:"category", categories:items, message:"Save category succeffully."});        
                }
            });

        }
    });

});

app.get("/page/category", function(req, res){
   
    Category.find(function(err, items){
        if(err){
            console.log(err);
            res.render("home", {page:"category", categories:[]});            
        }else{
            console.log(items);
            res.render("home", {page:"category", categories:items});        
        }
    });

})

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){   // txtPassword
    User.findOne({username:req.body.txtUsername}, function(err, item){
        if( !err && item != null ){
            console.log("PW " + req.body.txtPassword + "----" +  item.password);
            bcrypt.compare(req.body.txtPassword, item.password, function(err2, res2) {
                if(res2==false){
                    res.json({kq:0, err: "Wrong password"});
                }else{
                    jwt.sign(item.toJSON(), secret, { expiresIn: '168h' }, function(err, token){
                        if(err){
                            res.json({kq:0, err: "Token generate error: " + err});
                        }else{
                            req.session.token = token;
                            res.json({token:token});
                        }
                    });                    
                }
            });
        }else{
            res.json({kq:0, err: "Wrong username"});
        }
    });
});

app.post("/api/login", function(req, res){   // txtPassword
    User.findOne({username:req.body.txtUsername}, function(err, item){
        if( !err && item != null ){
            console.log("PW " + req.body.txtPassword + "----" +  item.password);
            bcrypt.compare(req.body.txtPassword, item.password, function(err2, res2) {
                if(res2==false){
                    res.json({kq:0, err: "Wrong password"});
                }else{
                    jwt.sign(item.toJSON(), secret, { expiresIn: '168h' }, function(err, token){
                        if(err){
                            res.json({kq:0, err: "Token generate error: " + err});
                        }else{
                            req.session.token = token;
                            res.json({kq:1, token:token, name: item.name});
                        }
                    });                    
                }
            });
        }else{
            res.json({kq:0, err: "Wrong username"});
        }
    });
});

app.post("/api/checkLogin", function(req, res){

    var token = req.body.UserToken;
    jwt.verify(token, secret, function(err, decoded) {
            if(err){
                res.json({kq:0, err: "Wrong token"});
            }else{
                res.json({kq:1, user:decoded});
            }
    });
    
});

app.post("/api/logout", function(req, res){
    req.session.destroy(function(err) {
        if(err){
            res.json({kq:0, err: "Cannot logout."});
        }else{
            res.json({kq:1, err: "Logout successfull."});
        }
    })
});

app.post("/api/category", function(req, res){
   
    Category.find(function(err, items){
        if(err){
            console.log(err);
            res.json({kq:0, err: err});          
        }else{
            res.json({kq:1, arr: items});    
        }
    });

})

app.post("/api/HomeBook", function(req, res){
    Book.find(function(err, items){
        if(err){
            console.log(err);
            res.json({kq:0, err: err});          
        }else{
            res.json({kq:1, arr: items});    
        }
    });
});

app.post("/api/BookDetail", function(req, res){
    Book.findById(req.body.id, function(err, items){
        if(err){
            console.log(err);
            res.json({kq:0, err: err});          
        }else{
            res.json({kq:1, arr: items});    
        }
    });
});

app.post("/api/BookFromCate", function(req, res){
    Category.aggregate([
        {
            $match: {_id: mongoose.Types.ObjectId(req.body.idCate)}
        },
        {
        $lookup: {
            from: 'books',
            localField: 'books_id',
            foreignField: '_id',
            as: "DSBook"
        }
    }], function(err, items){
        if(err){
            console.log(err);
            res.json({kq:0, err: err});          
        }else{
            res.json({kq:1, arr: items});    
        }
    });
});

app.get("/", function(req, res){
    checkToken(req, res);    
});

function checkToken(req, res){
    if(req.session.token){
        jwt.verify(req.session.token, secret, function(err, decoded) {
            if(err){
                res.redirect("http://localhost:3000/login");
            }else{
                res.render("home");   
            }
        });
    }else{
        res.redirect("http://localhost:3000/login");
    }
}

app.post("api/addUser", function(req, res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(!err){
            let admin = new User({
                username    : req.body.username,
                password    : hash,
                level       : req.body.level,
                active      : req.body.active,
                name        : req.body.name,
                email       : req.body.email,
                address     : req.body.address,
                phone       : req.body.phone
            });
            admin.save(function(err){
                if(err){
                    res.json({kq:0});
                }else{
                    res.json({kq:1});
                }
            });
        }else{
            res.json({kq:0});
        }
    });

    
});





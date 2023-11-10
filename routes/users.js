const express = require("express")
const router = express.Router()
const Message = require('../models/Message')
const Admin = require('../models/Admin')
const crypto = require('crypto');
const session = require('express-session');

//

router.use(logger)

router.post("/login", (req,res) => {
    if (req.session.email==null){
        if (req.body.passwordName==null){
            res.render('login');

        }else{
            var hashedPassword = crypto.createHash('md5').update(req.body.passwordName).digest('hex');
            Admin.find().exec().then( (output) => { if (output[0].login==req.body.loginName && output[0].password==hashedPassword){
            
            //create session variable
            req.session.email = 'session exist';
            res.redirect('admin');
            }
            else{
            res.render("login");
            }});
            }
    }
    else{
        res.redirect('admin');
    }
    })

router.get("/admin", function (req,res) {
    if (req.session.email==null){
        res.redirect("login");
    }
    else{
        Message.find().exec().then((data)=>{  
        res.render("admin", { data: data })});
    }
})

router.get("/logout", (req,res) => {
    req.session.email = null;
    res.redirect('/tabs/weather');  
})

router.get("/admin/delete/:id", (req,res) => {
    Message.findByIdAndDelete(req.params.id).exec().then( () => res.redirect('/users/admin') )
})

function logger(req, res, next){
    console.log(req.url)
    next()
}

module.exports = router
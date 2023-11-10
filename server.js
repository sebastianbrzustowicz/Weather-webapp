const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Message = require('./models/Message');
const session = require('express-session');

// Mongodb connection
const uri = "your mongodb uri";
async function connect() {
    try{
        (await mongoose.connect(uri)).isObjectIdOrHexString(()=> {console.log("connected");});
        
    } catch (error) {
        console.error(error);
    }}
connect();

//routing

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(
    session({
      secret: "some secret",
      cookie: { maxAge: 30000 },
      saveUninitialized: false,
    })
  );

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index", {text: 'passed object'})
})

const tabsRouter = require('./routes/tabs.js')
const usersRouter = require('./routes/users.js')

app.use('/tabs', tabsRouter)
app.use('/users', usersRouter)

app.listen(5000, ()=>{console.log("Server started on port 5000")}) 
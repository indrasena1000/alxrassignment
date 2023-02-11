const express = require("express");
var morgan = require('morgan')
var cors = require('cors')
const app = express();
app.use(express.json())
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(cors())
const cookieParser = require('cookie-parser');

app.use(express.static(`public/`))
const bodyParser = require('body-parser');

app.use(bodyParser.json())
.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

const db = require("./models/index");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
app.get("/",(req,res)=>{
   res.render("login.ejs")
})

app.use("/auth",authRoute)
app.use("/user",userRoute)


app.listen(3000, (req, res) => {
     console.log(`Server Started at 3000`);
  });

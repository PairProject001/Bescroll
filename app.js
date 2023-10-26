const express = require('express')
const app = express()
const port = 3000
const Router = require('./routers')
const session = require('express-session')
// console.log(app);


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : true}))

app.use(session({
    secret: 'A Secret',
    resave : false,
    saveUninitialized : false, 
    cookie : { 
        secure : false,
        sameSite : true
    }
  }))
  

app.use(Router)


app.listen(port, () => {
    console.log(`Gojo ${port} Power`);
})
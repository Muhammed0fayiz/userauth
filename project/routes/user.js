const express=require('express')
var router=express.Router();
const bodyParser = require('body-parser');
const userCollection=require('../server');
const session=require('express-session')
// Use body-parser middleware to parse the request body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
  }))

router.get('/', (req, res) => {
    if(req.session.user){
     
        res.redirect('/userHome')
    }
    else{
        res.render('index');
    }
});

router.get('/new_user',(req,res)=>{
    res.render('user_login')
})

router.get('/userHome', (req, res) => {
    // console.log("detial value "+details);
    if(req.session.user){
        res.render('user_home', { details:req.session.user });
    }
    else{
        res.redirect('/')
    }
});

router.get('/user/login', (req, res) => {
    console.log("Rendering login page with message");
    if(req.session.user){
        res.redirect('/userHome')
    }
    else{
    res.render('user_login')
    }
});

router.post('/Login-user', async (req, res) => {
    const data = await userCollection.findOne({ email: req.body.email });
    if (data && data.email === req.body.email && data.password === req.body.password) {
        //store user data
        req.session.user = data.email;
        // console.log("user is" + req.session.user);
        res.redirect('/userHome'); 
    } else {
        // res.render('index',{message:"Invalid user"})
        res.redirect('/')
    }
});

//////////////////////////////////

router.post('/signup_user',async(req,res)=>{
const data={
    name:req.body.name,
   place:req.body.place,
    email:req.body.email,
    password:req.body.password
}
    await userCollection.insertMany([data])
    .then(()=>{
        console.log("inserted")
    })
    res.redirect('/')
})

router.post('/adduser',async(req,res)=>{
const data={
    name:req.body.name,
   place:req.body.place,
    email:req.body.email,
    password:req.body.password
}
    await userCollection.insertMany([data])
    .then(()=>{
        console.log("inserted")
    })
    res.redirect('/dashboard')
})

router.get('/userlogout',(req,res)=>{
    req.session.destroy()
   res.redirect('/')
})

module.exports=router;
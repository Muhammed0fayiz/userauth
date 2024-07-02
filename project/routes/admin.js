const express=require('express')
var router=express.Router();
const bodyParser = require('body-parser');
const session =require('express-session');//session import
const userDb=require('../server')
const nocache=require('nocache')

// Use body-parser middleware to parse the request body
router.use(nocache())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const credential={
    email:"admin@gmail.com",
    password:"12345"
}
// session middleware
router.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
  }))





router.get('/dashboard',async(req,res)=>{
    if(req.session.addata){
        const users=await userDb.find()
        res.render('dashboard',{users})
    }
    else{
        res.redirect('/')
    }
})

router.post('/Login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.addata=req.body.email
        res.redirect('/dashboard');
   // res.end("Login Sucessful")
    }else{
        res.render('admin_base',{message:"Invalid entry"});
    }
})

// update
router.get('/update/:id',async (req,res)=>{
    const id = req.params.id
    
    const user =await userDb.findOne({_id:id})
    res.render('edit_user', {user})
  })
  

 
router.post('/update/:id',async (req,res)=>{
    const id = req.params.id
    
    const newuser = {$set: {
      name:req.body.name,
      place:req.body.place,
      email:req.body.email,
    
    }}
  
    await userDb.updateOne({_id:id}, newuser)
    res.redirect('/dashboard')
})

// delect
router.get('/delete/:id',async (req,res)=>{
    const id = req.params.id
    await userDb.findByIdAndDelete({_id:id})
    res.redirect('/dashboard')
  })



//route.for logout
router.get('/logoutadmin', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
            res.status(500).send("Error");
        
        } else {
          
            res.redirect('/')
        }
    });
});




router.get('/adminside',(req,res)=>{
    if(req.session.addata){
        res.redirect('/dashboard')
    }
    else{
        res.render('admin_base')
    }
   
})




router.get('/add_user',(req,res)=>{
    res.render('new_user')
})



router.get('/search', async (req, res) => {
    const searchQuery = req.query.search
    const regexPattern = new RegExp(`^${searchQuery}`, 'i')
  
    const filteredUser = await userDb.find({name: { $regex: regexPattern }})
    res.json(filteredUser)
  
  })

module.exports=router;

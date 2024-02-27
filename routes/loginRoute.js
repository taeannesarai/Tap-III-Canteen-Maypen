import express, { Router } from "express";
import BodyParser from "body-parser";
import { createUserAcc } from "../data/database.js";
import session from "express-session";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

// route for login
router.get('/login', async (req, res) => {
    res.render('auth/login', { title: 'LOGIN' });
});

// route for signup
router.get('/signup', async (req, res) => {
    
    res.render('auth/signup', { title: 'SIGNUP' });
});

//LOGOUT
app.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/')
});

//delete if not needed
app.use(session({
    secret: 'may pen canteen',
    resave: true, 
    saveUninitialized:true,
    cookie: {
        maxAge: 60000 * 2
    }
}));

// Am not sure where to put the (trn) For the student or that should be in a whole other post by it self 

router.get('/', async(req, res )=>{

    if (req.session.loggedIn){
        loggedIn = true;
        let session = req.session.username;
    }
    const bRet = await adminUserExists();
    if (bRet == false){
        await createAdmin();
}
    // Not Sure About The Line Below
    res.render('index',{data: [], title: 'canteen list', loggedIn, session})
});


// not sure if you need the line below 
let loggedIn = false;    

// SIGNUP USER FORM SUBMIT
router.post('/signup/sumbit', async (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        location: req.body.location,
        phone_num: req.body.phone_num,
        trn: req.body.trn,
        roles: 'USER',
    } 
    console.log(newUser);

    // To encrypt
    // password: req.body.password,
        
    // const createUser = await createUserAcc(newUser);
    res.redirect('/tap-canteen')
})


router.post('/', async(req,res)=>{
    const pass = req.body.password
    const username = req.body.username;
    const user = await isLoginCorrect(username, pass);
    if(user[0]){
        
        console.log(user);
        if(user[0]){
            const lRet = await decrypt(pass,user[0].password);
            if(lRet == true ){
                req.session.loggedIn = true;
                req.session.username = user[0].email;
                res.redirect('/');

            }else{
                res.redirect('/auth/login');

            }
        }else{
            res.redirect('/auth/login');

        }
        }else{
            res.redirect('/auth/login');

        }
    }
);



//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const loginRoute = router;
import express, { Router } from "express";
import BodyParser from "body-parser";
import {  } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

//route to create new user
router.post('/',(req,res)=>{
    const { username, password } = req.body;
    res.send('user created successfully');
});






//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const loginRoute = router;
import express, { Router } from "express";
import BodyParser from "body-parser";
import {  } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

//Admin page
router.get("/", async (req, res) => {
    res.render("admin", {
        title:"Admin"
    })
})







//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const adminRoute = router;
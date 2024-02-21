import express, { Router } from "express";
import BodyParser from "body-parser";
import {  } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

// Homepage
router.get("/", async (req, res) => {
    res.render("index", {
        title:"Home"
    })
})







//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;
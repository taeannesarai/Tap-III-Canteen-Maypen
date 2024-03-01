import express, { Router } from "express";
import BodyParser from "body-parser";

import { getAllMenu, getAllDrinks, getAllUser, updateUser, getSingleUser, deleteUser } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

// Homepage
router.get("/", async (req, res) => {
    // const lastFour = await lastFourMeal();
    res.render("index", {
        title: "Home",
        // lastFourMealData: lastFour
    });
});

// Menu
router.get("/lunch-menu", async (req, res) => {
    const meals = await getAllMenu();
    const drinks = await getAllDrinks();
    console.log('===================== MEALS ==================');
    console.log(meals);
    console.log('===================== DRINKS ==================');
    console.log(drinks);
    res.render("menu", {
        title: "Menu",
        mealData: meals,
        drinkData: drinks
    });
});

//contact page
router.get('/contact', async (req, res) => {
    res.render('contact', {
        title: 'Contact'
    });
});

//about page
router.get('/about', async (req, res) => {
    res.render('about', {
        title: 'About'
    });
});


// user create


//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;
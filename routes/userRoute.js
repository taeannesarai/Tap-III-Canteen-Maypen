import express, { Router } from "express";
import BodyParser from "body-parser"; 
import { loginRoute } from "./loginRoute.js";
// <<<<<<< HEAD
import { getAllMenu, getAllDrinks, getAllUser, updateUser, getSingleUser, deleteUser,saveSchedule,getLastFour } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

// Homepage
router.get("/", async (req, res) => {
    // const lastFour = await lastFourMeal();
    const lastFourMeal = await getLastFour();
    const meals = await getAllMenu();
    console.log(lastFourMeal);
    res.render("index", {lastFourMeal, title: "Home"
       
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

router.post("/new-user", async (req, res) => {
	const newData = new Object();

    (newData.first_name = req.body.first_name.toUpperCase()),
        (newData.last_name = req.body.last_name.toUpperCase()),
        (newData.email = req.body.email),
        (newData.location = req.body.location),
        (newData.phone_num = req.body.phone_num),
        (newData.trn = req.body.trn),
        (newData.roles = req.body.roles),
        (newData.password = req.body.password);
    
	const result = await saveUser(newData);

	if (result[0].insertId) {
		const uId = result[0].insertId;
		const data = await getSingleUser(uId);

		const email = new Email (data[0]);
		await email.sendMail("signup_email", "New User", data[0]);
	}

	res.redirect("/");
});

//Create SCHEDULE

router.get("/create-menu-schedule/:id", async (req, res) => {
    const schedule = {
        user_id: loginRoute.sessionData.user_id,
        menu_id: req.params.id,
        date:( new Date()).toISOString().split("T")[0] + ` 00:00:00`,
        //user_id, menu_id, drink_id, date
    }
    console.log(schedule)
    await saveSchedule(schedule)
    res.redirect("/tap-canteen/");
})



//delete

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;
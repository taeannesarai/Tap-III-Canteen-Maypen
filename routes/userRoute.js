import express, { Router } from "express";
import BodyParser from "body-parser"; 
// <<<<<<< HEAD
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

router.post("/create-menu-item/:id", async (req, res) => {
    const menu = {

        //user_id, menu_id, drink_id, date
    }
})

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;
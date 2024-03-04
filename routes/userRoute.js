import express, { Router } from "express";
import BodyParser from "body-parser";
import { loginRoute } from "./loginRoute.js";
import { Email } from "../util/email.js";

// <<<<<<< HEAD
import {
	getAllMenu,
	getAllDrinks,
	getAllUser,
	updateUser,
	getSingleUser,
	deleteUser,
	saveSchedule,
	getLastFour,
	getSingleMealSchedule,
	getScheduleByDate,
	isMealSelected,
	getSingledMenu,
} from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

// Homepage
router.get("/", async (req, res) => {
	const lastFourMeal = await getLastFour();
	const meals = await getAllMenu();
	res.render("index", { lastFourMeal, title: "Home" });
});

// Menu
router.get("/lunch-menu", async (req, res) => {
	const meals = await getAllMenu();
	const drinks = await getAllDrinks();
	let isMealItemSelected;

	if (loginRoute.sessionData) {
		isMealItemSelected = await isMealSelected(new Date().toISOString().split("T")[0], loginRoute.sessionData.user_id);
	} else {
		isMealItemSelected = undefined;
	}

	res.render("menu", {
		title: "Menu",
		mealData: meals,
		drinkData: drinks,
		isMealItemSelected,
	});
});

//contact page
router.get("/contact", async (req, res) => {
	res.render("contact", {
		title: "Contact",
	});
});

//about page
router.get("/about", async (req, res) => {
	res.render("about", {
		title: "About",
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
		const data = await getSingleUser(newData.email);

		const email = new Email(data);
		await email.sendMail("signup_email", "New User", data);
	}

	res.redirect("/");
});

// CONFIRM MEAL SCHEDULE
router.get("/create-menu-schedule/:id", async (req, res) => {
	const [mealData] = await getSingledMenu(req.params.id);
	res.render("meal-schedule-confirm", {
		title: "Confirm Meal Selection",
		mealData,
	});
});

//Create SCHEDULE
router.get("/create-menu-schedule/confirm/:id", async (req, res) => {
	if (loginRoute.sessionData) {
		const schedule = {
			user_id: loginRoute.sessionData.user_id,
			menu_id: req.params.id,
			date: new Date().toISOString().replace("T", " ").split(".")[0],
		};

		const newSchedule = await saveSchedule(schedule);
		const mealSchedule = await getScheduleByDate(schedule.date);

		const user = await getSingleUser(loginRoute.sessionData.email);
		if (newSchedule) {
			const email = new Email(mealSchedule);
			await email.sendMealConfirmation("_email_menu", "Meal Choice Confirmation", mealSchedule);
			res.redirect("/tap-canteen/");
		}
	} else {
		res.redirect("/tap-canteen/auth/login");
	}
});

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;

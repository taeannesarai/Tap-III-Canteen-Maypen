import express, { Router } from "express";
import fileUpload from "express-fileupload";
import multer from "multer";
import findRemoveSync from "find-remove";
import session from "express-session";

let ranVal = cryptoRandomString({ length: 10, type: "alphanumeric" }); // generate a random string of characters to attach to name of files

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, `${ranVal}_${file.originalname}`);
	},
});

const upload = multer({ storage });

import {
	getAllMenu,
	saveMenu,
	updateMenu,
	deleteMenu,
	getSingledMenu,
	getAllDrinks,
	saveDrink,
	updateDrinks,
	deleteDrinks,
	getSingleDrinks,
	saveSchedule,
	updateSchedule,
	deleteSchedule,
	getAllSchedule,
	getSingleSchedule,
	// updateSchedule,
	// deleteSchedule,
	getAllUser,
	updateUser,
	deleteUser,
	getSingleUser,
	createAdmin,
	adminUserExists,
	isLoginCorrect,
} from "../data/database.js";

import cryptoRandomString from "crypto-random-string";
import { loginRoute } from "./loginRoute.js";
const router = express.Router();
const app = express();

router.use(express.urlencoded({ extended: true }));

router.use(
	session({
		secret: "tap canteen",
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 60000 * 10,
		},
	})
);

router.use(express.urlencoded({ extended: true }));

// router.use(
// 	fileUpload({
// 		limits: {
// 			fileSize: 50 * 1024 * 1024,
// 		},
// 		abortOnLimit: true,
// 	})
// );

// =================================================================
//   ============ All Menu ==============
// =================================================================
//Get Single Menu Item

router.get("/lunch-menu/menu-item-view/:id", async (req, res) => {
	const id = req.params.id;
	const [results] = await getSingledMenu(id);
	console.log("=====================================================");
	console.log(results);
	console.log("=====================================================");
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	res.render("admin_pages/view-single-menu-item", {
		title: "Menu Item Detail",
		data: results,
		prevUrl,
	});
});

//Create Menu
router.get("/create-menu-item", async (req, res) => {
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	res.render("admin_pages/create-menu-item", {
		title: "Create Menu Item",
		prevUrl,
	});
});

// Update Menu
router.get("/update-menu-item/:id", async (req, res) => {
	const [mealData] = await getSingledMenu(req.params.id);
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);

	res.render("admin_pages/update-meal-item", {
		title: "Update Menu",
		mealData,
		prevUrl,
	});
});

//Delete Menu
router.get("/lunch-menu/delete-menu-item/:id", async (req, res) => {
	const [mealItem] = await getSingledMenu(req.params.id);
	console.log(mealItem);
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);

	res.render("admin_pages/delete-menu-item", {
		title: "Delete Menu Item",
		mealItem,
		prevUrl,
	});
});

//   ============ All Drinks ==============

//Get Single Drink

router.get("/lunch-menu/view-drink-item/:id", async (req, res) => {
	const id = req.params.id;
	const [results] = await getSingleDrinks(id);
	console.log("=====================================================");
	console.log(results);
	console.log("=====================================================");
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);

	res.render("admin_pages/view-single-drink-item", {
		data: results,
		title: "Drinks Detail",
		prevUrl,
	});
});

//Create Drink

router.get("/create-drink-item", async (req, res) => {
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);

	res.render("admin_pages/create-drink-item", {
		title: "Create Drink Item",
		prevUrl,
	});
});

// Update Drinks
router.get("/update-drink-item/:id", async (req, res) => {
	const [drinkItemData] = await getSingleDrinks(req.params.id);
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);

	res.render("admin_pages/update-drink-item", {
		title: "Update Drink",
		prevUrl,
		drinkItemData,
	});
});

//Delete Drink
router.get("/lunch-menu/delete-drink-item/:id", async (req, res) => {
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	const [drinkItemData] = await getSingleDrinks(req.params.id);
	console.log(drinkItemData);
	res.render("admin_pages/delete-drink-item", {
		title: "Delete Drink Item",
		drinkItemData,
		prevUrl,
	});
});

//   ============ All User ==============

//Get Single User

app.get("/users/user-person-view/:id", async (req, res) => {
	const id = req.params.id;
	const results = await getSingleUser(id);
	console.log("=====================================================");
	console.log(results);
	console.log("=====================================================");
	res.render("/", { data: results, title: "User Detail" });
});

//Create User

// Update User

router.get("/update-user", async (req, res) => {
	const mealItem = await getAllUser(req.params.id);
	res.render("admin_pages/user-update", { title: "Update User" });
});

//   ============ All Schedule ==============

// VIEW ALL MEAL SCHEDULE
router.get("/schedules", async (req, res) => {
	const allSchedules = await getAllSchedule();
	// let date = allSchedules.date;

	// allSchedules.date = date.toLocaleDateString().split("T")[0];

	console.log("================================");
	console.log(allSchedules);
	res.render("admin_pages/all-schedules", {
		title: "All Schedules",
		allSchedules,
	});
});

// VIEW SINGLE SCHEDULE
router.get("/schedules/single-schedule-view/:id", async (req, res) => {
	const id = req.params.id;
	const [results] = await getSingleSchedule(id);
	console.log("=====================================================");
	console.log(results);
	console.log("=====================================================");
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	res.render("admin_pages/meal_schedules/view-meal-schedule", {
		title: "schedule detail",
		data: results,
		prevUrl,
	});
});

//update schedule
router.get("/schedules/single-schedule-edit/:id", async (req, res) => {
	const [results] = await getSingleSchedule(req.params.id);
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	console.log(results);
	res.render("admin_pages/meal_schedules/edit-meal-schedule", {
		title: "Update Schedule",
		prevUrl,
		data: results,
	});
});

//delete schedule
router.get("/schedules/single-schedule-delete/:id", async (req, res) => {
	const prevUrl = req.headers.referer.slice("http://localhost:4400".length);
	const [results] = await getSingleSchedule(req.params.id);
	console.log(results);
	res.render("admin_pages/meal_schedules/delete-meal-schedule", {
		title: "Delete schedule Item",
		data: results,
		prevUrl,
	});
});

// ============== DATABASE ACTIONS ==============
// Create Menu Post
router.post("/create-menu-item/submit", upload.single("meal_img"), async (req, res) => {
	const menuItemData = {
		item_name: req.body.meal_name,
		quantity: req.body.quantity,
	};

	if (req.body.desc.length > 255) {
		menuItemData.description = req.body.desc.slice(0, 255);
	} else {
		menuItemData.description = req.body.desc;
	}

	if (req.file) {
		menuItemData.img = `${ranVal}_${req.file.originalname}`;
	} else {
		menuItemData.img = "";
	}

	console.log(menuItemData);
	await saveMenu(menuItemData);
	res.redirect("/tap-canteen/lunch-menu");
});

router.get("/create-menu-item", async (req, res) => {
	res.render("admin_pages/create-menu-item", { title: "Create Menu Item" });
});

//Update Menu Post
router.post("/update-menu-item-submit", upload.single("meal_img"), async (req, res) => {
	const mealData = {
		id: req.body.id,
		item_name: req.body.meal_name,
		quantity: req.body.quantity,
		description: req.body.desc,
	};

	if (req.body.desc.length > 255) {
		mealData.description = req.body.desc.slice(0, 255);
	} else {
		mealData.description = req.body.desc;
	}

	if (req.file) {
		mealData.img = `${ranVal}_${req.file.originalname}`;
	} else {
		const [result] = await getSingledMenu(mealData.id);
		mealData.img = result.img;
	}

	console.log(mealData);
	await updateMenu(mealData);
	res.redirect("/tap-canteen/lunch-menu");
});

// router.get("/update-menu/:id", async (req, res) => {
// 	const id = req.params.id;
// 	const [mealData] = await getSingledMenu(id);
// 	res.render("admin_pages/menu-update",mealData,{ title: "Update Menu" });
// });

//Delete Menu Post
router.get("/delete-menu-item/confirm/:id", async (req, res) => {
	const id = req.params.id;
	const [record] = await getSingledMenu(id);
	if (record.img) {
		findRemoveSync("./uploads", { files: record.img });
	}
	console.log("Deleting menu item with ID:", id);
	console.log(record);
	await deleteMenu(id);
	res.redirect("/tap-canteen/lunch-menu");
});

// Get a Single Menu Post
router.post("/get-single-menu-item/:id", async (req, res) => {
	const menuId = req.body.id;

	console.log("getting the menu", menuId);
	const menuItem = await getSingledMenu(menuId);
	console.log("getting  menu item:", menuItem);
	res.redirect("/");
});

// ============== Post For  Drinks ==============
// Create Drinks Post
router.post("/create-drink-item/submit", upload.single("drink_img"), async (req, res) => {
	const drinkItemData = {
		beverage: req.body.drink_name,
		quantity: req.body.quantity,
	};

	if (req.body.desc.length > 255) {
		drinkItemData.description = req.body.desc.slice(0, 255);
	} else {
		drinkItemData.description = req.body.desc;
	}

	if (req.file) {
		drinkItemData.img = `${ranVal}_${req.file.originalname}`;
	} else {
		drinkItemData.img = "";
	}

	console.log(drinkItemData);
	await saveDrink(drinkItemData);
	res.redirect("/tap-canteen/lunch-menu");
});

// Update Drink Post
router.post("/update-drink-item-submit", upload.single("img"), async (req, res) => {
	const drinkItemData = {
		id: req.body.id,
		beverage: req.body.beverage,
		quantity: req.body.quantity,
		description: req.body.description,
	};

	// Check if description is provided and not null before updating
	if (req.body.description && req.body.description.length > 255) {
		drinkItemData.description = req.body.description.slice(0, 255);
	}

	// Check if there's a file attached to the request
	if (req.file) {
		drinkItemData.img = `${ranVal}_${req.file.originalname}`;
	} else {
		// No new image uploaded, retain the old image
		const oldDrinkItem = await getSingleDrinks(req.body.id); // Assuming you have a function to retrieve the drink item from the database
		drinkItemData.img = req.body.current_img;
	}

	console.log(drinkItemData);

	// Update only the fields that are provided in the request
	await updateDrinks(drinkItemData);

	res.redirect("/tap-canteen/lunch-menu");
});

//Delete Drinks Post

router.get("/delete-drink-item/confirm/:id", async (req, res) => {
	const id = req.params.id;
	const [record] = await getSingleDrinks(id);
	if (record.img) {
		findRemoveSync("./uploads", { files: record.img });
	}

	console.log(record);
	console.log("Deleting drink item with ID:", id);
	await deleteDrinks(id);
	res.redirect("/tap-canteen/lunch-menu");
});

// Get a Single drink Post

router.post("/get-single-drink-item", async (req, res) => {
	const menuId = req.body.id;

	console.log("getting the drink", menuId);
	const menuItem = await getSingleDrinks(menuId);
	console.log("getting  menu item:", menuItem);
	res.redirect("/");
});

//Create Meal Schedule

router.post("/create-meal-schedule", async (req, res) => {
	const menuItemData = {
		item_name: req.body.item_name,
		quantity: req.body.quantity,
		description: req.body.description,
		img: req.body.img,
	};

	console.log(menuItemData);
	await saveMenu(menuItemData);
	res.redirect("/");
});

//update
router.post("/update-schedule-item-submit", async (req, res) => {
	const scheduleData = {
		id: req.body.id,
		user_id: req.body.user_id,
		menu_id: req.body.menu_id,
		drink_id: 1,
		date: req.body.date.toISOString().split("T")[0] + ` 00:00:00`,
	};

	console.log(scheduleData);
	await updateSchedule(scheduleData);
	res.redirect("/");
});

//Delete Schedule Post
router.get("/delete-Schedule-item/confirm/:id", async (req, res) => {
	const id = req.params.id;
	const [record] = await getSingleSchedule(id);

	console.log("Deleting Schedule item with ID:", id);
	console.log(record);
	await deleteSchedule(id);
	res.redirect("/tap-canteen/lunch-Schedule");
});

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const adminRoute = router;

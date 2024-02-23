import express, { Router } from "express";
import BodyParser from "body-parser";

import { getAllMenu, saveMenu, updateMenu, deleteMenu, getSingledMenu,
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     getAllDrinks, saveDrinks, updateDrinks, deleteDrinks, getSingleDrinks,
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     getAllSchedule, getSingleSchedule,
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     getAllUser, saveUser, updateUser, deleteUser, getSingleUser,
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     createAdmin, adminUserExists, isLoginCorrect
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
} from "../data/database.js";

import fileUpload from 'express-fileupload';
const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.use(
    fileUpload({
        limits:{
            fileSize: 2 * 1024 * 1024
        },
        abortOnLimit: true,
    })
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============ All of Menu ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get Single Menu

app.get('/menu/menu-item-view/:id', async(req, res) =>{
    const id = req.params.id;
    const results = await getSingledMenu(id);
    console.log('=====================================================');
    console.log(results);
    console.log('=====================================================');
    res.render('/', {data: results, title: 'Menu Detail'});
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Menu
router.get("/create-menu-item", async (req, res) => {
	res.render("admin_pages/create-menu-item", { title: "Create Menu Item" });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update Menu
router.get("/update-menu-item/:id", async (req, res) => {
	const mealItem = await getAllMenu(req.params.id);
	res.render("admin_pages/update-meal-item", {
		title: "Update Menu",
		mealItem,
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Menu
router.get("/delete-menu-item/:id", async (req, res) => {
	const mealItem = await getSingledMenu(req.params.id);

	res.render("admin_pages/driver-delete", {
		title: "Confirm Deletion",
		mealItem,
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============ All of Drinks ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get Single Drink

app.get('/drinks/drink-item-view/:id', async(req, res) =>{
    const id = req.params.id;
    const results = await getSingleDrinks(id);
    console.log('=====================================================');
    console.log(results);
    console.log('=====================================================');
    res.render('/', {data: results, title: 'Drinks Detail'});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Drink

router.get("/create-drink-item", async (req, res) => {
	res.render("admin_pages/drink-item", { title: "Create Drink Item" });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update Drinks
router.get("/update-drink", async (req, res) => {
    const mealItem = await getAllDrinks(req.params.id);
	res.render("admin_pages/drink-update", { title: "Update Drink" });

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Drink
router.get("/delete-drink-delete/:id", async (req, res) => {
	res.render("admin_pages/drink-delete", { title: "Confirm Deletion", id });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============ All of User ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get Single User

app.get('/users/user-person-view/:id', async(req, res) =>{
    const id = req.params.id;
    const results = await getSingleUser(id);
    console.log('=====================================================');
    console.log(results);
    console.log('=====================================================');
    res.render('/', {data: results, title: 'User Detail'});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create User


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update User

router.get("/update-user", async (req, res) => {
    const mealItem = await getAllUser(req.params.id);
	res.render("admin_pages/user-update", { title: "Update User" });

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete User

router.get("/delete-user-delete/:id", async (req, res) => {
    const mealItem = await getAllUser(req.params.id);
	res.render("admin_pages/user-delete", { title: "Confirm Deletion", id });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============ All of Schedule ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Get Single Drink

app.get('/schedules/schedule-item-view/:id', async(req, res) =>{
    const id = req.params.id;
    const results = await getSingleSchedule(id);
    console.log('=====================================================');
    console.log(results);
    console.log('=====================================================');
    res.render('/', {data: results, title: 'Schedule Detail'});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Meal Schedule
router.get("/create-meal-schedule", async (req, res) => {
    const mealItem = await getAllSchedule(req.params.id);
	res.render("admin_pages/meal-schedule", { title: "Create meal schedule" });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============== DATABASE ACTIONS ==============   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============ Post For  MENU ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Menu Post

router.post('/create-menu-item', async (req, res) => {
    const menuItemData = {
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        description: req.body.description,
        img: req.files ? `${getRandomHexValues(8)}_${req.files.image.name}` : ''
    };

    if (req.files) {
        req.files.image.mv('./uploads/' + menuItemData.img);
    }

    console.log(menuItemData);
    await saveMenu(menuItemData);
    res.redirect('/');
});

router.get('/create-menu-item', async (req, res) => {
    res.render('admin_pages/create-menu-item', { title: 'Create Menu Item' });
});

// id, beverage, quantity, img, description

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Update Menu Post

router.post('/update-menu', async (req, res) => {
    const menuItemData = {
        id: req.body.id,
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        description: req.body.description,
    };

    menuItemData.img = req.files ? `${getRandomHexValues(8)}_${req.files.image.name}` : '';

    if (req.files) {
        req.files.image.mv('./uploads/' + menuItemData.img);
    }

    console.log(menuItemData);
    await updateMenu(menuItemData);
    res.redirect('/menu');
});

router.get('/update-menu', async (req, res) => {
    res.render('admin_pages/menu-update', { title: 'Update Menu' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Menu Post

router.post('/delete-menu-item', async (req, res) => {
    const menuItemId = req.body.id;

    console.log("Deleting menu item with ID:", menuItemId);
    await deleteMenu(menuItemId);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get a Single Menu Post 

router.post('/get-single-menu-item/:id', async (req, res) => {
    const menuId = req.body.id;

    console.log("getting the menu", menuId);
    const menuItem = await getSingledMenu(menuId);
    console.log("getting  menu item:", menuItem);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============== Post For  Drinks ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create Drinks Post

router.post('/create-drink-item', async (req, res) => {
    const drinkItemData = {
        id: req.body.id,
        beverage: req.body.beverage,
        quantity: req.body.quantity,
        description: req.body.description,
        img: req.files ? `${getRandomHexValues(8)}_${req.files.image.name}` : ''
       
    };

    if (req.files) {
        req.files.image.mv('./uploads/' + drinkItemData.img);
    }

    console.log(drinkItemData);
    await saveDrinks(drinkItemData);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update Drink Post
router.post('/update-drink-item', async (req, res) => {
    const drinkItemData = {
        id: req.body.id,
        beverage: req.body.beverage,
        quantity: req.body.quantity,
        description: req.body.description,
        img: req.files ? `${getRandomHexValues(8)}_${req.files.image.name}` : ''
    };

    if (req.files) {
        req.files.image.mv('./uploads/' + drinkItemData.img);
    }
 
    console.log(drinkItemData);
    await updateDrinks(drinkItemData);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete Drinks Post

router.post('/delete-drink-item', async (req, res) => {
    const menuItemId = req.body.id;

    console.log("Deleting drink item with ID:", menuItemId);
    await deleteDrinks(menuItemId);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get a Single drink Post 

router.post('/get-single-drink-item', async (req, res) => {
    const menuId = req.body.id;

    console.log("getting the drink", menuId);
    const menuItem = await getSingleDrinks(menuId);
    console.log("getting  menu item:", menuItem);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============== Post For  Schedule ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Create Meal Schedule

// router.post('/create-mealschedule', async (req, res) => {
//     const menuItemData = {
//         item_name: req.body.item_name,
//         quantity: req.body.quantity,
//         description: req.body.description,
//         img: req.body.img
//     }

//     console.log(menuItemData);
//     await saveMenu(menuItemData);
//     res.redirect('/');
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////   ============== Post For User ==============   //////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create User(Save) Post
router.post('/create-user', async (req, res) => {
    const userDataId = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.description,
        location: req.body.location,
       phone_num: req.body.phone_num,
        trn: req.body.trn,
        roles: req.body.roles,
        password: req.body.password
    }

    console.log(userDataId);
    await saveUser(userDataId);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Update User Post
router.post('/update-user', async (req, res) => {
    const userDataId = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.description,
        location: req.body.location,
       phone_num: req.body.phone_num,
        trn: req.body.trn,
        roles: req.body.roles,
        password: req.body.password
    }
 
    console.log(userDataId);
    await updateUser(userDataId);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Delete User Post

router.post('/delete-user', async (req, res) => {
    const id = req.body.id;

    console.log("Deleting user with ID:", userDataId);
    await deleteUser(id);
    res.redirect('/');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get a Single User Post 

router.post('/get-single-user', async (req, res) => {
    const userData = req.body.id;

    console.log("getting the user", userDataId);
    const userDataId = await getSingleUser(userDataId);
    console.log("getting  user id:", userData);
    res.redirect('/');
});//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const adminRoute = router;


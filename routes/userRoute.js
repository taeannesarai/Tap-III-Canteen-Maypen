import express, { Router } from "express";
import BodyParser from "body-parser";
import {getAllUsers, saveUser, updateUser, getSingleUser, deleteUser  } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));


//route for home page ------------ path: '/'
router.get("/", async (req, res) => {
  res.render("index")
});

// student users

// route for to view all users
router.get("/all-users", async (req, res) => {
  const results = await getAllUsers();
  console.log(results);
  res.render("users/all-users", {title: "All users", resData: results});
});


//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const userRoute = router;
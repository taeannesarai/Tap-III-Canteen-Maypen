import express, { Router } from "express";
import BodyParser from "body-parser";
import {getAlluser, saveUser, updateUser, getSingleUser, deleteUser  } from "../data/database.js";

const router = express.Router();
const app = express();

app.use(BodyParser.urlencoded({ extended: true }));



//route for home page ------------ path: '/'
router.get("/", async (req, res) => {
  res.render("index")
});

router.get("/all-users", async (req, res) => {
  const results = await getAllReservations();
  console.log(results);
  res.render("reservations/all-reservations", {
    title: "All Reservations",
    resData: results,
  });
});


//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const loginRoute = router;
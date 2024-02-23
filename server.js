import express from "express";
import morgan from "morgan";

//configuration
const PORT = 4400;
const app = express();

// Setup the view engine
app.set("view engine", "ejs");

// middlewares
//BODY PARSING
app.use(express.urlencoded({ extended: true }));

//ROUTES
import { loginRoute } from "./routes/loginRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { adminRoute } from "./routes/adminRoute.js";

// ENDPOINT ANALYTICS
app.use(morgan("dev"));

//Route Middleware
// route for login
app.use("/tap-canteen/auth", loginRoute);

// route for user
app.use("/tap-canteen", userRoute);

// route for admin
app.use("/tap-canteen/admin", adminRoute);

//static folder for styles images etc
app.use("/public", express.static("public"));
app.use("/util", express.static("util"));
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
	console.log(`Listening ... http://localhost:${PORT}/tap-canteen`);
});

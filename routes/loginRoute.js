import express from "express";
import BodyParser from "body-parser";
import { createUserAcc, getSingleUser } from "../data/database.js";
import session from "express-session";

import { encryptPW, decryptPW } from "../util/auth.js";

const router = express.Router();

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

router.use(BodyParser.urlencoded({ extended: true }));

let isLoggedIn = false;

// router.all("/*", (req, res) => {
//     res.send(req.session)
// });

// route for login
router.get("/login", async (req, res) => {
	console.log("SESSION DATA: ", session);
	res.render("auth/login", { title: "LOGIN" });
});

// route for signup
router.get("/signup", async (req, res) => {
	res.render("auth/signup", { title: "SIGNUP" });
});

//LOGOUT
router.get("/logout", async (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

// Am not sure where to put the (trn) For the student or that should be in a whole other post by it self

// router.get("/", async (req, res) => {
// 	if (req.session.loggedIn) {
// 		loggedIn = true;
// 		let session = req.session.username;
// 	}
// 	const bRet = await adminUserExists();
// 	if (bRet == false) {
// 		await createAdmin();
// 	}
// // Not Sure About The Line Below
// 	res.render("index", { data: [], title: "canteen list", loggedIn, session });
// });

// not sure if you need the line below
let loggedIn = false;

// SIGNUP USER FORM SUBMIT
router.post("/signup/sumbit", async (req, res) => {
	const newUser = {
		first_name: req.body.first_name.toUpperCase(),
		last_name: req.body.last_name.toUpperCase(),
		email: req.body.email,
		location: req.body.location.toUpperCase(),
		phone_num: req.body.phone_num,
		trn: req.body.trn,
		roles: "USER",
	};

	// To encrypt
	newUser.password = await encryptPW(req.body.password);
	console.log(newUser);

	const createUser = await createUserAcc(newUser);
	res.redirect("/tap-canteen");
});

// LOGIN USER OR ADMIN
router.post("/login-submit", async (req, res) => {
	const username = req.body.userName;
	const password = req.body.password;
	const user = await getSingleUser(username);
	console.log(req.body);
	console.log(user);

	if (!user) {
		res.render("auth/login", {
			title: "Login",
			message: "Invalid username or password",
			classes: "alert alert-warning",
		});
	} else {
		const checkPW = await decryptPW(password, user.password);
		console.log(checkPW);

		if (!checkPW) {
			res.render("auth/login", {
				title: "Login",
				message: "Incorrect password",
				classes: "alert alert-warning",
			});
		} else {
			isLoggedIn = true;
			req.session.isLoggedIn = true;
			req.session.user = {
				name: `${user.first_name} ${user.last_name}`,
				email: user.email,
				trainingLocation: user.location,
				phone: user.phone_num,
				trn: user.trn,
				role: user.roles,
			};
			console.log(req.session);
			const sessionData = req.session;
			res.redirect("/tap-canteen/");
		}
	}
});

// router.post("/", async (req, res) => {
// 	const pass = req.body.password;
// 	const username = req.body.username;
// 	const user = await isLoginCorrect(username, pass);
// 	if (user[0]) {
// 		console.log(user);
// 		if (user[0]) {
// 			const lRet = await decrypt(pass, user[0].password);
// 			if (lRet == true) {
// 				req.session.loggedIn = true;
// 				req.session.username = user[0].email;
// 				res.redirect("/");
// 			} else {
// 				res.redirect("/auth/login");
// 			}
// 		} else {
// 			res.redirect("/auth/login");
// 		}
// 	} else {
// 		res.redirect("/auth/login");
// 	}
// });

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const loginRoute = router;

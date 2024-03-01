import express from "express";
import BodyParser from "body-parser";
import { createUserAcc, getSingleUser } from "../data/database.js";
import session from "express-session";
import { Email } from "../util/email.js";
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

// route for login
router.get("/login", async (req, res) => {
	res.render("auth/login", { title: "LOGIN" });
});

// route for signup
router.get("/signup", async (req, res) => {
	res.render("auth/signup", { title: "SIGNUP" });
});

//LOGOUT
router.get("/logout", async (req, res) => {
	req.session.destroy();
	router.sessionData = false;
	res.redirect("/tap-canteen/");
});

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

	const result = await createUserAcc(newUser);

	console.log(result);

	if (result.insertId) {
		const uId = result.insertId;
		const data = await getSingleUser(uId);

		const email = new Email(data);
		await email.sendMail("signup_email", "New User", data[0]);
	}

	res.redirect("/tap-canteen");
});


// router.post("/new-user", async (req, res) => {
// 	const newData = new Object();

// 	(newData.first_name = req.body.first_name.toUpperCase()),
// 		(newData.last_name = req.body.last_name.toUpperCase()),
// 		(newData.email = req.body.email),
// 		(newData.location = req.body.location),
// 		(newData.phone_num = req.body.phone_num),
// 		(newData.trn = req.body.trn),
// 		(newData.roles = req.body.roles),
// 		(newData.password = req.body.password);

// 	const result = await saveUser(newData);

// 	if (result[0].insertId) {
// 		const uId = result[0].insertId;
// 		const data = await getSingleUser(uId);

// 		const email = new Email(data[0]);
// 		await email.sendMail("signup_email", "New User", data[0]);
// 	}

// 	res.redirect("/");
// });

// LOGIN USER OR ADMIN
router.post("/login-submit", async (req, res) => {
	const username = req.body.userName;
	const password = req.body.password;
	const user = await getSingleUser(username);
	// console.log(req.body);
	// console.log(user);

	if (!user) {
		res.render("auth/login", {
			title: "Login",
			message: "Invalid username or password",
			classes: "alert alert-warning",
		});
	} else {
		const checkPW = await decryptPW(password, user.password);
		// console.log(checkPW);

		if (!checkPW) {
			res.render("auth/login", {
				title: "Login",
				message: "Incorrect password",
				classes: "alert alert-warning",
			});
		} else {
			isLoggedIn = true;
			// req.session.isLoggedIn = true;
			req.session.user = {
				name: `${user.first_name} ${user.last_name}`,
				email: user.email,
				trainingLocation: user.location,
				phone: user.phone_num,
				trn: user.trn,
				role: user.roles,
				isLoggedIn: true,
			};
			// console.log(req.session);
			router.sessionData = req.session.user;
			// console.log(router);
			res.redirect("/tap-canteen/");
		}
	}
});

//! DO NOT CREATE ANY ROUTES BELOW THIS EXPORT
export const loginRoute = router;

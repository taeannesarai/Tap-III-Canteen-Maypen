import mysql from "mysql2";
import dotenv from "dotenv";
 import {encryptPW , decryptPW} from "../util/auth.js"; 

dotenv.config({ path: "./config.env" });

const pool = mysql
	.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	})
	.promise();



////////////////////////  All of menu   ////////////////////////



// Get All Menu
export const getAllMenu = async () => {
	const [result] = await pool.query(
		`
      SELECT * FROM menu 
      `
	);
	const rows = result;
	return rows;
};
// Get last 4 item Menu
export const getLastFour = async () => {
	const [result] = await pool.query(
		`
    SELECT * FROM menu
 	ORDER BY id
	DESC LIMIT 0, 4;
      `
	);
	const rows = result;
	return rows;
};


// Create Menu

export const saveMenu = async (sMen) => {
	const result = await pool.query(
		`
        INSERT INTO menu(item_name, quantity, description, img)
         VALUES(?, ?, ?, ?) 
    `,
		[sMen.item_name, sMen.quantity, sMen.description, sMen.img]
	);
	return result;
};


//Update Menu

export const updateMenu = async (uMen) => {
	const result = await pool.query(
		`
        UPDATE menu SET item_name = ?, quantity = ?, description  = ?, img = ?
        WHERE id = ?
    `,
		[uMen.item_name, uMen.quantity, uMen.description, uMen.img, uMen.id]
	);
	return result;
};


//Delete Menu

export const deleteMenu = async (dMen) => {
	const [row] = await pool.query(
		`
        DELETE FROM menu
        WHERE id=?
    `,
		[dMen]
	);
	return row;
};


//Get Single Menu

export const getSingledMenu = async (aID) => {
	const result = await pool.query(
		`
        SELECT * FROM menu WHERE id = ?
    `,
		[aID]
	);
	const rows = result[0];
	return rows;
};


///////////////////////////  All of Drinks    ////////////////////////////



// Get All Drinks

export const getAllDrinks = async () => {
	const [result] = await pool.query(
		`
      SELECT * FROM drinks
      `
	);
	const rows = result;
	return rows;
};


// Create Drinks

export const saveDrink = async (sDri) => {
	const result = await pool.query(
		`
        INSERT INTO drinks(beverage, quantity, img, description)
         VALUES(?, ?, ?, ?) 
    `,
		[sDri.beverage, sDri.quantity, sDri.img, sDri.description]
	);
	return result;
};


//Update Drinks

export const updateDrinks = async (uDri) => {
	const result = await pool.query(
		`
        UPDATE drinks SET beverage = ?, quantity = ?,  img = ?, description  = ?
        WHERE id = ?
    `,
		[uDri.beverage, uDri.quantity, uDri.img, uDri.description, uDri.id]
	);
	return result;
};


//Delete Drinks

export const deleteDrinks = async (dDri) => {
	const [row] = await pool.query(
		`
        DELETE FROM drinks
        WHERE id=?
    `,
		[dDri]
	);
	return row;
};

//Get Single Drink

export const getSingleDrinks = async (aID) => {
	const result = await pool.query(
		`
        SELECT * FROM drinks WHERE id = ?
    `,
		[aID]
	);
	const rows = result[0];
	return rows;
};


/////////////////////   All of User   /////////////////////



// Get All Users

export const getAllUser = async () => {
	const [result] = await pool.query(
		`
      SELECT * FROM user
      `
	);
	const rows = result;
	return rows;
};

// Create User

export const createUserAcc = async (sUse) => {
	const result = await pool.query(
		`
        INSERT INTO users(first_name, last_name, email, location, phone_num, trn, roles, password)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?) 
    `,
		[sUse.first_name, sUse.last_name, sUse.email, sUse.location, sUse.phone_num, sUse.trn, sUse.roles, sUse.password]
	);
	return result;
};


//Update User

export const updateUser = async (uUse) => {
	const result = await pool.query(
		`
        UPDATE user SET first_name = ?, last_name = ?, email  = ?, location = ?, phone_num = ?, trn = ?, roles = ?, password = ?
        WHERE id = ?
    `,
		[uUse.first_name, uUse.last_name, uUse.email, uUse.location, uUse.phone_num, uUse.trn, uUse.roles, uUse.password, uUse.id]
	);
	return result;
};


//Delete User

export const deleteUser = async (dUse) => {
	const [row] = await pool.query(
		`
        DELETE FROM user
        WHERE id=?
    `,
		[dUse]
	);
	return row;
};


//Get Single User

export const getSingleUser = async (aID) => {
	const [result] = await pool.query(
		`
        SELECT * FROM users
		WHERE email = ?
    `,
		[aID]
	);
	return result[0];
};


/////////////////////   LOGIN    ////////////////////////


// export const

//Method to Create an Admin User
export const createAdmin = async () => {
	const encodedPW = await encryptPW("Password123");
	const user = {
		first_name: "Admin",
		last_name: "Admin",
		email: "admin@mail.com",
		password: encodedPW,
		roles: "ADMIN",
	};
	const result = await pool.query(
		`
        INSERT INTO users(first_name, last_name, email, location, phone_num, trn, roles, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
		[user.first_name, user.last_name, user.email, user.location, user.phone_num, user.trn, user.roles, user.password]
	);
	return result;
};


//Admin User Exists

export const adminUserExists = async () => {
	let bRet = false;
	const result = await pool.query(`
        SELECT * FROM users WHERE roles = 'ADMIN' AND email = 'admin@mail.com'
    `);
	console.log(result);
	const rows = result[0];

	if (rows.length > 0) {
		bRet = true;
	} else {
		bRet = false;
	}
	return bRet;
};


// Is Login Correct

export const isLoginCorrect = async (user, pass) => {
	let bRet = false;
	const result = await pool.query(
		`
        SELECT * FROM user WHERE email = ?
    `,
		[user]
	);

	const rows = result[0];

	return rows;
};


///////////////////  All of Menu Schedule    //////////////////

// Get All schedule

export const getAllSchedule = async () => {
	const [result] = await pool.query(
		`SELECT
        ms.id AS schedule_id,
        ms.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.phone_num,
        ms.menu_id,
        m.item_name AS menu_item,
        m.quantity AS menu_quantity,
        m.description AS menu_description,
        m.img AS menu_image,
        ms.drink_id,
        ms.date
    FROM
        meals_schedule AS ms
    JOIN
        menu AS m ON ms.menu_id = m.id
    JOIN
        users AS u ON ms.user_id = u.id;`
	);
	return result;
};
export const getSingleMealSchedule = async (id) => {
	const result = await pool.query(
		`SELECT
        ms.id,
        ms.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.phone_num,
        ms.menu_id,
        m.item_name AS menu_item,
        m.quantity AS menu_quantity,
        m.description AS menu_description,
        m.img AS menu_image,
        ms.drink_id,
        ms.date
    FROM
        meals_schedule AS ms
    JOIN
        menu AS m ON ms.menu_id = m.id
    JOIN
        users AS u ON ms.user_id = u.id
		WHERE ms.id = ?
		`,
		[id]
	);
	return result;
};
export const getScheduleByDate = async (date) => {
	const [result] = await pool.query(
		`SELECT
        ms.id,
        ms.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.location,
        u.phone_num,
        ms.menu_id,
        m.item_name AS menu_item,
        m.quantity AS menu_quantity,
        m.description AS menu_description,
        m.img AS menu_image,
        ms.drink_id,
        ms.date
    FROM
        meals_schedule AS ms
    JOIN
        menu AS m ON ms.menu_id = m.id
    JOIN
        users AS u ON ms.user_id = u.id
		WHERE ms.date = ?
		`,
		[date]
	);
	return result[0];
};


//Create Schedule

export const saveSchedule = async (sSch) => {
	const result = await pool.query(
		`
        INSERT INTO meals_schedule(user_id, menu_id, date)
        VALUES(?, ?, ?)
    `,
		[sSch.user_id, sSch.menu_id, sSch.date]
	);
	return result;
};


//Update Schedule

export const updateSchedule = async (uSch) => {
	const result = await pool.query(
		`
        UPDATE meals_schedule SET user_id = ?, menu_id = ?, drink_id  = ?, date = ?
        WHERE id = ?
    `,
		[uSch.user_id, uSch.menu_id, uSch.drink_id, uSch.date, uSch.id]
	);
	return result;
};


// //Delete Schedule

export const deleteSchedule = async (dSch) => {
	const [row] = await pool.query(
		`
        DELETE FROM meals_schedule
        WHERE id=?
    `,
		[dSch]
	);
	return row;
};


//Get Single Schedule

export const getSingleSchedule = async (gSs) => {
	const result = await pool.query(
		`
		SELECT users.first_name, users.last_name, menu.item_name, meals_schedule.date, menu.img, menu.description, meals_schedule.id
		FROM meals_schedule
		JOIN users ON meals_schedule.user_id = users.id
		JOIN menu ON meals_schedule.menu_id = menu.id;
			`,
		[gSs]
	);
	const rows = result[0];
	return rows;
};

export const isMealSelected = async (date, user_id) => {
	const [record] = await pool.query(`
		SELECT * FROM meals_schedule 
		WHERE user_id = ${user_id}
		AND LOCATE('${date}', date) > 0; 
	`);

	return record[0];
}

//SELECT ADMIN
export const doesAdminExist = async (username, password) => {
	const [acc] = await pool.query(
		`
		SELECT * FROM users
		WHERE email = ? AND password = ? AND roles = 'ADMIN'
	`,
		[username, password]
	);

	return acc[0];
}
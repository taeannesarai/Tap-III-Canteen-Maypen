let logoImg = document.querySelector(".logo-img");
let navBar = document.querySelector("nav");
let btnToTop = document.querySelector(".to-top-btn");

window.onscroll = () => {
	const toTopStyle = {
		display: "block",
		transform: "scale",
	};
	if (document.documentElement.scrollTop > 25) {
		navBar.style.backgroundColor = "#fff";
		logoImg.classList.add("logoStyle");
		btnToTop.classList.add("not-at-top");
	} else {
		navBar.style.backgroundColor = "none";
		logoImg.classList.remove("logoStyle");
		btnToTop.classList.remove("not-at-top");
	}
};

function toTop() {
	scrollTo(0, 0);
}

// CHECK IF USER PASSWORD ENTRIES ARE THE SAME
function isPWMatch() {
	let userPW = document.querySelector(".user-pw");
	let userPWConfirm = document.querySelector(".user-pw-confirm");
	let signupBtn = document.querySelector(".signup-submit-btn");

	signupBtn.setAttribute("disabled", "");
	userPWConfirm.setAttribute("disabled", "");

	userPW.addEventListener("keyup", () => {
		if (userPW.value.length <= 7) {
			userPWConfirm.setAttribute("disabled", "");
		} else {
			userPWConfirm.removeAttribute("disabled");
		}
	});

	userPWConfirm.addEventListener("keyup", () => {
		if (userPWConfirm.value.length > 7 && userPW.value.length > 7 && userPW.value == userPWConfirm.value) {
			signupBtn.removeAttribute("disabled");
			console.log("Match");
		} else {
			signupBtn.setAttribute("disabled", "");
			console.log("!Match");
		}

		if (userPW.value !== userPWConfirm.value) {
			document.querySelector(".no-match").innerHTML = `<div class="alert alert-warning p-1 mt-2">Password fields doesn't match.</div>`;
		} else {
			document.querySelector(".no-match").innerHTML = '';
		}
	});
}

isPWMatch();

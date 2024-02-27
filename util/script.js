let logoImg = document.querySelector(".logo-img");
let navBar = document.querySelector("nav");
let btnToTop = document.querySelector(".to-top-btn");

window.onscroll = () => {
	const toTopStyle = {
        display: "block",
        transform: 'scale'
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

// CHECK IF USER PASWORD ENTIES ARE THE SAME
let userPW = document.querySelector("user-pw");
let userPWConfirm = document.querySelector("user-pw-confirm");
let signupBtn = document.querySelector("signup-submit-btn");

userPWConfirm.addEventListener('keyup', () => {
	if (userPWConfirm.value > 0 && userPW.value == userPWConfirm.value) {
		signupBtn.setAttribute(disabled, false);
	} else {
		signupBtn.setAttribute(disabled, true);
	}
})
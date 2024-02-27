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

document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".hamburger");
	const navLinks = document.querySelector(".nav-links");
	const links = document.querySelectorAll(".nav-links a");

	hamburger.addEventListener("click", () => {
		navLinks.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	links.forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("active");
			hamburger.classList.remove("active");
		});
	});

	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const headerOffset = 80;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("fade-in-up");
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const animatedElements = document.querySelectorAll(".section-title, .about-content, .skill-category, .timeline-item, .project-card, .hero-content");

	animatedElements.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(20px)";
		el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
		observer.observe(el);
	});
});

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .fade-in-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

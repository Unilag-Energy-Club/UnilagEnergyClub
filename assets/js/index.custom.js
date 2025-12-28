function instantiateSplide() {
	const splideElement = document.querySelector("#v-workers .splide");

	if (splideElement) {
		new Splide(splideElement, {
			perPage: 4.5,
			focus: "center",
			gap: ".5rem",
			arrows: false,
			type: "loop",
			autoplay: true,
			interval: 3000,
			pauseOnHover: true,
			breakpoints: {
				1200: { perPage: 4.5 }, // Large devices
				992: {
					perPage: 3, // Medium screens (desktops, tablets)
					gap: "1rem",
				},
				768: {
					perMove: 1,
					fixedWidth: "300px", // Adjust slide width for tablets
					gap: "0.8rem",
				},
				576: {
					perMove: 1,
					fixedWidth: "260px", // Smaller fixed width for mobile devices
					gap: "0.5rem",
				},
				480: {
					fixedWidth: "90vw", // Use 80% viewport width for very small screens
					gap: "1rem",
				},
			},
		}).mount();
	} else {
		console.error("Splide element not found!");
	}
}
function initWorkers() {
	const splideElement = document.querySelector("#v-workers .splide");
	const buttons = document.querySelectorAll("#v-workers .v-toggler .v-toggler-action");

	var splide = new Splide(splideElement, {
		type: "loop",
		perPage: 1,
		gap: "1rem",
		// width: "100%",
		// autoplay: true,
		// padding: "5rem",
		focus: "center",
		drag: "free",
		// snap: true,
		// rewind: true,
		pagination: false,
		arrows: false,
		autoScroll: {
			speed: 0.4,
		},
	});

	splide.mount(window.splide.Extensions);
	if (!buttons) return;

	buttons.forEach((btn) => {
		btn.addEventListener("click", function () {
			const res = this.dataset.dir.toLowerCase();
			if (res === "right") {
				splide.go("+1");
			} else {
				splide.go("-1");
			}
		});
	});
}

function init() {
	// instantiateSplide();
	initWorkers();
}
// Initialize Splide when DOM is ready
document.addEventListener("DOMContentLoaded", init);

// Toggle to show/hide text
const clubBoxes = document.querySelectorAll(".club-box");

// Add click event listener to each club box
clubBoxes.forEach((box) => {
	const link = box.querySelector(".v-link");
	const textElement = box.querySelector("#subtext");

	// Initialize ARIA attributes
	textElement.setAttribute("aria-expanded", "false");
	link.setAttribute("aria-controls", `description-${Math.random().toString(36).substr(2, 9)}`);

	link.addEventListener("click", function () {
		const isExpanded = textElement.classList.contains("expanded");

		// Toggle the expanded class
		textElement.classList.toggle("expanded");

		// Update ARIA attributes
		textElement.setAttribute("aria-expanded", !isExpanded);
		this.setAttribute("aria-label", isExpanded ? "Show more details" : "Show less details");

		// Update button text
		this.textContent = isExpanded ? "More details" : "Show less";
	});
});

document.addEventListener("DOMContentLoaded", function () {
	new Splide(".advisor-splide", {
		perPage: 3.5,
		type: "loop",
		focus: "center",
		gap: "2rem",
		autoplay: true,
		interval: 3000,
		pauseOnHover: true,
		pauseOnFocus: true,
		arrows: false,
		pagination: false,
		speed: 1000,
		easing: "ease",
		breakpoints: {
			1200: {
				perPage: 3.5,
				gap: "2rem",
			},
			992: {
				perPage: 3,
				gap: "1.5rem",
			},
			768: {
				perMove: 1,
				autoWidth: true,
				gap: "1.5rem",
				focus: "center",
			},
			576: {
				perMove: 1,
				autoWidth: true,
				gap: "1.5rem",
				focus: "center",
			},
			480: {
				perPage: 1,
				gap: "1.5rem",
				focus: "center",
			},
		},
	}).mount();
});

const centerText = {
	id: "centerText",
	afterDatasetsDraw(chart, args, pluginOptions) {
		const { ctx, data } = chart;

		ctx.save();
		const x = chart.getDatasetMeta(0).data[0].x;
		const y = chart.getDatasetMeta(0).data[0].y;

		// Draw percentage
		ctx.font = "bold 24px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillText("80%", x, y);

		// Draw "Attendance" text
		ctx.font = "14px Arial";
		ctx.fillStyle = "rgba(42, 42, 42, 1)";
		ctx.textBaseline = "top";
		ctx.fillText("Attendance", x, y);

		ctx.restore();
	},
};

const ctx = document.getElementById("attendanceChart").getContext("2d");

new Chart(ctx, {
	type: "doughnut",
	data: {
		labels: ["Present", "Absent"],
		datasets: [
			{
				data: [80, 20],
				backgroundColor: ["#28a745", "#dc3545"],
				borderWidth: 0,
				cutout: "75%",
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				callbacks: {
					label: function (context) {
						return `${context.label}: ${context.raw}%`;
					},
				},
			},
		},
	},
	plugins: [centerText],
});

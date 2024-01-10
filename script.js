// current day & time information
const nameEl = document.getElementById("name");
nameEl.textContent = "M-A";

const dayInfoContainer = document.getElementById("day_info");

const daysOfWeek = [
	{ day: "Sunday", smiley: "╰(*°▽°*)╯" },
	{ day: "Monday", smiley: "(┬┬﹏┬┬)" },
	{ day: "Tuesday", smiley: "(●'◡'●)" },
	{ day: "Wednesday", smiley: "(✿◡‿◡)" },
	{ day: "Thursday", smiley: "（￣︶￣）↗" },
	{ day: "Friday", smiley: "(❁´◡`❁)" },
	{ day: "Saturday", smiley: "☆*: .｡. o(≧▽≦)o .｡.:*☆" },
];
const currentDate = new Date();
const currentDay = daysOfWeek[currentDate.getDay()];
const month = currentDate.toLocaleString("en-US", { month: "long" });
const date = currentDate.getDate();
const year = currentDate.getFullYear();

const yearEl = document.getElementById("year");
yearEl.textContent = year;

const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

function getDayInfo() {
	const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}
	`;
	dayInfoContainer.innerHTML = `
        <p>
            ${month} ${date}, ${year} | ${formattedTime}<br />
            ${currentDay.smiley}<br />
            it’s <strong>${currentDay.day}</strong>
        </p>
    `;
}

getDayInfo();
setInterval(getDayInfo, 1000);

// todo list

// quote
function updateDailyQuote(quote, author) {
	const quoteText = document.querySelector(".quote-text");
	const quoteAuthor = document.querySelector(".quote-author");
	quoteText.textContent = quote;
	quoteAuthor.textContent = author;
}

async function getQuote() {
	try {
		const response = await fetch("https://api.quotable.io/random");
		const quote = await response.json();
		updateDailyQuote(quote.content, quote.author);
	} catch (error) {
		console.error("Error fetching data from the Quotable API:", error);
	}
}

getQuote();

// daily tracker
const progressBar = document.getElementById("progress_bar");
const progressMessage = document.getElementById("progress_message");
const checkboxes = document.querySelectorAll(
	".daily-list input[type='checkbox'"
);

const progressMessages = [
	"You can do it!",
	"Great start!",
	"Making progress!",
	"Almost there!",
	"Keep it up!",
	"Well done!",
];

let progressCounter = 0;

function updateProgress() {
	const progressWidth = (progressCounter / checkboxes.length) * 100 + "%";
	progressBar.querySelector(".progress").style.width = progressWidth;
	const messageIndex = Math.min(progressCounter, progressMessages.length - 1);
	progressMessage.innerText = progressMessages[messageIndex];
}

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", () => {
		if (checkbox.checked) {
			progressCounter++;
		} else {
			progressCounter--;
		}

		progressCounter = Math.max(0, Math.min(progressCounter, checkboxes.length));

		updateProgress();
	});
});

// notes

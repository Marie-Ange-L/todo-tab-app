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

// daily tracker

// notes

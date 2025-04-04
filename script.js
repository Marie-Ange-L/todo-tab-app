// modal
var aboutLink = document.getElementById("aboutLink");
var aboutModal = document.getElementById("aboutModal");
var modalClose = document.getElementById("closeModal");
var modalBtn = document.getElementById("modalOkButton");

aboutLink.addEventListener("click", function (event) {
	event.preventDefault();
	openModal();
});
modalClose.addEventListener("click", closeModalHandler);
modalBtn.addEventListener("click", closeModalHandler);

function openModal() {
	aboutModal.style.display = "block";
}

function closeModalHandler() {
	aboutModal.style.display = "none";
}

// user name
const nameEl = document.getElementById("name");

const storedName = localStorage.getItem("userName");
if (storedName) {
	nameEl.textContent = storedName;
} else {
	nameEl.textContent = "'click to add name'";
	localStorage.setItem("userName", "'click to add name'");
}

nameEl.addEventListener("input", () => {
	localStorage.setItem("userName", nameEl.textContent);
});

// current day & time information
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

function getDayInfo() {
	const currentDate = new Date();
	const currentDay = daysOfWeek[currentDate.getDay()];
	const month = currentDate.toLocaleString("en-US", { month: "long" });
	const date = currentDate.getDate();
	const year = currentDate.getFullYear();

	const yearEl = document.getElementById("year");
	yearEl.textContent = year;

	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

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
const todoList = document.getElementById("todo");
const todoInput = document.getElementById("todo_text");
const todoBtn = document.getElementById("todo_btn");

const storedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

function toggleTodoDone(listItem) {
	listItem.classList.toggle("done");

	const itemText = listItem.textContent;
	const storedItem = storedTodoItems.find((item) => item.text === itemText);
	if (storedItem) {
		storedItem.done = !storedItem.done;
		updateTodoLocalStorage();
	}
}

function confirmTodoDelete(listItem) {
	const confirmation = confirm("Are you sure you want to delete this task?");
	if (confirmation) {
		listItem.remove();

		const itemId = listItem.dataset.id;

		const index = storedTodoItems.findIndex((item) => item.id === itemId);
		if (index !== -1) {
			storedTodoItems.splice(index, 1);
		}

		updateTodoLocalStorage();
	}
}

function addTodo() {
	const todoText = todoInput.value.trim();
	if (todoText) {
		const newTodo = document.createElement("li");
		newTodo.classList.add("list-item");
		newTodo.textContent = todoText;

		const uniqueId = Date.now().toString();
		newTodo.dataset.id = uniqueId;

		newTodo.addEventListener("click", () => toggleTodoDone(newTodo));
		newTodo.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			confirmTodoDelete(newTodo);
		});

		todoList.querySelector("ul").appendChild(newTodo);
		todoInput.value = "";

		storedTodoItems.push({ id: uniqueId, text: todoText, done: false });
		updateTodoLocalStorage();
	}
}

function updateTodoLocalStorage() {
	localStorage.setItem("todoItems", JSON.stringify(storedTodoItems));
}

storedTodoItems.forEach((item) => {
	const newTodo = document.createElement("li");
	newTodo.classList.add("list-item");
	newTodo.textContent = item.text;
	newTodo.dataset.id = item.id;

	if (item.done) {
		newTodo.classList.add("done");
	}

	newTodo.addEventListener("click", () => toggleTodoDone(newTodo));
	newTodo.addEventListener("contextmenu", (e) => {
		e.preventDefault();
		confirmTodoDelete(newTodo);
	});

	todoList.querySelector("ul").appendChild(newTodo);
});

todoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addTodo();
	}
});

// quote API version
// function updateDailyQuote(quote, author) {
// 	const quoteText = document.querySelector(".quote-text");
// 	const quoteAuthor = document.querySelector(".quote-author");
// 	quoteText.textContent = quote;
// 	quoteAuthor.textContent = author;
// }

// async function getQuote() {
// 	try {
// 		const response = await fetch(
// 			"https://api.allorigins.win/get?url=https://zenquotes.io/api/random"
// 		);
// 		if (!response.ok) {
// 			throw new Error(`HTTP error! Status: ${response.status}`);
// 		}
// 		const data = await response.json();
// 		const quoteData = JSON.parse(data.contents);
// 		const quoteText = quoteData[0].q;
// 		const author = quoteData[0].a;
// 		updateDailyQuote(quoteText, author);
// 	} catch (error) {
// 		console.error("Error fetching data", error);
// 	}
// }

// getQuote();

// quote Local Version
function updateDailyQuote(quote, author) {
	const quoteText = document.querySelector(".quote-text");
	const quoteAuthor = document.querySelector(".quote-author");

	if (quoteText && quoteAuthor) {
		quoteText.textContent = quote;
		quoteAuthor.textContent = author;
	} else {
		console.error(
			"Les éléments .quote-text ou .quote-author sont introuvables"
		);
	}
}

async function getQuote() {
	try {
		const response = await fetch("quotes.json");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const quotes = await response.json();

		const randomIndex = Math.floor(Math.random() * quotes.length);
		const quoteData = quotes[randomIndex];

		updateDailyQuote(quoteData.content, quoteData.author);
	} catch (error) {
		console.error("Error fetching quotes", error);
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

let data = JSON.parse(localStorage.getItem("dailyTrackerData")) || {
	progressCounter: 0,
	checkboxStates: {},
	resetDay: new Date().toLocaleDateString(),
};

function updateProgress() {
	const progressWidth = (data.progressCounter / checkboxes.length) * 100 + "%";
	progressBar.querySelector(".progress").style.width = progressWidth;
	const messageIndex = Math.min(
		data.progressCounter,
		progressMessages.length - 1
	);
	progressMessage.innerText = progressMessages[messageIndex];
}

function updateLocalStorage() {
	localStorage.setItem("dailyTrackerData", JSON.stringify(data));
}

function resetDailyTracker() {
	data.progressCounter = 0;
	data.checkboxStates = {};
	data.resetDay = new Date().toLocaleDateString();

	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});

	updateProgress();
	updateLocalStorage();
}

function resetProgress() {
	const currentDay = new Date().toLocaleDateString();

	if (data.resetDay !== currentDay) {
		resetDailyTracker();
	}
}

checkboxes.forEach((checkbox) => {
	checkbox.checked = data.checkboxStates[checkbox.id] || false;
	checkbox.addEventListener("change", () => {
		if (checkbox.checked) {
			data.progressCounter++;
		} else {
			data.progressCounter--;
		}

		data.progressCounter = Math.max(
			0,
			Math.min(data.progressCounter, checkboxes.length)
		);

		data.checkboxStates[checkbox.id] = checkbox.checked;

		updateProgress();
		updateLocalStorage();
	});
});

updateProgress();
resetProgress();

// notes
const notesEl = document.getElementById("notes");

notesEl.value = localStorage.getItem("notesContent") || "";

function handleNotes() {
	localStorage.setItem("notesContent", notesEl.value);
}

notesEl.addEventListener("input", handleNotes);

// get unsplash image
async function fetchRandomImage() {
	try {
		const keywords = ["art", "color", "graphic"];
		const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
		const unsplashApiUrl = `https://api.unsplash.com/photos/random/?client_id=7r9FtuBLZzMDqHTSzzqyf6daGqHGxXfMwbyupzu-Geo&license=free&query=${randomKeyword}`;

		const response = await fetch(unsplashApiUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch random image");
		}

		const data = await response.json();

		const imageUrl = data.urls.regular;
		const title = capitalizeFirstLetter(data.alt_description);
		const author = data.user.name;
		const unsplashPageUrl = data.links.html;

		const imageElement = document.getElementById("unsplashImage");
		const imageTitle = document.getElementById("imageTitle");
		const imageAuthor = document.getElementById("imageAuthor");

		imageElement.src = imageUrl;
		imageElement.alt = title;
		imageTitle.textContent = title;
		imageAuthor.innerHTML = `By: ${author} on <a href="${imageUrl}" target="_blank">Unsplash</a>`;
		imageElement.parentElement.href = unsplashPageUrl;
	} catch (error) {
		console.error("Error fetching random image:", error);
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

fetchRandomImage();

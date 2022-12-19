let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let popupToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElememnts();
	prepareDOMEvents();
};
const prepareDOMElememnts = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	// popupToEdit = document.querySelector(".popup");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};
const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck);
	popupInput.addEventListener("keyup", enterKeyCheck);
	popupInput.addEventListener("keyup", escKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		ulList.append(newTodo);
		todoInput.value = "";
		errorInfo.textContent = "";

		addTools();
		// console.log(newTodo);
	} else {
		errorInfo.textContent = "Wpisz tresc zadania";
	}
};

const addTools = () => {
	// newTools = document.createElement("div");
	// newTools.classList.add("tools");
	// newTools.innerHTML = `<button class="complete">
	// 		<i class="fas fa-check"></i>
	// 		</button>
	// 		<button class="edit">EDIT</button>
	//  		<button class="delete">
	//  			<i class="fas fa-times"></i>
	//  		</button>`;
	// newTodo.append(newTools);

	const newTools = document.createElement("div");
	newTools.classList.add("tools");
	newTodo.append(newTools);

	const newBtnC = document.createElement("button");
	newBtnC.classList.add("complete");
	newBtnC.innerHTML = '<i class="fas fa-check"></i>';

	const newBtnE = document.createElement("button");
	newBtnE.classList.add("edit");
	newBtnE.textContent = "EDTI";

	const newBtnD = document.createElement("button");
	newBtnD.classList.add("delete");
	newBtnD.innerHTML = '<i class="fas fa-times"></i>';

	newTools.append(newBtnC, newBtnE, newBtnD);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		delTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		closePopup();
	} else {
		popupInfo.textContent = "Wpisz tresc zadania";
	}
};

const delTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		changeTodoText();
		addNewTodo();
	}
};

const escKeyCheck = (e) => {
	if (e.key === "Escape") {
		closePopup();
	}
};

document.addEventListener("DOMContentLoaded", main);

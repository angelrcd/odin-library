/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
const myLibrary = [];
const openModalButton = document.querySelector(".add-book-button");
const addBookModal = document.querySelector("dialog");
const form = document.querySelector(".submit-new-book");
const table = document.querySelector("table tbody");
const numberOfBooks = document.querySelector(".number-books");

updateNumberOfBooks();

// Book constructor
function Book(title, author, pages, readen) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readen = readen;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${
      this.readen ? "readen" : "not read yet"
    }`;
  };
}

Book.prototype.toggleRead = function () {
  this.readen = !this.readen;
};

Book.prototype.addToTable = function (index) {
  const row = table.insertRow();
  row.insertCell().textContent = this.title;
  row.insertCell().textContent = this.author;
  row.insertCell().textContent = this.pages;
  row.insertCell().textContent = this.readen;
  row.insertCell().innerHTML = `
                                <button class="remove" data-index='${index}'>Remove</button>
                                <button class="set-read" data-index='${index}'>Toogle read</button>
                                `;
};

/// ///////////////

function addBookToLibrary(bookData) {
  const book = new Book(...bookData);
  myLibrary.push(book);
  updateNumberOfBooks();
}

function updateTableElementLibrary() {
  table.innerHTML = "";
  myLibrary.forEach((book, index) => book.addToTable(index));

  const setEventsButtonsNodeList = () => {
    const removeButtons = document.querySelectorAll(".remove");
    const toggleButtons = document.querySelectorAll(".set-read");

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        removeBook(button.getAttribute("data-index"));
      });
    });

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        myLibrary[button.getAttribute("data-index")].toggleRead();
        updateTableElementLibrary();
      });
    });
  };

  setEventsButtonsNodeList();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  updateTableElementLibrary();
  updateNumberOfBooks();
}

function updateNumberOfBooks() {
  numberOfBooks.textContent = myLibrary.length;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const newBook = Array.from(formData.values());
  if (newBook.length === 3) {
    newBook.push(false);
  } else {
    newBook[3] = true;
  }

  addBookToLibrary(newBook);

  // Empty form and close modal after adding book
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
  updateTableElementLibrary();
  addBookModal.close();
});

openModalButton.addEventListener("click", () => {
  addBookModal.showModal();
});

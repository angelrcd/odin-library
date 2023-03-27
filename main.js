/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
const myLibrary = [];
const openModalButton = document.querySelector(".add-book-button");
const addBookModal = document.querySelector("dialog");
const form = document.querySelector(".submit-new-book");

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

function addBookToLibrary(bookData) {
  const book = new Book(...bookData);
  myLibrary.push(book);
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
  addBookModal.close();
  // TODO delete
  console.table(myLibrary);
});

openModalButton.addEventListener("click", () => {
  addBookModal.showModal();
});

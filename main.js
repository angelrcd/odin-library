/* eslint-disable no-use-before-define */
const myLibrary = [];
const openModalButton = document.querySelector(".add-book-button");
const addBookModal = document.querySelector("dialog");
const addBookButton = document.querySelector("dialog button");

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

function addBookToLibrary(bookData) {
  const book = new Book(...bookData);
  myLibrary.push(book);
}

addBookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector(".submit-new-book");

  const formData = new FormData(form);
  const newBook = Array.from(formData.values());
  if (newBook.length === 3) {
    newBook.push(false);
  }

  console.log(newBook);

  // Empty form and close modal after adding book
  formData.forEach((value, key) => {
    formData.set(key, "");
  });
  addBookModal.close();
});

openModalButton.addEventListener("click", () => {
  addBookModal.showModal();
});

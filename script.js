let BOOKS = [];
const bookshelf = document.querySelector(".bookshelf");
const welcomeMsg = document.querySelector(".welcome-header");

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.displayed = false;

  this.toggleHasRead = function () {
    this.hasRead = !this.hasRead;
  };
}

function addBook(title, author, pages, hasRead) {
  BOOKS.push(new Book(title, author, pages, hasRead));
}

function renderBook(book) {
  book.displayed = true;

  // .book parent div
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.dataset.id = book.id;

  // .book-data child div
  const bookDataDiv = document.createElement("bookData");
  bookDataDiv.classList.add("book-data");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.textContent = book.title;

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");
  authorDiv.textContent = book.author;

  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("page-ct");
  pagesDiv.textContent = book.pages;

  bookDataDiv.appendChild(titleDiv);
  bookDataDiv.appendChild(authorDiv);
  bookDataDiv.appendChild(pagesDiv);

  bookDiv.appendChild(bookDataDiv);

  // .book-actions child div
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("book-actions");

  const hasReadBtn = document.createElement("button");
  const hasReadImg = document.createElement("img");
  hasReadImg.src = "assets/glasses-outline.svg";
  hasReadBtn.appendChild(hasReadImg);
  if (book.hasRead) {
    hasReadBtn.classList.add("has-read");
  }
  hasReadBtn.addEventListener("click", () => {
    book.toggleHasRead();
    hasReadBtn.classList.toggle("has-read");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  const deleteImg = document.createElement("img");
  deleteImg.src = "assets/delete-icon.svg";
  deleteBtn.appendChild(deleteImg);
  deleteBtn.addEventListener("click", () => {
    const bookDiv = document.querySelectorAll(`[data-id="${book.id}"]`);
    bookDiv.forEach((childDiv) => childDiv.remove()); // Clear from DOM
    BOOKS = BOOKS.filter((el) => el.id !== book.id); // Remove from global array

    if (BOOKS.length == 0) {
      welcomeMsg.style.display = "flex";
    }
  });

  actionsDiv.appendChild(hasReadBtn);
  actionsDiv.appendChild(deleteBtn);

  bookDiv.appendChild(actionsDiv);

  // add to bookshelf
  bookshelf.appendChild(bookDiv);
}

function renderBooks() {
  if (BOOKS) {
    welcomeMsg.style.display = "none";
  }
  BOOKS.filter((book) => !book.displayed).forEach((book) => {
    renderBook(book);
  });
}

// Handle form interaction
const dialogEl = document.querySelector("dialog");

// Cancel btn
document.querySelector(".cancel-btn").addEventListener("click", (event) => {
  event.preventDefault();
  dialogEl.hidePopover();
});

// Submit btn
const newBookForm = document.querySelector("form");
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newBook = Object.fromEntries(formData.entries());
  addBook(
    newBook.title,
    newBook.author,
    newBook.pageCnt,
    newBook.hasRead === "true",
  );

  newBookForm.reset();

  renderBooks();
  dialogEl.hidePopover();
});

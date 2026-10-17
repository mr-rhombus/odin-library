const BOOKS = [];
const bookshelf = document.querySelector(".bookshelf");
const welcomeMsg = document.querySelector(".welcome-header");

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.toggleHasRead = function () {
    this.hasRead = !this.hasRead;
  };
}

function addBook(title, author, pages, hasRead) {
  BOOKS.push(new Book(title, author, pages, hasRead));
}

function renderBook(book) {
  // .book parent div
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

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

  actionsDiv.appendChild(hasReadBtn);
  actionsDiv.appendChild(deleteBtn);

  bookDiv.appendChild(actionsDiv);

  // add to bookshelf
  bookshelf.appendChild(bookDiv);
}

function renderBooks() {
  if (BOOKS) {
    welcomeMsg.style.display = "none";
  } else {
    welcomeMsg.style.display = "flex";
  }
  BOOKS.forEach((book) => {
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
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newBook = Object.fromEntries(formData.entries());
  addBook(
    newBook.title,
    newBook.author,
    newBook.pageCnt,
    newBook.hasRead === "true",
  );
  renderBooks();
  dialogEl.hidePopover();
});

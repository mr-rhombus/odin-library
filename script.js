const BOOKS = [];
const bookshelf = document.querySelector(".bookshelf");

function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
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

  const unreadBtn = document.createElement("button");
  unreadBtn.classList.add("unread");
  const unreadImg = document.createElement("img");
  unreadImg.src = "assets/glasses-outline.svg";
  unreadBtn.appendChild(unreadImg);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  const deleteImg = document.createElement("img");
  deleteImg.src = "assets/delete-icon.svg";
  deleteBtn.appendChild(deleteImg);

  actionsDiv.appendChild(unreadBtn);
  actionsDiv.appendChild(deleteBtn);

  bookDiv.appendChild(actionsDiv);

  // add to bookshelf
  bookshelf.appendChild(bookDiv);
}

function renderBooks() {
  BOOKS.forEach((book) => {
    renderBook(book);
  });
}

addBook("title1", "author1", "pages1", true);
addBook("title2", "author2", "pages2", false);

renderBooks();

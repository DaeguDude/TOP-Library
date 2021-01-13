// Simple array to contain the book objects
function createBookDiv(index) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("data-book-id", index);
  bookDiv.setAttribute("class", "book");

  return bookDiv;
}

function createTitle(book) {
  const title = document.createElement("div");
  title.setAttribute("id", "title");
  title.setAttribute("class", "book-items");
  title.textContent = book.title;
}

function createAuthor(book) {
  // author
  const author = document.createElement("div");
  author.setAttribute("id", "author");
  author.setAttribute("class", "book-items");
  author.textContent = book.author;

  return author;
}

function createNumPages(book) {
  const numPages = document.createElement("div");
  numPages.setAttribute("id", "num-pages");
  numPages.setAttribute("class", "book-items");
  numPages.textContent = book.numPages;

  return numPages;
}

function createDidRead() {
  const didRead = document.createElement("div");
  didRead.setAttribute("id", "read-not-read");
  didRead.setAttribute("class", "book-items");

  return didRead;
}

function createDidReadBtn(book) {
  const didReadBtn = document.createElement("button");
  if (book.didRead === true) {
    didReadBtn.textContent = "Read";
    didReadBtn.setAttribute("class", "read-btn");
  } else {
    didReadBtn.textContent = "Not Read";
    didReadBtn.setAttribute("class", "not-read-btn");
  }

  return didReadBtn;
}

function toggleReadStatusOnclick(didReadBtn, book) {
  // This button toggles between 'read' and 'not-read'
  didReadBtn.addEventListener("click", (event) => {
    if (book.didRead === true) {
      // Change the local book status
      book.didRead = false;

      didReadBtn.textContent = "Not Read";
      didReadBtn.setAttribute("class", "not-read-btn");
    } else {
      book.didRead = true;

      didReadBtn.textContent = "Read";
      didReadBtn.setAttribute("class", "read-btn");
    }
  });
}

function createRemove() {
  const remove = document.createElement("div");
  remove.setAttribute("id", "remove");
  remove.setAttribute("class", "book-items");

  return remove;
}

function createTrashCan() {
  const trashCan = document.createElement("i");
  trashCan.setAttribute("class", "fas fa-trash");

  return trashCan;
}

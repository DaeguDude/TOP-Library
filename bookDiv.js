function removeBooksFromDisplay(books) {
  const booksLength = books.children.length;
  for (let i = booksLength - 1; i >= 1; i--) {
    books.removeChild(books.children[i]);
  }
}

function addBooksToDisplay(bookList) {
  myLibrary.forEach((book, index) => {
    // book container
    const bookDiv = createBookDiv(index);
    const title = createTitle(book);
    const author = createAuthor(book);
    const numPages = createNumPages(book);
    const didRead = createDidRead();

    // Button that shows the read status
    const didReadBtn = createDidReadBtn(book);
    toggleReadStatusOnclick(didReadBtn, book);
    didRead.append(didReadBtn);

    const remove = createRemove();
    const trashCan = createTrashCan();

    removeBookOnClick(trashCan, myLibrary, render);
    remove.append(trashCan);

    bookDiv.append(title, author, numPages, didRead, remove);
    bookList.append(bookDiv);
  });


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

function removeBookOnClick(trashCan, myLibrary, render) {
  trashCan.addEventListener("click", (event) => {
    // We will retrieve the book object using parentNode property.
    let bookNode = trashCan.parentNode.parentNode;
    let dataBookId = bookNode.getAttribute("data-book-id");

    // Removes the book object in myLibrary, that is at the index of myLibrary
    // which corresponds to the dataBookId value
    myLibrary.splice(dataBookId, 1);

    // Calling render function, we will update the 'data-book-id' attribute
    // value again.
    render();
  });
}

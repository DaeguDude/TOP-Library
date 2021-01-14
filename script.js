const myLibrary = [];

class Book {
  constructor(title, author, numPages, didRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.didRead = didRead;
  }
}

function addBookToLibrary(title, author, numPages, didRead) {
  book = new Book(title, author, numPages, didRead);
  myLibrary.push(book);
}

function render() {
  const bookList = document.getElementById("book-list");
  removeBooksFromDisplay(bookList);
  addBooksToDisplay(bookList);
}

// Modal box
// If 'Add a New Book' is clicked, it will pop up the modal box for user to
// fill out the book information.
const newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", (event) => {
  let bookInfoModal = document.getElementById("book-info-modal");
  bookInfoModal.style.position = "fixed";
  bookInfoModal.style.zIndex = 1;
  bookInfoModal.style.backgroundColor = "rgba(0,0,0,0.7)";
  bookInfoModal.style.overflow = "auto";
  bookInfoModal.style.display = "flex";
  bookInfoModal.style.justifyContent = "center";
  bookInfoModal.style.alignItems = "center";

  // Remove all the remaining values from previous input that might exist
  let inputTitle = document.getElementById("modal-title").children[1];
  let inputAuthor = document.getElementById("modal-author").children[1];
  let inputNumPages = document.getElementById("modal-num-pages").children[1];
  let blankButtonMsg = document.getElementsByClassName("blank-button-msg")[0];

  // First remove class that presents the blank input
  inputTitle.classList.remove("blank-input");
  inputAuthor.classList.remove("blank-input");
  inputNumPages.classList.remove("blank-input");
  // error message to 'display:none'
  blankButtonMsg.style.display = "none";

  // Now remove all the input values that user might have typed
  inputTitle.value = "";
  inputAuthor.value = "";
  inputNumPages.value = "";
  // Now make radio button to nothing is clicked
  document.getElementById("yes").checked = false;
  document.getElementById("no").checked = false;
});

// Add a book & Cancel button in Modal
const submitAddBook = document.getElementById("submit-add-book");
const submitCancel = document.getElementById("submit-cancel");

// If user clicks 'Add a Book' button in the modal box, we will read the
// all the information that user has filled out.
submitAddBook.addEventListener("click", (event) => {
  // Reading all the values
  // This variables will be used as arguments for 'addBookToLibrary'
  let title = document.getElementById("modal-title").children[1].value;
  let author = document.getElementById("modal-author").children[1].value;
  let numPages = document.getElementById("modal-num-pages").children[1].value;
  let didRead = "";

  // Retrieve radio button elements
  let yesRadio = document.getElementById("yes");
  let noRadio = document.getElementById("no");
  let radioList = [yesRadio, noRadio];

  // Check radio button values and insert corresponding values to the variable
  // 'didRead'
  for (let i = 0; i < radioList.length; i++) {
    if (radioList[i].checked === true) {
      if (i === 0) {
        didRead = true;
      } else {
        didRead = false;
      }
    }
  }

  // Check for the missing values before calling 'addBookToLibrary'
  let isMissingValues = false;
  let userInputs = [title, author, numPages, didRead];
  userInputs.forEach((userInput, index) => {
    let inputTitle = document.getElementById("modal-title").children[1];
    let inputAuthor = document.getElementById("modal-author").children[1];
    let inputNumPages = document.getElementById("modal-num-pages").children[1];
    let blankButtonMsg = document.getElementsByClassName("blank-button-msg")[0];

    if (userInput === "") {
      isMissingValues = true;
      switch (index) {
        case 0:
          inputTitle.classList.add("blank-input");
          break;
        case 1:
          inputAuthor.classList.add("blank-input");
          break;
        case 2:
          inputNumPages.classList.add("blank-input");
          break;
        case 3:
          blankButtonMsg.style.display = "block";
          break;
      }
    } else {
      switch (index) {
        case 0:
          inputTitle.classList.remove("blank-input");
          break;
        case 1:
          inputAuthor.classList.remove("blank-input");
          break;
        case 2:
          inputNumPages.classList.remove("blank-input");
          break;
        case 3:
          blankButtonMsg.style.display = "none";
          break;
      }
    }
  });

  // If there's no missing values call 'addBookToLibrary'
  if (isMissingValues != true) {
    addBookToLibrary(title, author, numPages, didRead);

    // Close the form
    let bookInfoModal = document.getElementById("book-info-modal");
    bookInfoModal.style = "";

    // Render on the screen
    render();
  }
});

// If 'cancel' button is clicked, close the form
submitCancel.addEventListener("click", (event) => {
  let bookInfoModal = document.getElementById("book-info-modal");
  bookInfoModal.style = "";
});

// *********************************************************
// Helper Functions
// *********************************************************

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
}

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

  return title;
}

function createAuthor(book) {
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

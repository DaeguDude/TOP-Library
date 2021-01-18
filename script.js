const myLibrary = [];

const newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", openModal);

const submitAddBook = document.getElementById("submit-add-book");
submitAddBook.addEventListener("click", addBookBtnHandler);

const submitCancel = document.getElementById("submit-cancel");
submitCancel.addEventListener("click", closeModal);

// *********************************************************
// Helper Functions
// *********************************************************

class Book {
  constructor(title, author, numPages, didRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.didRead = didRead;
  }
}

function addBookToLibrary(title, author, numPages, didRead) {
  const book = new Book(title, author, numPages, didRead);
  myLibrary.push(book);
}

function render() {
  const bookList = document.getElementById("book-list");
  removeBooksFromDisplay(bookList);
  addBooksToDisplay(bookList);
}

function removeBooksFromDisplay(bookList) {
  const books = Array.from(bookList.children);
  books.forEach((book, index) => {
    if (index != 0) {
      book.remove();
    }
  });
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

function openModal() {
  showModal();
  resetModalValues();
}

function showModal() {
  // Change CSS styles to make it appear
  let bookInfoModal = document.getElementById("book-info-modal");
  bookInfoModal.classList.remove("modal-close");
  bookInfoModal.classList.add("modal-open");
}

function resetModalValues() {
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
}

function closeModal() {
  let bookInfoModal = document.getElementById("book-info-modal");
  bookInfoModal.classList.remove("modal-open");
  bookInfoModal.classList.add("modal-close");
}

function getBookInfo() {
  let title = document.getElementById("modal-title").children[1].value;
  let author = document.getElementById("modal-author").children[1].value;
  let numPages = document.getElementById("modal-num-pages").children[1].value;

  let yesRadio = document.getElementById("yes");
  let noRadio = document.getElementById("no");
  let radioList = [yesRadio, noRadio];
  let didRead = "";
  radioList.forEach((radio, index) => {
    if (radio.checked === true && index === 0) {
      didRead = true;
    } else if (radio.checked === true) {
      didRead = false;
    }
  });

  return { title, author, numPages, didRead };
}

function checkMissingValues(userInputs) {
  const inputTitle = document.querySelector("#modal-title input");
  const inputAuthor = document.querySelector("#modal-author input");
  const inputNumPages = document.querySelector("#modal-num-pages input");
  const blankButtonMsg = document.querySelector(".blank-button-msg");

  let isMissingValues = false;
  userInputs.forEach((userInput, index) => {
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

  return isMissingValues;
}

function addBookBtnHandler() {
  const bookInfo = getBookInfo();

  const userInputs = Object.values(bookInfo);
  let isMissingValues = checkMissingValues(userInputs);

  if (isMissingValues != true) {
    addBookToLibrary(...userInputs);
    closeModal();
    render();
  }
}

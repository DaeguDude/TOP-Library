// Simple array to contain the book objects
let myLibrary = [];

// Firebase configuration
let firebaseConfig = {
  apiKey: "TYPE_API_KEY",
  authDomain: "library-9836a.firebaseapp.com",
  databaseURL: "https://library-9836a.firebaseio.com",
  projectId: "library-9836a",
  storageBucket: "library-9836a.appspot.com",
  messagingSenderId: "308716423146",
  appId: "1:308716423146:web:a165bf2f3dc3c3f4d41493",
  measurementId: "G-PLT2HSTMDQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();

// bookReference
let bookRef = database.ref("Books/");

// 'Book' Constructor
function Book(title, author, numPages, didRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.didRead = didRead;
}

// Add a Book object to 'myLibrary' array
function addBookToLibrary(title, author, numPages, didRead) {
  book = new Book(title, author, numPages, didRead);
  myLibrary.push(book);
}

function addBookToFirebase(title, author, numPages, didRead) {
  database.ref("Books/" + title).set(
    {
      title: title,
      author: author,
      numPages: numPages,
      didRead: didRead,
    },
    function (error) {
      // Completion Callback
      // This will let you know if your data throws an error
      if (error) {
        console.log("The Write Failed.");
      }
    }
  );
}

// Print all the book objects in myLibrary on the screen
function render() {
  // FIX - Maybe this rendering can be better with other approach.
  // Now it removes all the children of book-list which contains book elements,
  // and loop through 'myLibrary' and attatch on the 'book-list' again.

  // Get 'book-list' element, and removes all book objects
  // except the top row.
  const bookList = document.getElementById("book-list");
  const bookListLength = bookList.children.length;

  for (let i = bookListLength - 1; i >= 1; i--) {
    bookList.removeChild(bookList.children[i]);
  }

  // Loop through myLibrary array, and attatch it to 'book-list' to show
  // on the screen
  myLibrary.forEach((book, index) => {
    // book container
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-book-id", index);
    bookDiv.setAttribute("class", "book");

    // title
    const title = document.createElement("div");
    title.setAttribute("id", "title");
    title.setAttribute("class", "book-items");
    title.textContent = book.title;

    // author
    const author = document.createElement("div");
    author.setAttribute("id", "author");
    author.setAttribute("class", "book-items");
    author.textContent = book.author;

    // numPages
    const numPages = document.createElement("div");
    numPages.setAttribute("id", "num-pages");
    numPages.setAttribute("class", "book-items");
    numPages.textContent = book.numPages;

    // didRead
    const didRead = document.createElement("div");
    didRead.setAttribute("id", "read-not-read");
    didRead.setAttribute("class", "book-items");

    // Button that shows the read status
    const didReadBtn = document.createElement("button");
    if (book.didRead === true) {
      didReadBtn.textContent = "Read";
      didReadBtn.setAttribute("class", "read-btn");
    } else {
      didReadBtn.textContent = "Not Read";
      didReadBtn.setAttribute("class", "not-read-btn");
    }

    // This button toggles between 'read' and 'not-read'
    didReadBtn.addEventListener("click", (event) => {
      if (book.didRead === true) {
        // Change the local book status
        book.didRead = false;
        // Change the status in Firebase
        database.ref("Books/" + book.title).update({
          didRead: false,
        });

        didReadBtn.textContent = "Not Read";
        didReadBtn.setAttribute("class", "not-read-btn");
      } else {
        book.didRead = true;
        database.ref("Books/" + book.title).update({
          didRead: true,
        });
        didReadBtn.textContent = "Read";
        didReadBtn.setAttribute("class", "read-btn");
      }
    });
    // Attatch it to the 'didRead' div
    didRead.append(didReadBtn);

    // Remove button
    const remove = document.createElement("div");
    remove.setAttribute("id", "remove");
    remove.setAttribute("class", "book-items");

    const trashCan = document.createElement("i");
    trashCan.setAttribute("class", "fas fa-trash");

    // If trashCan is clicked, it will remove the book object from both
    // screen and myLibrary
    trashCan.addEventListener("click", (event) => {
      // We will retrieve the book object using parentNode property.
      let bookNode = trashCan.parentNode.parentNode;
      let dataBookId = bookNode.getAttribute("data-book-id");

      // Removes the book object in myLibrary, that is at the index of myLibrary
      // which corresponds to the dataBookId value
      myLibrary.splice(dataBookId, 1);

      // Remove from the firebase database
      database.ref("Books/" + book.title).remove();

      // Calling render function, we will update the 'data-book-id' attribute
      // value again.
      render();
    });
    // Attatch it to the 'remove' div
    remove.append(trashCan);

    // All elements appended to the book container
    bookDiv.append(title, author, numPages, didRead, remove);

    // book container appended to bookList
    bookList.append(bookDiv);
  });
}

// event callback is passed a snapshot containing all data at that location
bookRef.on("value", function (snapshot) {
  // Integrate Firebase database with myLibrary
  if (myLibrary.length === 0) {
    // `snapshot.val()` will retrieve the data in the snapshot
    let firebaseBooks = snapshot.val();
    for (let bookProperty in firebaseBooks) {
      book = firebaseBooks[bookProperty];
      // Add it to myLibrary
      myLibrary.push(book);
    }
    render();
  }
});

function activateNewBookBtn() {
  const newBookBtn = document.getElementById("new-book-btn");
  newBookBtn.addEventListener("click", () => {});
}

const newBookBtn = {
  elem: document.getElementById("new-book-btn"),
  activate: function () {
    this.elem.addEventListener("click", () => {
      form.show();
    });
  },
};

const form = {
  bookInfoForm: document.querySelector(".book-info-modal"),
  closeBtn: document.querySelector("input#close"),
  hide: function () {
    this.bookInfoForm.style.display = "none";
  },
  show: function () {
    this.bookInfoForm.style.display = "block";
  },

  showThis: function () {
    console.log(this);
  },

  activateCloseBtn: function () {
    this.closeBtn.addEventListener("click", );
  },
};

form.hide();
form.activateCloseBtn();
newBookBtn.activate();

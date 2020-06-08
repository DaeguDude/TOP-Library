// simple array
let myLibrary = [];

function Book(title, author, numPages, didRead) {
  // the constructor
  this.title = title 
  this.author = author
  this.numPages = numPages
  this.didRead = didRead
  // if(this.didRead === True) {
  //   // Take some input from an user
  // }
}

function addBookToLibrary(title, author, numPages, didRead) {
  book = new Book(title, author, numPages, didRead);
  myLibrary.push(book);
}

function render() {
  
  // Make the bookList clean.
  const bookList = document.getElementById('book-list');
  const bookListLength = bookList.children.length;

  // Remove all the children except the first child
  for (let i=bookListLength-1; i>=1; i--) {
    bookList.removeChild(bookList.children[i]);
  }

  // Loops through the 'myLibrary' array, and displays each book on the page
  myLibrary.forEach((book, index) => {
    // Creating element, give it a className, change the content of the Node
    // with a proper value regarding to it.
    
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-book-id', index);
    bookDiv.classList.add('book');

    const title = document.createElement('div');
    title.classList.add('title', 'book-items');
    title.textContent = book.title;

    const author = document.createElement('div');
    author.classList.add('author', 'book-items');
    author.textContent = book.author;

    const numPages = document.createElement('div');
    numPages.classList.add('numPages', 'book-items');
    numPages.textContent = book.numPages;

    const didRead = document.createElement('div');
    didRead.classList.add('didRead', 'book-items');
    didRead.textContent = book.didRead;

    // ----------------------------------------------------------------------
    const remove = document.createElement('div');
    remove.setAttribute('id', 'remove');
    remove.setAttribute('class', 'book-items');
    
    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', 'remove-btn');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';

    // I need to add eventListenr for button
    // If it's clicked
    //  1. Get the data-book-id of that object
    //  2. Remove that object
    removeButton.addEventListener('click', (event) => {
      let remove = removeButton.parentNode;
      let book = remove.parentNode;
      let dataBookId = book.getAttribute('data-book-id');
      console.log(dataBookId);

      // How do I remove the object with the data-book-id value?
      //  Loop through the entier myLibrary
      //  Check if each book has certain attribute value
      //  if you find it, remove
      myLibrary.splice(dataBookId, 1); 
      render();
    })

    remove.append(removeButton);
    // ----------------------------------------------------------------------

    // Attach all the nodes to the bookDiv node
    bookDiv.append(title, author, numPages, didRead, remove);
    
    
    bookList.append(bookDiv);  
  })
  
}

// Add a New Book button is clicked...
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', (event) => {
  // If button is clicked, bring out the form
  
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style.position = "fixed";
  bookInfoModal.style.zIndex = 1;
  bookInfoModal.style.backgroundColor = "rgba(0,0,0,0.4)";
  bookInfoModal.style.overflow = "auto";

  bookInfoModal.style.display = "flex";
  bookInfoModal.style.justifyContent = "center";
  bookInfoModal.style.alignItems = "center";
});

// Modal
const submitAddBook = document.getElementById('submit-add-book');
const submitCancel = document.getElementById('submit-cancel');

// If AddBook is clicked...
submitAddBook.addEventListener('click', (event) => {
  // Read the information that user has typed
  let modalTitleInput = document.getElementById('modal-title').children[1];
  let modalAuthorInput = document.getElementById('modal-author').children[1];
  let modalNumPagesInput = document.getElementById('modal-num-pages').children[1];

  let title = modalTitleInput.value;
  let author = modalAuthorInput.value;
  let numPages = modalNumPagesInput.value;
  let didRead = '';
  
  // Get radio button
  let yesRadio = document.getElementById('yes');
  let noRadio = document.getElementById('no');
  let radioList = [yesRadio, noRadio];
  radioList.forEach(radio => {
    
    // If it's checked, now add it to the Library
    if(radio.checked === true) {
      if(radio.id == 'yes') {
        didRead = 'Yes';
      } else {
        didRead = 'No';
      }
    }
  })

  // Now adding a book
  addBookToLibrary(title, author, numPages, didRead);
  
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style = '';
  render();

  // Add it to the 'myLibrary' regarding to the information
})

// If Cancel is clicked...
submitCancel.addEventListener('click', (event) => {
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style = '';
})





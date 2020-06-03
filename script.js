// simple array
let myLibrary = [];

function Book(author, title, numPages, didRead) {
  // the constructor
  this.author = author
  this.title = title 
  this.numPages = numPages
  this.didRead = didRead
  // if(this.didRead === True) {
  //   // Take some input from an user
  // }
}

function addBookToLibrary(author, title, numPages, didRead) {
  book = new Book(author, title, numPages, didRead);
  myLibrary.push(book);
}

function render() {
  // Loops through the 'myLibrary' array, and displays each book on the page

  // 1. How can you loop through an array?
  myLibrary.forEach(book => {
    // Creating element, give it a className, change the content of the Node
    // with a proper value regarding to it.
    const bookDiv = document.createElement('div');
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

    // Attach all the nodes to the bookDiv node
    bookDiv.append(title, author, numPages, didRead);

    // Append a book to the 'bookList' div
    const bookList = document.getElementById('book-list');
    bookList.append(bookDiv);
  })
  
}

addBookToLibrary('Angela Duckworth', 'grit', '300', 'yes')
addBookToLibrary('Carol Dweck', 'growth mindset', '300', 'yes');
addBookToLibrary('Angela Duckworth', 'grit', '300', 'yes')
addBookToLibrary('Carol Dweck', 'growth mindset', '300', 'yes');
addBookToLibrary('Angela Duckworth', 'grit', '300', 'yes')
addBookToLibrary('Carol Dweck', 'growth mindset', '300', 'yes');

render();

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

// Make number of pages input numbers only!
const modalNumPagesInput = document.getElementById('modal-num-pages');
console.log(modalNumPagesInput)



// Modal
const submitAddBook = document.getElementById('submit-add-book');
const submitCancel = document.getElementById('submit-cancel');

// If AddBook is clicked...
submitAddBook.addEventListener('click', (event) => {
  
})

// If Cancel is clicked...
submitCancel.addEventListener('click', (event) => {
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style = '';
  console.log(bookInfoModal);
})







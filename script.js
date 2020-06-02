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

// Grit
// const book = document.createElement('div');
// book.classList.add('book');

// const title = document.createElement('div');
// title.classList.add('title', 'book-items');
// title.textContent = 'Grit';

// const author = document.createElement('div');
// author.classList.add('author', 'book-items');
// author.textContent = 'Angela Duckworth';

// const numPages = document.createElement('div');
// numPages.classList.add('numPages', 'book-items');
// numPages.textContent = '300';

// const didRead = document.createElement('div');
// didRead.classList.add('didRead', 'book-items');
// didRead.textContent = "yes";

// book.append(title, author, numPages, didRead);

// // Get the div 'book-list'
// const bookList = document.getElementById('book-list');
// bookList.append(book);






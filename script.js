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

addBookToLibrary('Angela Duckworth', 'grit', '300', 'yes')
addBookToLibrary('Carol Dweck', 'growth mindset', '300', 'yes');
console.log(myLibrary);




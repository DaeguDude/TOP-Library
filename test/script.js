const bookTitle = document.querySelector('#title')
    const bookAuthor = document.querySelector('#author')
    const bookPages = document.querySelector('#pages')
    const readOptions = document.querySelector('select')
    let myLibrary = []; 
    const submit = document.querySelector('#submit')
    const table = document.querySelector('table')

    //Constructor to create book objects:
    function Book(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read 
    }

    //New book objects are stored in an array:
    function addBookToLibrary(){
        //in order to always update new input values everytime we submit
        //we need to retrieve values(by setting the .value) inside the function because 
        //the function runs everytime we hit submit
        if(bookTitle.value && bookAuthor.value && bookPages.value && readOptions.value) {
            myLibrary.push (new Book(bookTitle.value, bookAuthor.value, bookPages.value, readOptions.value))
        } else {
            alert("Please enter all information")
        }
    }
    //Click submit to store new book objects in an array:
    submit.addEventListener('click', addBookToLibrary)

    //Loop through the array to display it in a table on the webpage:
    function render(){
       if(myLibrary.length === 1){
            createTable()
       } else if (myLibrary.length>1){
           for(let i = myLibrary.length - 1; i<=myLibrary.length-1 && i>myLibrary.length-2; i--){
             createTable()
            }
       }
    }

function createTable(){
        const createRow = document.createElement('tr')
        createRow.setAttribute('data-book-number', '1');


        const createTitle = document.createElement('td')
        const createAuthor = document.createElement('td')
        const createPages = document.createElement('td')
        const createStatus = document.createElement('td')
        const createStatusButton = document.createElement('button')
        
        //need to get values from arrays:
        if(myLibrary.length === 1){
          createTitle.innerText = myLibrary[0].title 
          createAuthor.innerText = myLibrary[0].author
          createPages.innerText = myLibrary[0].pages
          createStatusButton.innerText = myLibrary[0].read
        }
        if(myLibrary.length>1){
          createTitle.innerText = myLibrary[myLibrary.length-1].title 
          createAuthor.innerText = myLibrary[myLibrary.length-1].author
          createPages.innerText = myLibrary[myLibrary.length-1].pages
          createStatusButton.innerText = myLibrary[myLibrary.length-1].read
        }
    
        createStatus.append(createStatusButton)
        
        createRow.append(createTitle)
        createRow.append(createAuthor)
        createRow.append(createPages)
        createRow.append(createStatus)
        table.append(createRow)


        //Change reading status when status button is clicked - HOW TO TIE IT WITH status()???:
            createStatusButton.addEventListener('click', function(e){
                    for (let i = 0; i<myLibrary.length; i++){
                     if(createStatusButton.value=== myLibrary[i]){
                        myLibrary[i].status()
                     }
                }
            })
    }
     //Change book reading status:
     Book.prototype.status = function(){
        if(this.read === "Read"){
            this.read === "Not Read"
        } else if (this.read === "In Progress"){
            this.read === "Read"
        } else {
            this.read === "In Progress"
        }
    }
    submit.addEventListener('click', render)


//  Add a button on each book’s display to remove the book from the library. You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array. HOW TO DO THIS??
// Add a button on each book’s display to change its read status. To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance. HOW TO DO THIS???
    
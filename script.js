// 간단한 어레이
let myLibrary = [];

// 'Book' 컨스터럭터
function Book(title, author, numPages, didRead) {
  this.title = title 
  this.author = author
  this.numPages = numPages
  this.didRead = didRead
}

// 'Book' 컨스터럭터를 써서, myLibrary 어레이에 추가해줌
function addBookToLibrary(title, author, numPages, didRead) {
  book = new Book(title, author, numPages, didRead);
  myLibrary.push(book);
}

// 'render' 함수는 화면에 myLibrary에 있는 모든 오브젝트들을 출력해줌
function render() {
  
  // 먼저 북리스트를 dom으로 가져와, 첫번째 줄 빼고 다 지움
  const bookList = document.getElementById('book-list');
  const bookListLength = bookList.children.length;

  for (let i=bookListLength-1; i>=1; i--) {
    bookList.removeChild(bookList.children[i]);
  }

  // myLibrary 어레이를 한 번 돔
  myLibrary.forEach((book, index) => {
    
    // book-list에 추가될, 'book' div를 만들어가는 과정.
    // 'book' div에 들어갈 제목, 저자, 페이지 수 등등의 하위 div들을
    // 생성해줌

    // book에 data-book-id라는 attribute를 생성하고 값을 줌으로써
    // 나중에 remove를 할 때 용이하게 해줌
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-book-id', index);
    bookDiv.setAttribute('class', 'book');

    const title = document.createElement('div');
    title.setAttribute('id', 'title');
    title.setAttribute('class', 'book-items');
    title.textContent = book.title;

    const author = document.createElement('div');
    author.setAttribute('id', 'author');
    author.setAttribute('class', 'book-items');
    author.textContent = book.author;

    const numPages = document.createElement('div');
    numPages.setAttribute('id', 'num-pages');
    numPages.setAttribute('class', 'book-items');
    numPages.textContent = book.numPages;

    
    const didRead = document.createElement('div');
    didRead.setAttribute('id', 'read-not-read');
    didRead.setAttribute('class', 'book-items');

    // 'book' 오브젝트의 값이 true면 read 아니라면 not read
    const didReadBtn = document.createElement('button');
    if(book.didRead === true) {
      didReadBtn.textContent = 'Read';
      didReadBtn.setAttribute('class', 'read-btn');
    } else {
      didReadBtn.textContent = "Not Read";
      didReadBtn.setAttribute('class', 'not-read-btn');
    }

    // 이 버튼이 클릭되었을 시, read -> not read, not read -> read로
    // 바껴야함. 클릭이벤트 추가
    didReadBtn.addEventListener('click', (event) => {
      // book object의 didRead 프로퍼티의 값을 읽어, 반대로 바꾸어줌
      if(book.didRead === true) {
        book.didRead = false;
        didReadBtn.textContent = 'Not Read';
        didReadBtn.setAttribute('class', 'not-read-btn');
      } else {
        book.didRead = true;
        didReadBtn.textContent = "Read";
        didReadBtn.setAttribute('class', 'read-btn');
      }
    })

    // 이 버튼은, 'didRead' div의 child가 됨
    didRead.append(didReadBtn);



    // 그리고 마지막으로, 클릭될 시 그 줄을 지우는 삭제 버튼을 만듬
    const remove = document.createElement('div');
    remove.setAttribute('id', 'remove');
    remove.setAttribute('class', 'book-items');

    const trashCan = document.createElement('i');
    trashCan.setAttribute('class', 'fas fa-trash');
    
    // 삭제 버튼 클릭시, 책의 정보를 담고 있는 줄을 지움
    trashCan.addEventListener('click', (event) => {
      
      // parentNode 프로퍼티를 활용해, 'book' div를 자바스크립트로 가져옴
      let book = trashCan.parentNode.parentNode;
      let dataBookId = book.getAttribute('data-book-id');
      
      // myLibrary안에서, dataBookID의 값과 일치하는 원소의 위치의
      // 책을 지워줌
      myLibrary.splice(dataBookId, 1); 

      // 그리고 다시 render()를 통해 업데이트해줌
      render();
    })
    remove.append(trashCan);
    
    // const removeButton = document.createElement('button');
    // removeButton.setAttribute('id', 'remove-btn');
    // removeButton.innerHTML = '<i class="fas fa-trash"></i>';

    // // 삭제 버튼 클릭시, 책의 정보를 담고 있는 줄을 지움
    // removeButton.addEventListener('click', (event) => {
      
    //   // parentNode 프로퍼티를 활용해, 'book' div를 자바스크립트로 가져옴
    //   let book = removeButton.parentNode.parentNode;
    //   let dataBookId = book.getAttribute('data-book-id');
      
    //   // myLibrary안에서, dataBookID의 값과 일치하는 원소의 위치의
    //   // 책을 지워줌
    //   myLibrary.splice(dataBookId, 1); 

    //   // 그리고 다시 render()를 통해 업데이트해줌
    //   render();
    // })
    // remove.append(removeButton);
    

    // 모든 하위 요소들을 bookDiv에 추가시켜줌
    bookDiv.append(title, author, numPages, didRead, remove);
    
    // bookList에 책을 추가시켜줌
    bookList.append(bookDiv);  
  })
  
}

// 'Add a New Book' 버튼 클릭시, 책의 정보를 입력할 수 있는 팝업 창 띄움
const newBookBtn = document.getElementById('new-book-btn');
newBookBtn.addEventListener('click', (event) => {
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style.position = "fixed";
  bookInfoModal.style.zIndex = 1;
  bookInfoModal.style.backgroundColor = "rgba(0,0,0,0.4)";
  bookInfoModal.style.overflow = "auto";

  bookInfoModal.style.display = "flex";
  bookInfoModal.style.justifyContent = "center";
  bookInfoModal.style.alignItems = "center";
});

// 팝업 창 내의 Add a book과 Cancel 버튼
const submitAddBook = document.getElementById('submit-add-book');
const submitCancel = document.getElementById('submit-cancel');

// Add a book이 클릭되었을시
submitAddBook.addEventListener('click', (event) => {
  
  // 유저가 입력한 정보를 읽어들인다
  let modalTitleInput = document.getElementById('modal-title').children[1];
  let modalAuthorInput = document.getElementById('modal-author').children[1];
  let modalNumPagesInput = document.getElementById('modal-num-pages').children[1];
  let title = modalTitleInput.value;
  let author = modalAuthorInput.value;
  let numPages = modalNumPagesInput.value;
  let didRead = '';

  
  // 라디오 버튼을 DOM으로 읽어들인다
  let yesRadio = document.getElementById('yes');
  let noRadio = document.getElementById('no');
  let radioList = [yesRadio, noRadio];

  // 라디오버튼을 radioList에 넣어, for loop로 어떤 값이 입력되었는지
  // 확인을 한 뒤, 그 값에 걸맞은 값을 'didRead' 변수에 넣어준다
  for(let i = 0; i < radioList.length; i++) {  
    if(radioList[i].checked === true) {
      let radioId = radioList[i].getAttribute('id');
      if(radioId === 'yes') {
        didRead = true;
      } else {
        console.log('false');
        didRead = false;
      }
      break;
    }
  }

  // addBookToLibrary 함수를 호출하기 전, 유저가 안 채운 칸이 있는지 확인한다
  let isMissingValues = false;
  let userInputs = [title, author, numPages, didRead];
  userInputs.forEach(userInput => {
    if(userInput === '') {
      isMissingValues = true;
    }
  })

  // 안 채운 칸이 없다면, addBookToLibrary를 호출해 myLibrary에 넣어준다
  if(isMissingValues != true) {
    addBookToLibrary(title, author, numPages, didRead);

    // 팝업창을 닫는다
    let bookInfoModal = document.getElementById('book-info-modal');
    bookInfoModal.style = '';

    // 화면에 출력함
    render();
  }
})

// 'Cancel' 버튼 클릭시 팝업 창을 닫아준다
submitCancel.addEventListener('click', (event) => {
  let bookInfoModal = document.getElementById('book-info-modal');
  bookInfoModal.style = '';
})




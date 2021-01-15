function addBookBtnHandler() {
  // Reading all the values
  // This variables will be used as arguments for 'addBookToLibrary'
  // let title = document.getElementById("modal-title").children[1].value;
  // let author = document.getElementById("modal-author").children[1].value;
  // let numPages = document.getElementById("modal-num-pages").children[1].value;

  // let yesRadio = document.getElementById("yes");
  // let noRadio = document.getElementById("no");
  // let radioList = [yesRadio, noRadio];
  // let didRead = "";
  // for (let i = 0; i < radioList.length; i++) {
  //   if (radioList[i].checked === true) {
  //     if (i === 0) {
  //       didRead = true;
  //     } else {
  //       didRead = false;
  //     }
  //   }
  // }

  const bookInfo = getBookInfo();
  console.log(bookInfo);

  function getBookInfo() {
    let title = document.getElementById("modal-title").children[1].value;
    let author = document.getElementById("modal-author").children[1].value;
    let numPages = document.getElementById("modal-num-pages").children[1].value;

    let yesRadio = document.getElementById("yes");
    let noRadio = document.getElementById("no");
    let radioList = [yesRadio, noRadio];
    let didRead = "";
    for (let i = 0; i < radioList.length; i++) {
      if (radioList[i].checked === true) {
        if (i === 0) {
          didRead = true;
        } else {
          didRead = false;
        }
      }
    }

    return { title, author, numPages, didRead };
  }

  // Check for the missing values before calling 'addBookToLibrary'
  let isMissingValues = false;

  let userInputs = Object.values(bookInfo);
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
    addBookToLibrary(...userInputs);
    closeModal();

    // Render on the screen
    render();
  }
}

function getBookInfo() {
  let title = document.getElementById("modal-title").children[1].value;
  let author = document.getElementById("modal-author").children[1].value;
  let numPages = document.getElementById("modal-num-pages").children[1].value;

  let yesRadio = document.getElementById("yes");
  let noRadio = document.getElementById("no");
  let radioList = [yesRadio, noRadio];
  let didRead = "";
  for (let i = 0; i < radioList.length; i++) {
    if (radioList[i].checked === true) {
      if (i === 0) {
        didRead = true;
      } else {
        didRead = false;
      }
    }
  }

  return { title, author, numPages, didRead };
}

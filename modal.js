function openModal() {
  showModal();
  resetModalValues();
}

function showModal() {
  // Change CSS styles to make it appear
  let bookInfoModal = document.getElementById("book-info-modal");
  bookInfoModal.style.position = "fixed";
  bookInfoModal.style.zIndex = 1;
  bookInfoModal.style.backgroundColor = "rgba(0,0,0,0.7)";
  bookInfoModal.style.overflow = "auto";
  bookInfoModal.style.display = "flex";
  bookInfoModal.style.justifyContent = "center";
  bookInfoModal.style.alignItems = "center";
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

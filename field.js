function RadioField(name) {
  let didRead = "";

  const isEmpty = () => {
    const isNotChecked = () => {
      const yesRadio = document.querySelector("#yes");
      const noRadio = document.querySelector("#no");

      if (yesRadio.checked === true || noRadio.checked === true) {
        return false;
      }

      return true;
    };

    return isNotChecked();
  };

  return { isEmpty };
}

const title = InputField("title");
const author = InputField("author");
const numPages = InputField("numPages");

function InputField(name) {
  let element;

  const setElement = (name) => {
    if (name === "title") {
      element = document.querySelector("#modal-title input");
    } else if (name === "author") {
      element = document.querySelector("#modal-author input");
    } else if (name === "numPages") {
      element = document.querySelector("#modal-num-pages input");
    }
  };
  setElement(name);

  const isEmpty = () => {
    if (element.value === "") {
      return true;
    }

    return false;
  };

  const indicateError = () => {
    element.classList.add("blank-input");
  };

  const removeError = () => {
    element.classList.remove("blank-input");
  };

  return { element, indicateError, removeError, isEmpty };
}

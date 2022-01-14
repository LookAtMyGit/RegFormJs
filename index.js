const button = document.getElementById("button");
const username = document.getElementById("username");
const pass = document.getElementById("pass");
const passCheck = document.getElementById("passCheck");
const email = document.getElementById("email");
const header = document.getElementById("header");
const form = document.getElementById("control");

const nameWarning = document.getElementById("usernameWarn");
const passWarning = document.getElementById("passWarn");
const passCheckWarning = document.getElementById("passCheckWarn");
const emailWarning = document.getElementById("emailWarn");

button.addEventListener("click", userDataHandler);

function setWarnCollor(element) {
  const border = "red solid 3px";
  const backgroundColor = "rgb(255, 150, 150)";
  element.style.border = border;
  element.style.backgroundColor = backgroundColor;
}

function deleteWarnCollor(element) {
  element.removeAttribute("style");
}

function userDataValidation() {
  let isValid = true;

  if (username.value.trim().length === 0) {
    setWarnCollor(username);
    nameWarning.classList.remove("hide");
    isValid = false;
  }
  
  if (pass.value.trim().length < 8) {
    setWarnCollor(pass);
    passWarning.classList.remove("hide");
    isValid = false;
  }

  if (passCheck.value.trim().length === 0 || passCheck.value !== pass.value) {
    setWarnCollor(passCheck);
    passCheckWarning.classList.remove("hide");
    isValid = false;
  }

  if (email.value.trim().length === 0) {
    setWarnCollor(email);
    emailWarning.classList.remove("hide");
    isValid = false;
  }
  return isValid;
}

function userDataHandler(event) {
  event.preventDefault();
  const allInputs = document.getElementsByTagName("input");
  for (let i = 0; i < allInputs.length; i++) {
    const inputId = allInputs[i].id;
    const span = document.getElementById(inputId + "Warn");
    if (span) {
      span.classList.add("hide");
    }
    allInputs[i].removeAttribute("style");
    
  }

  if (!userDataValidation()) {
    return;
  }

  const userData = {
    name: username.value,
    password: pass.value,
    email: email.value,
  };

  fetch(
    "https://epam-reg-base-project-default-rtdb.firebaseio.com/usersList.json",
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  button.innerHTML = "Registered"
  button.style.background = button.style.borderColor = "#428a60";
  header.style.color = "#428a60";
  form.reset();
}

//Showing random pin 
const generateBtn = document.querySelector(".generate-btn");
const randomNumberOutput = document.querySelector(".random_number_output");
generateBtn.addEventListener("click", () => {
  randomNumberOutput.value = generateRandomNumber().toString();
  document.querySelector(".user_input_show").value = "";
  document.getElementById("pinGenerateSound").play();
});

//Declaring global variables
const match = document.querySelector(".match");
const notMatch = document.querySelector(".not_match");
const emptyMessage = document.querySelector(".empty_message");
const digitMessage = document.querySelector(".digit_message");
hideAlerts(); //hiding all the alerts

// select all the number button and add event Listener
const numberBtn = document.querySelectorAll(".number_btn");
numberBtn.forEach((item) => {
  item.addEventListener("click", () => {
    appendNumber(item);
  });
});

// Handling clear button
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  let userInputShow = document.querySelector(".user_input_show");
  userInputShow.value = "";
  hideAlerts();
});

//removing last digit from user input
const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", () => {
  let userInputShow = document.querySelector(".user_input_show");
  userInputShow.value = userInputShow.value.slice(0, -1);
  hideAlerts();
});

//checking if the pin is matched or not
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", checkingTheNumber);

// windows reload/refresh handling
window.onload = () => {
  clear_display_input();
};


//Functions
//function to generate a random pin 
function generateRandomNumber() {
  let maxNumber = 9999;
  let minNumber = 1000;
  randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
  hideAlerts();
  return randomNumber;
}
//function to hide all alerts
function hideAlerts() {
  match.style.display = "none";
  notMatch.style.display = "none";
  emptyMessage.style.display = "none";
  digitMessage.style.display = "none";
}
//function to handle alerts with pin validation
function notify(isitmatch) {
  if (isitmatch === true) {
    match.style.display = "block";
    notMatch.style.display = "none";
    document.getElementById("wowSound").play();
  } else {
    notMatch.style.display = "block";
    match.style.display = "none";
    document.getElementById("errorSound").play();

  }
}
//function to handle wrong pin 
function wrongMessage(message) {
  if (message === true) {
    emptyMessage.style.display = "block";
    digitMessage.style.display = "none";
  } else {
    digitMessage.style.display = "block";
    emptyMessage.style.display = "none";
  }
}
//function to append digits on input
function appendNumber(number) {
  let userInputShow = document.querySelector(".user_input_show");
  userInputShow.value = userInputShow.value + number.innerText;
  document.getElementById("digitClickSound").play();
}
//Function to handle the pin
function checkingTheNumber() {
  const randomNumberOutput = document.querySelector(".random_number_output");
  let userInputShow = document.querySelector(".user_input_show");
  if (userInputShow.value.length === 4) {
    if (randomNumberOutput.value === userInputShow.value) {
      notify(true);
    } else {
      notify(false);
    }
  } else if (userInputShow.value.length === 0) {
    wrongMessage(true);
  } else {
    wrongMessage(false);
  }
  //handling try left alert
  const tryMessage = document.querySelector(".try_message");
  let tryCount = document.getElementById("try_count");
  tryCountMinus = parseInt(tryCount.innerText) - 1;
  tryCount.innerText = tryCountMinus;
  if (randomNumberOutput.value === userInputShow.value) {
    tryCount.innerText = 3;
  } else if (parseInt(tryCount.innerText) <= 0) {
    tryCount.innerText = 0;
    tryMessage.style.color = "red";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("notify-refresh").style.display = "block";
    hideAlerts();
    clear_display_input();

  }
}
//Function to clear input display
function clear_display_input() {
  let userInputShow = document.querySelector(".user_input_show");
  let randomNumberOutput = document.querySelector(".random_number_output");
  userInputShow.value = "";
  randomNumberOutput.value = "";
}
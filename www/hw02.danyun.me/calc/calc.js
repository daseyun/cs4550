// referenced: https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/02-web-tech/HTML/code.js
(function () {
  "use strict";

  const charLimit = 21;

  let displayNumber = "";
  let storedNumber = null; // int
  let lastOperationValue = null; // string
  let screenRefreshed = true;
  let operationPressedLast = true;

  // re-render the display whenever a new number is pressed.
  function refresh_display() {
    let src = document.getElementById("numberField");
    src.innerText = displayNumber;
    screenRefreshed = true;
  }

  // update the display value with the answer
  function update_display() {
    displayNumber = storedNumber;
    refresh_display();
  }

  // helper for resetting the color highlights of the operator buttons.
  function clear_operator_highlight() {
    var operators = document.getElementsByClassName("operator");
    for (let i = 0; i < operators.length; i++) {
      operators[i].style.backgroundColor = "lightsalmon";
    }
  }

  // handle operator inputs
  function operator_input(event) {
    // operation cannot be switched.
    if (operationPressedLast) {
      // '-' is used to denote negative number here. not an operator.
      if (this.innerText === "-") {
        displayNumber = "-";
        refresh_display();
      }
      return;
    }

    // if an operable expression exists
    if (lastOperationValue != null) {
      operation(); // carry out operation
      clear_operator_highlight(); // reset the highlights
      if (this.innerText === "+/=") {
        update_display(); // update "+/="
      }
    } else {
      // case of '3 -> x ... ' awating for secondary num.
      storedNumber = Number(displayNumber); // update internal number
    }

    operationPressedLast = true;
    lastOperationValue = this.innerText;
    screenRefreshed = false;
    document.getElementById(this.id).style.backgroundColor = "gold"; // highlight
  }

  // handle number inputs
  function number_input(event) {
    operationPressedLast = false;
    // if last input was an operator, empty display for new numbers.
    // make sure to wipe only if the screen has not been wiped already.
    if (lastOperationValue != null && !screenRefreshed) {
      displayNumber = ""; // reset
      screenRefreshed = true;
    }

    // prevent additional inputs at charLimit.
    if (displayNumber.length === charLimit) {
      return;
    }

    // handle '0' cases
    if (this.innerText === "0") {
      if (displayNumber.length > 0 && displayNumber[0] === "0") {
        if (!displayNumber.includes(".")) {
          return;
        }
      }
    }

    // handle '.'' cases
    if (this.innerText === ".") {
      if (displayNumber.includes(".")) {
        return;
      } else {
        if (displayNumber === "" || displayNumber === "-") {
          displayNumber += "0"; // padding 0
        }
      }
    }

    // all other numbers. add them to display and refresh.
    displayNumber += this.innerText;
    refresh_display();
  }

  // carry out the appropriate operation.
  function operation(event) {
    // cast the string type display number into Number
    let tempDisplayedNum = Number(displayNumber);
    switch (lastOperationValue) {
      case "+/=":
        storedNumber += tempDisplayedNum;
        break;
      case "-":
        storedNumber -= tempDisplayedNum;
        break;
      case "x":
        storedNumber *= tempDisplayedNum;
        break;
      case "÷":
        storedNumber /= tempDisplayedNum;
        break;
    }
  }

  // clears display -- keep the stored number
  function clear() {
    displayNumber = "";
    storedNumber = null;
    lastOperationValue = null;
    clear_operator_highlight();
    refresh_display();
  }

  // add event listeners to all clickable components.
  function setup_button() {
    var btnDecimalDot = document.getElementById("decimalDot");
    var btn0 = document.getElementById("0");
    var btn1 = document.getElementById("1");
    var btn2 = document.getElementById("2");
    var btn3 = document.getElementById("3");
    var btn4 = document.getElementById("4");
    var btn5 = document.getElementById("5");
    var btn6 = document.getElementById("6");
    var btn7 = document.getElementById("7");
    var btn8 = document.getElementById("8");
    var btn9 = document.getElementById("9");
    var btnClear = document.getElementById("clear");

    var btnAddOrEquals = document.getElementById("addOrEquals");
    var btnSub = document.getElementById("subtract");
    var btnMul = document.getElementById("multiply");
    var btnDiv = document.getElementById("divide");

    btnDecimalDot.addEventListener("click", number_input, false);
    btn0.addEventListener("click", number_input, false);
    btn1.addEventListener("click", number_input, false);
    btn2.addEventListener("click", number_input, false);
    btn3.addEventListener("click", number_input, false);
    btn4.addEventListener("click", number_input, false);
    btn5.addEventListener("click", number_input, false);
    btn6.addEventListener("click", number_input, false);
    btn7.addEventListener("click", number_input, false);
    btn8.addEventListener("click", number_input, false);
    btn9.addEventListener("click", number_input, false);
    btnClear.addEventListener("click", clear, false);

    btnAddOrEquals.addEventListener("click", operator_input, false);
    btnSub.addEventListener("click", operator_input, false);
    btnMul.addEventListener("click", operator_input, false);
    btnDiv.addEventListener("click", operator_input, false);
  }

  window.addEventListener("load", setup_button, false);
})();

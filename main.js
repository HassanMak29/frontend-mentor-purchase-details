const detailsPage = document.querySelector("#details-page"),
  completedPage = document.querySelector("#completed-page"),
  cardHolderName = document.querySelector("#name"),
  number = document.querySelector("#number"),
  expMonth = document.querySelector("#exp-month"),
  expYear = document.querySelector("#exp-year"),
  cvc = document.querySelector("#cvc"),
  cvcLengthError = document.querySelector("#cvc-length-error"),
  expLengthError = document.querySelector("#exp-length-error"),
  numLengthError = document.querySelector("#number-length-error"),
  numFormatError = document.querySelector("#number-format-error"),
  nameLengthError = document.querySelector("#name-length-error"),
  nameFormatError = document.querySelector("#name-format-error"),
  continueBtn = document.querySelector("#continue-btn"),
  confirmBtn = document.querySelector("#confirm-btn"),
  cardNumber = document.querySelector(".card-number"),
  cardName = document.querySelector(".card-name"),
  cardExp = document.querySelector(".card-exp-date"),
  cardCVC = document.querySelector(".card-secret");

number.addEventListener("input", function (e) {
  const groups = e.target.value.match(/[a-zA-Z0-9]{1,4}/g) || [];
  e.target.value = groups.join(" ");

  if (
    /[A-Za-z]g*/.test(e.target.value) &&
    e.target.value.length <= this.maxLength
  ) {
    numFormatError.classList.remove("hidden");
    numLengthError.classList.add("hidden");
  } else {
    number.classList.remove("error-outline");
    numLengthError.classList.add("hidden");
    numFormatError.classList.add("hidden");
  }

  cardNumber.textContent =
    number.value !== ""
      ? number.value
          .replace(/\D/g, "")
          .replace(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g, "$1 $2 $3 $4")
      : "0000 0000 0000 0000";
});

cardHolderName.addEventListener("input", function (e) {
  if (
    /[0-9]g*/.test(e.target.value) &&
    e.target.value.length >= this.minLength
  ) {
    nameFormatError.classList.remove("hidden");
    nameLengthError.classList.add("hidden");
  } else {
    cardHolderName.classList.remove("error-outline");
    nameLengthError.classList.add("hidden");
    nameFormatError.classList.add("hidden");
  }

  cardName.textContent =
    cardHolderName.value !== "" ? cardHolderName.value : "Jane Appleseed";
});

expMonth.addEventListener("input", function (e) {
  e.target.value = e.target.value.slice(0, this.maxLength);
  expMonth.classList.remove("error-outline");
  if (expMonth.value.length && expYear.value.length) {
    expLengthError.classList.add("hidden");
  }
  cardExp.textContent =
    expMonth.value !== ""
      ? `${expMonth.value === "" ? "00" : expMonth.value}/${
          expYear.value === "" ? "00" : expYear.value
        }`
      : `00/${expYear.value === "" ? "00" : expYear.value}`;
});

expYear.addEventListener("input", function (e) {
  e.target.value = e.target.value.slice(0, this.maxLength);
  expYear.classList.remove("error-outline");
  if (expYear.value.length && expMonth.value.length) {
    expLengthError.classList.add("hidden");
  }
  cardExp.textContent =
    expYear.value !== ""
      ? `${expMonth.value === "" ? "00" : expMonth.value}/${
          expYear.value === "" ? "00" : expYear.value
        }`
      : `${expMonth.value === "" ? "00" : expMonth.value}/00`;
});

cvc.addEventListener("input", function (e) {
  e.target.value = e.target.value.slice(0, this.maxLength);
  cvc.classList.remove("error-outline");
  cvcLengthError.classList.add("hidden");
  cardCVC.textContent = cvc.value !== "" ? cvc.value : "000";
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let error = false;
  if (cardHolderName.value.length < 8) {
    nameLengthError.classList.remove("hidden");
    cardHolderName.classList.add("error-outline");
    error = true;
  }
  if (number.value.length < 16) {
    numLengthError.classList.remove("hidden");
    number.classList.add("error-outline");
    error = true;
  }
  if (expMonth.value.length < 2) {
    expLengthError.classList.remove("hidden");
    expMonth.classList.add("error-outline");
    error = true;
  }
  if (expYear.value.length < 2) {
    expLengthError.classList.remove("hidden");
    expYear.classList.add("error-outline");
    error = true;
  }
  if (cvc.value.length < 3) {
    cvcLengthError.classList.remove("hidden");
    cvc.classList.add("error-outline");
    error = true;
  }

  // if any of the errors above occur, don't allow confirmation
  if (error) return;

  // switch page
  detailsPage.classList.add("hidden");
  completedPage.classList.remove("hidden");
});

continueBtn.addEventListener("click", () => {
  // reset card details
  cardNumber.textContent = "0000 0000 0000 0000";
  cardName.textContent = "Jane Appleseed";
  cardExp.textContent = "00/00";
  cardCVC.textContent = "000";

  // reset inputs
  cardHolderName.value = "";
  number.value = "";
  expMonth.value = "";
  expYear.value = "";
  cvc.value = "";

  // switch page
  detailsPage.classList.remove("hidden");
  completedPage.classList.add("hidden");
});

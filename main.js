"use strict";
/* CODE FOR MONTH INPUT*/
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    selected.id = o.querySelector("label").id;
    optionsContainer.classList.remove("active");
  });
});

//CODE FOR AGE CALCULATOR
const okayButton = document.querySelector(".sub");
const body = document.querySelector("body");
var infoTab = document.querySelector(".info-tab");
//it cannot submit since it's not in a form html tag;

function calcAge() {
  /*GENERAL VARIABLES*/
  var theDate = new Date();
  const theMonth = theDate.getMonth(); //current month
  let mainMonth = document.querySelector(".selected").id; //selected month
  let dayOfBirth = document.querySelector("#dob").value; //to be manipulated
  let currDay = theDate.getDate();

  /*BIRTHYEAR*/
  let currYear = theDate.getFullYear();
  let birthYear = document.querySelector(".yob").value;
  let yob =
    mainMonth > theMonth ? currYear - birthYear - 1 : currYear - birthYear;

  // console.log([dayOfBirth, birthYear])

  /* BIRTHMONTH*/

  let birthMonth;
  // birthMonth =
  //   theMonth > mainMonth ? theMonth - mainMonth : mainMonth - theMonth; //to be manipulated
  if (mainMonth > theMonth) {
    birthMonth = 12 + (theMonth - mainMonth);
  } else if (dayOfBirth < currDay && mainMonth > theMonth) {
    birthMonth =
      theMonth > mainMonth
        ? theMonth + 1 - mainMonth
        : 12 - (mainMonth - theMonth + 1);
  } else if (dayOfBirth < currDay) {
    birthMonth =
      theMonth > mainMonth
        ? theMonth + 1 - mainMonth
        : mainMonth - theMonth + 1;
  } else {
    birthMonth =
      theMonth > mainMonth ? theMonth - mainMonth : mainMonth - theMonth;
  }

  //LASTDAY OF THE MONTH
  var lastday = function (y, m) {
    return new Date(y, m, 0).getDate();
  };

  /* DAY OF BIRTH*/
  let dob;
  if (mainMonth === theMonth + 1 || dayOfBirth < currDay) {
    dob = dayOfBirth > currDay ? dayOfBirth - currDay : currDay - dayOfBirth;
  } else {
    dob = lastday(birthYear, mainMonth) - dayOfBirth + currDay;
  }

  /*FINALIZER */
  let x = 30;
  let y = 31;
  if (dob === x || dob === y) {
    dob = 0;
    birthMonth += 1;
  }
  if (birthMonth === 12) {
    yob += 1;
    birthMonth = 0;
  }

  infoTab.style.display = "initial";
  infoTab.textContent = `You are ${yob} years, ${birthMonth} month(s), and ${dob} day(s) old today.`;

  //To prevent the code from running anytime there's no input supplied.
  if (dayOfBirth === "" || birthYear === "") {
    infoTab.style.display = "none";
    okayButton.style.opacity = "48%";
  } else {
    okayButton.style.opacity = "100%";
  }
}

//code for instant button activation.
const regex = /^\d{4}$/;
let yobField = document.querySelector(".yob");

function superUpdate() {
  // regex.test(yobField.value) === true
  //   ? (okayButton.style.opacity = "100%")
  //   : (okayButton.style.opacity = "48%");

  if(regex.test(yobField.value) === true){
    okayButton.style.opacity = "100%"
  } else{
    okayButton.style.opacity = "48%";
    infoTab.style.display = "none";
  }
}

yobField.addEventListener("keyup", superUpdate);

/*SUBMIT */
// Submit on click of OK button.
okayButton.addEventListener("click", () => {
  return calcAge(), superUpdate();
});

// Submit User info when Enter key is clicked feature.
body.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    return calcAge(), superUpdate();
  }
});




// Assignment Code
var generateBtn = document.querySelector("#generate");

// User entries
var passwordLength = 0;
var charSetChoices = [null, null, null, null];

// Write password to the #password input
function writePassword() {
  /* Do this user interaction first */
  /* Ask for password length */
  var isValidLength = getLength();
  console.log("Desired length: " + passwordLength);

  /* Ask for character sets to use */
  var isValidCharSet = getCharacterSetPreferences();
  console.log(charSetChoices);

  /* if valid responses, generate password */

  /* write password to the box displayed */
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function getLength() {
  passwordLength = prompt("Please enter a length between 8 and 128 characters for your password ", "33");
  if (passwordLength < 8 || passwordLength > 128) {
    alert("Invalid length. Please enter a value between 8 and 128");
    passwordLength = 0; /* reset the invalid value */
    return false;
  }
  /* else, a valid value was set */
  return true;
}

function getCharacterSetPreferences() {
  /* elements are lower, upper, numeric, special */
  /* reset choice array first */
  charSetChoices = [];
  alert("Please choose atleast one of the following sets of characters to use in your password");
  if (confirm("Use lowercase characters?")) {
    charSetChoices.push("lower");
  };
  if (confirm("Use uppercase characters?")) {
    charSetChoices.push("upper");
  };
  if (confirm("Use numeric characters?")) {
    charSetChoices.push("numeric");
  };
  if (confirm("Use special characters?")) {
    charSetChoices.push("special");
  };
  if (charSetChoices.indexOf(null) === -1) {
    return true;
  } else {
    /* please choose atleast one character set */
    alert("Please choose atleast one character set");
    return false;
  }
}

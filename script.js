// Assignment Code
var generateBtn = document.querySelector("#generate");

// User entries
var passwordLength = 0;
var charSetChoices = [null, null, null, null];
var password = "Your Secure Password"; /* same as the default */

// Character sets
var lowercaseChars = [];
var uppercaseChars = [];
var numericChars = [];
var specialChars = [];

// Write password to the #password input
function writePassword() {
  /* Do this user interaction first */
  /* Ask for password length */
  var isValidLength = getLength();
  console.log("Desired length: " + passwordLength);

  /* if a valid length was entered, go ahead and ask for 
  character set preferences, else skip this and write the 
  default text to the password box. */
  if (isValidLength) {
    /* Ask for character sets to use */
    var isValidCharSet = getCharacterSetPreferences();
    console.log(charSetChoices);
    
    /* if valid length and char set choices received, generate password.
    Else, skip this and write default text to the password box */
    if (isValidCharSet) {
      /* generate password, and set passwordText to it */
      /* write to the display to show to the user, instead 
      of the default text. */
      resetCharacterArrays();
      setupCharacterArrays();
      password = generatePassword();
    }
  } 
  
  /* write password to the box displayed */
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function getLength() {
  
  /* show the box to get the length input */
  passwordLength = prompt("Please enter a length between 8 and 128 characters for your password ", "33");

  /* User pressed the Cancel button */
  /* return false, no need to generate password */
  if (passwordLength === null) {
    console.log("User canceled the prompt, return silently");
    return false;
  }

  /* User entered something, and hit OK. Check if numeric */
  /* and no negatives either. Only positive numbers allowed. */
  /* Not using regular expressions / string.match() */
  for (var i = 0; i < passwordLength.length; i++) {
    if(passwordLength[i] < '0' || passwordLength[i] > '9') {
      /* not a digit */
      console.log("Not a number: " + passwordLength[i] + ", return");
      alert("Invalid length. Please enter a number between 8 and 128");
      passwordLength = 0; /* reset the invalid value */
      return false;
    }
  }
  
  /* got all numeric digits, now check if between 8 and 128 */
  if (passwordLength < 8 || passwordLength > 128) {
    console.log("Not a valid number: " + passwordLength + ", return");
    alert("Invalid length. Please enter a number tween 8 and 128");
    passwordLength = 0; /* reset the invalid value */
    return false;
  }

  /* else, a valid value was set, passwordLength has the valid number */
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

function generatePassword() {
  var password = [];
  var masterCharacterSet = [];

  /* create master array of chars from the user preferences */
  /* look at each char set chosen */
  /* push all those chars into the master array */

  if(charSetChoices.indexOf("lower") !== -1) {
    masterCharacterSet = masterCharacterSet.concat(lowercaseChars);
  }
  if(charSetChoices.indexOf("upper") !== -1) {
    masterCharacterSet = masterCharacterSet.concat(uppercaseChars);
  }
  if(charSetChoices.indexOf("numeric") !== -1) {
    masterCharacterSet = masterCharacterSet.concat(numericChars);
  }
  if(charSetChoices.indexOf("special") !== -1) {
    masterCharacterSet = masterCharacterSet.concat(specialChars);
  }
  console.log("masterarray: " + masterCharacterSet);

  var randomCharIndex;
  password = ""; /* reset the string if it was previously generated */
  for (var i = 0; i < passwordLength; i++) {
    /* get a random character from master array */
    /* stick it in the password */
    randomCharIndex = Math.floor(Math.random() * masterCharacterSet.length);
    password += masterCharacterSet[randomCharIndex];
  }

  console.log("Password: " + password);

  return password;
}

function resetCharacterArrays() {
  lowercaseChars = [];
  uppercaseChars = [];
  numericChars = [];
  specialChars = [];
}

function setupCharacterArrays() {
    var c;

    /* uppercase */
    for (c = 65; c <= 90; c++) {
      uppercaseChars.push(String.fromCharCode(c));
    }
    console.log("uppercase array: " + uppercaseChars);

    /* lowercase */
    for(var i = 0; i < uppercaseChars.length; i++) {
      lowercaseChars[i] = uppercaseChars[i].toLowerCase();
    }
    console.log("lowercase array: " + lowercaseChars);

    /* numeric */
    for (c = '0'; c <= '9'; c++) {
      numericChars.push(c);
    }
    console.log("numeric array: " + numericChars);

    /* special chars */
    for (c = 32; c <= 47; c++) {
      specialChars.push(String.fromCharCode(c));
    }
    for (c = 58; c <= 64; c++) {
      specialChars.push(String.fromCharCode(c));
    }
    for (c = 91; c <= 96; c++) {
      specialChars.push(String.fromCharCode(c));
    }
    for (c = 123; c <= 126; c++) {
      specialChars.push(String.fromCharCode(c));
    }
    console.log("special array: " + specialChars);
  }


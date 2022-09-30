// Assignment Code
var generateBtn = document.querySelector("#generate");

// User entries
var passwordLength = null;
var useLower, useUpper, useNumeric, useSpecial;
var password = "Your Secure Password"; /* same as the default */

// Character set arrays
var lowercaseChars = [];
var uppercaseChars = [];
var numericChars = [];
var specialChars = [];

/* This function prompts the user to enter a length between 8 and 128 for the password */
/* The function returns a false if the user cancels the prompt - meaning they don't want to generate a password. */
/* Or returns a true if a valid number [8,128] is entered. The length is set in the global passwordLength var */
function getLength() {

  var userCanceled = false;
  
  do {
    /* show the user prompt to get the length input */
    passwordLength = prompt("Please enter a length between 8 and 128 characters for your password ", "33");

    /* User pressed Cancel.  */
    /* set userCanceled to true, break out of this while */
    /* and return false to NOT generate password */
    if (passwordLength === null) {
      userCanceled = true;
    } else {
      /* User entered some input, and hit OK. Check if it is numeric. */
      /* This check will catch the negative sign, so only positive numbers allowed. */
      for (var i = 0; i < passwordLength.length; i++) {
        if(passwordLength[i] < '0' || passwordLength[i] > '9') {
          alert("Invalid characters. Please enter a number between 8 and 128");
          /* invalid input length, reset to null and repeat the while (show prompt) */
          passwordLength = null; 
          /* break out of this for loop on the first invalid char */
          break; 
        }
      }
  
      /* all numeric digits in input, now check if between 8 and 128 */
      if (passwordLength !== null) {
        if (passwordLength < 8 || passwordLength > 128) {
          alert("Invalid length. Please enter a number between 8 and 128");
          /* invalid value for length, reset to null and repeat the while (show prompt) */
          passwordLength = null; 
        }
      }
    } /* end else */
  } while(!userCanceled && (passwordLength === null));

  if (userCanceled)
    return false; /* no password generation */
  else
    return true; /* passwordLength (global) has a valid length value, generate password */
}

function getCharSetPreferences() {
  /* get the user's choices: lower, upper, numeric, and/or special */
  /* and set the appropriate flags */

  alert("Please choose atleast one of the following sets of characters to use in your password");
  if (confirm("Use lowercase characters?")) {
    useLower = true;
  };
  if (confirm("Use uppercase characters?")) {
    useUpper = true;
  };
  if (confirm("Use numeric characters?")) {
    useNumeric = true;
  };
  if (confirm("Use special characters?")) {
    useSpecial = true;
  };

  /* Atleast one char set should be picked */
  if (useLower || useUpper || useNumeric || useSpecial) {
    return true;
  } else {
    /* please choose atleast one character set */
    alert("Please choose atleast one character set");
    return false;
  }
}

function initializeCharSets() {

  /* Ideally, we want to do this only once for each character set */
  /* Setting up the four arrays with the characters in each char set */

    var c;

    /* uppercase */
    if(uppercaseChars.length === 0) {
      for (c = 65; c <= 90; c++) {
        uppercaseChars.push(String.fromCharCode(c));
      }
      console.log("uppercase array: " + uppercaseChars);
    }

    /* lowercase */
    if(lowercaseChars.length === 0) {
     for(var i = 0; i < uppercaseChars.length; i++) {
        lowercaseChars[i] = uppercaseChars[i].toLowerCase();
      }
      console.log("lowercase array: " + lowercaseChars);
    }

    /* numeric */
    if(numericChars.length === 0) {
     for (c = '0'; c <= '9'; c++) {
        numericChars.push(c);
      }
      console.log("numeric array: " + numericChars);
    }

    /* special chars */
    if(specialChars.length === 0) {

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
  }

  function generatePassword() {

     /* keep this local, and reset it every time */
     /* add only the char sets that were picked by the user */
    var masterCharSet = [];
  
    /* randomly generated index into the masterCharSet */
    var randomCharIndex;

    /* push all the chars from the char sets that the user prefers into a master array */
  
    if(useLower) {
      masterCharSet = masterCharSet.concat(lowercaseChars);
    }
    if(useUpper) {  
      masterCharSet = masterCharSet.concat(uppercaseChars);
    }
    if (useNumeric) {
      masterCharSet = masterCharSet.concat(numericChars);
    }
    if (useSpecial) {
      masterCharSet = masterCharSet.concat(specialChars);
    }
    console.log("masterarray: " + masterCharSet);
  
    /* remove the default password string since we are going to concat the 
    random chars */
    password = "";

    /* get a random character from master array */
    /* stick it in the password */
    for (var i = 0; i < passwordLength; i++) {
      randomCharIndex = Math.floor(Math.random() * masterCharSet.length);
      password += masterCharSet[randomCharIndex];
    }
  
    console.log("Password: " + password);
  
    return password;
  }

  // Write password to the #password input
function writePassword() {

  /* Initial: set up the character set arrays */
  initializeCharSets();

  /* reset earlier user choices if we've done this before */
  passwordLength = null;
  //charSetChoices = [null, null, null, null];
  password = "Your Secure Password"; /* same as the default */
  useLower = false;
  useUpper = false;
  useNumeric = false;
  useSpecial = false;

  /* Ask user for passwordLength */
  var isValidLength = getLength();

  /* if a valid length was entered, go ahead and ask for 
  character set preferences, else skip this and write the 
  default text to the password box. */
  if (isValidLength) {
    /* Ask for character sets to use */
    var isValidCharSet = getCharSetPreferences();
    
    /* if valid length and char set choices received, generate password.
    Else, skip this and write default text to the password box */
    if (isValidCharSet) {
      /* generate password, and set passwordText to it */
      /* write to the display to show to the user, instead 
      of the default text. */
      password = generatePassword();
    }
  } 
  
  /* write password to the box displayed */
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

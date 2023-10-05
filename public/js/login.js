/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email/username formats, as well aspassword 
strength Before sending data to server*/

document.addEventListener("DOMContentLoaded", function () {
  //console.log('DOMContentLoaded event fired');

  const loginForm = document.getElementById("login-form");
  const credentialTypeField = document.getElementById("credentialType");
  const credentialField = document.getElementById("credential");
  const passwordField = document.getElementById("password");
  const errorContainer = document.getElementById("error-container");
  const loginButton = document.getElementById("login-button");

  credentialField.addEventListener("blur", validateAllFields);
  passwordField.addEventListener("blur", validateAllFields);

  registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isValid = validateAllFields();

    if (isValid) {
      loginForm.submit();
    }
  });

  function validateCredential() {
    if (credentialTypeField.value == "Username") {
      const usernameValue = credentialField.value;
      if (usernameValue.length < 3) {
        displayError(
          credentialField,
          "Username must be at least 3 characters long"
        );
        return false;
      } else {
        clearError(credentialField);
        return true;
      }
    } else {
      const emailValue = credentialField.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        displayError(credentialField, "Enter a valid email address");
        return false;
      } else {
        clearError(credentialField);
        return true;
      }
    }
  }

  //validate password
  function validatePassword() {
    const passwordValue = passwordField.value;
    if (passwordValue.length < 6) {
      displayError(
        passwordField,
        "Password must be at least 6 characters long"
      );
      return false;
    } else {
      clearError(passwordField);
      return true;
    }
  }

  //validate all fields and enable/disable the register button
  function validateAllFields() {
    const isCredential = validateCredential();
    const isPasswordValid = validatePassword();

    // Check overall form validity
    const isValid = isCredential && isPasswordValid;
    //console.log(isValid)
    if (isValid) {
      loginButton.classList.remove("disabled");
    } else {
      loginButton.classList.add("disabled");
    }

    return isValid;
  }

  //display error messages under input fields
  function displayError(inputField, message) {
    clearError(inputField);

    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;

    const parent = inputField.parentElement;
    parent.appendChild(errorElement);
  }

  //clear error messages under input fields
  function clearError(inputField) {
    const parent = inputField.parentElement;
    const errorMessages = parent.getElementsByClassName("error-message");
    while (errorMessages.length > 0) {
      parent.removeChild(errorMessages[0]);
    }
  }
});

/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email/username formats, as well aspassword 
strength Before sending data to server*/

document.addEventListener("DOMContentLoaded", function () {
  //console.log('DOMContentLoaded event fired');
  const loginContent = document.getElementById("login-content");
  loginContent.innerHTML = loginMainContent;

  const loginForm = document.getElementById("login-form");
  const credentialTypeField = document.getElementById("credentialType");
  const credentialField = document.getElementById("credential");
  const passwordField = document.getElementById("password");
  const errorContainer = document.getElementById("error-container");
  const loginButton = document.getElementById("login-button");

  credentialField.addEventListener("blur", validateAllFields);
  passwordField.addEventListener("blur", validateAllFields);

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isValid = validateAllFields();

    if (isValid) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credentialType: credentialTypeField.value,
            credential: credentialField.value,
            password: passwordField.value,
          }),
        });

        if (response.ok) {
          clearError(errorContainer);
          const message = "Log in successful. Redirecting to your dashboard.";
          const messageElement = document.getElementById("login-message");
          messageElement.textContent = message;

          // Redirect to the dashboard page after a short delay
          setTimeout(function () {
            window.location.href = "dashboard.html";
          }, 2000);
        } else {
          // login failed, display an error message
          const data = await response.json();
          if (data.error) {
            displayError(errorContainer, data.error);
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  });

  //validate user credential - username or email
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

const loginMainContent = `
  <h1>Log in to Mental Health Monitor</h1>
  <p>Don't have an account? <a href="./register.html">Register</a> now!</p>
  <div id="login-message"></div>
  <div id="error-container"></div>
  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-sm-8">
      <form id="login-form" action="/login" method="post">
        <div class="mb-3">
          <label for="credentialType" class="form-label"
            >Choose the credential to log in with</label
          >
          <select
            type="credentialType"
            id="credentialType"
            class="form-select"
            name="credentialType"
            required
          >
            <option>Username</option>
            <option>Email</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="credential" class="form-label"
            >Username or Email address</label
          >
          <input
            type="credential"
            class="form-control"
            id="credential"
            name="credential"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            id="password"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary disabled"
          id="login-button"
        >
          Log in
        </button>
      </form>
    </div>
  </div>
`;

/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email formats, password strength, and check 
if the password and confirm password fields match. Before sending data to server*/

document.addEventListener("DOMContentLoaded", function () {
  //console.log('DOMContentLoaded event fired');

  const mainContent = document.getElementById("register-content");
  mainContent.innerHTML = registerContent;

  const registrationForm = document.getElementById("registration-form");
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirm-password");
  const confirmPasswordRequirement = document.getElementById(
    "confirmPasswordRequirement"
  );
  const errorContainer = document.getElementById("error-container");
  const registerButton = document.getElementById("register-button");

  usernameField.addEventListener("blur", validateAllFields);
  emailField.addEventListener("blur", validateAllFields);
  passwordField.addEventListener("blur", validateAllFields);
  confirmPasswordField.addEventListener("blur", validateAllFields);

  registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const isValid = validateAllFields();

    if (isValid) {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameField.value,
            email: emailField.value,
            password: passwordField.value,
          }),
        });

        if (response.ok) {
          clearError(errorContainer);
          // Registration was successful, show a message before redirecting
          const message = "Registration successful. You can now log in.";
          const messageElement = document.getElementById(
            "registration-message"
          );
          messageElement.textContent = message;

          // Redirect to the login page after a short delay
          setTimeout(function () {
            window.location.href = "login.html";
          }, 2000);
        } else {
          // Registration failed, display an error message
          const data = await response.json();
          if (data.error) {
            displayError(errorContainer, data.error);
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  });

  //validate username
  function validateUsername() {
    const usernameValue = usernameField.value;
    if (usernameValue.length < 3) {
      displayError(
        usernameField,
        "Invalid username: less than 3 characters long"
      );
      return false;
    } else {
      clearError(usernameField);
      return true;
    }
  }

  //validate email
  function validateEmail() {
    const emailValue = emailField.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      displayError(emailField, "Invalid email address");
      return false;
    } else {
      clearError(emailField);
      return true;
    }
  }

  //validate password
  function validatePassword() {
    const passwordValue = passwordField.value;
    if (passwordValue.length < 6) {
      displayError(
        passwordField,
        "Invalid password: less than 6 characters long"
      );
      return false;
    } else {
      clearError(passwordField);
      return true;
    }
  }

  //validate confirm password
  function validateConfirmPassword() {
    const confirmPasswordValue = confirmPasswordField.value;
    if (confirmPasswordValue !== passwordField.value) {
      displayError(confirmPasswordField, "Make sure your passwords must match");
      return false;
    } else {
      clearError(confirmPasswordField);
      return true;
    }
  }

  //validate all fields and enable/disable the register button
  function validateAllFields() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Check overall form validity
    const isValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;
    //console.log(isValid)
    if (isValid) {
      registerButton.classList.remove("disabled");
    } else {
      registerButton.classList.add("disabled");
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

const registerContent = `      
  <h1>Register for Mental Health Monitor Now!</h1>
    <p>Already have an account? <a href="./login.html">Log in</a> here</p>
    <div id="error-container"></div>
    <div id="registration-message"></div>
    <div class="row justify-content-md-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <form id="registration-form" action="/register" method="post">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"
              id="username"
              required
              aria-describedby="usernameRequirement"
            />
            <div id="usernameRequirement" class="form-text">
              Username must be at least 3 characters long
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              id="password"
              required
              aria-describedby="passwordRequirement"
            />
            <div id="passwordRequirement" class="form-text">
              Password must be at least 6 characters long.
            </div>
          </div>
          <div class="mb-3">
            <label for="confirm-password" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              name="confirm-password"
              id="confirm-password"
              required
              aria-describedby="confirmPasswordRequirement"
            />
            <div id="confirmPasswordRequirement" class="form-text">
              Passwords must match.
            </div>
          </div>
          <button type="submit" class="btn btn-primary disabled" id="register-button">Register</button>
        </form>
      </div>
    </div>
  `;

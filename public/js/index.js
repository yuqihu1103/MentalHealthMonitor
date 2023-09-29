// Function to load content into the main section
function loadContent(content) {
  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = content;
}

const commonStylesheets = [
  "https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Fuggles&family=Permanent+Marker&display=swap",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
  "./css/global.css",
];

// Function to load CSS stylesheets
function loadCSS(commonCSS, specificCSS) {
  // Clear all existing CSS
  const links = document.head.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => {
    link.remove();
  });

  // Add common CSS
  commonCSS.forEach((url) => {
    const commonLink = document.createElement("link");
    commonLink.rel = "stylesheet";
    commonLink.href = url;
    document.head.appendChild(commonLink);
  });

  // Add specific CSS
  if (specificCSS) {
    const specificLink = document.createElement("link");
    specificLink.rel = "stylesheet";
    specificLink.href = specificCSS;
    document.head.appendChild(specificLink);
  }
}

const loadHomepageContent = () => {
  // Load the content for the "home" page
  const HomepageContent = `
      <h1 class="text-center">Welcome to the Mental Health Monitor</h1>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-12">
            <img
              src="./assets/homepage_main_photo.jpg"
              alt="Artwork illustrating positive mental health"
              class="img-fluid"
            />
          </div>
          <div class="col-lg-6 col-md-12">
            <p>
              The Mental Health Monitor is your trusted companion on your
              journey to emotional well-being. Our mission is to provide you
              with valuable insights into your mental health and help you take
              control of your emotional wellness.
            </p>
            <p>
              Whether you're looking to track your progress, gain
              self-awareness, or simply explore your mental health, we're here
              to support you every step of the way. Register today to get
              started on your path to a healthier mind and a brighter future.
            </p>
          </div>
        </div>
      </div>
    
      <footer>
        <h3>Contact the Authors</h3>
        <p>email: hu.yuqi@northeastern.edu</p>
      </footer>
      `;
  loadContent(HomepageContent);
  loadCSS(commonStylesheets, "./css/homepage.css");
};

document.addEventListener("DOMContentLoaded", loadHomepageContent);

// Event listeners for links
document
  .getElementById("home-link")
  .addEventListener("click", loadHomepageContent);

document.getElementById("learn-more-link").addEventListener("click", () => {
  // Load the content for the "Learn More" page
  const learnMoreContent = `
    <h1>More About the Mental Health Monitor</h1>
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/learn_more_details.jpg"
            class="card-img-top"
            alt="Image illustration of unlocking one's mind"
            height="180"
          />
          <div class="card-body">
            <h5 class="card-title">How Does It Work?</h5>
            <p class="card-text">
              After registering and loginning in with your cresentials, you
              can measure your anxiety and depression level with profession
              psychometric instruments. You can view the history of your test
              results and apply filters to gain insight if you would like.
            </p>
            <p class="card-text">
              Do so while enjoying our responsive and interactive UI as well
              as secure storage of sensitive data and indormation!
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/learn_more_anxiety.webp"
            class="card-img-top"
            alt="Image illustration of one having anxiety"
            height="180"
          />
          <div class="card-body">
            <h5 class="card-title">Your Anxiety Level</h5>
            <p class="card-text">
              We provide the Generalized Anxiety Disorder 7 (GAD-7), which is
              a self-reported questionnaire for screening and severity
              measuring of anxiety.
            </p>
            <p class="card-text">
              You can get a valid and reliable measurement of your anxiety
              level within a minute and make informed decisions based on that.
            </p>
            <p class="card-text">
              Login or register now to take the test right now!
            </p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card" style="width: 18rem">
          <img
            src="../assets/learn_more_depression.jpg"
            class="card-img-top"
            alt="Image illustration of one having depression"
            height="180"
          />
          <div class="card-body">
            <h5 class="card-title">Your Depression Level</h5>
            <p class="card-text">
              We provide the nine-item Patient Health Questionnaire (PHQ-9), a
              depressive symptom scale and diagnostic tool. It has been used
              by primary care providers to screen for possible depression.
            </p>
            <p class="card-text">
              Enjoy the convenience of this short scale and rest assured with
              its excellent validity and reliability.
            </p>
            <p class="card-text">
                Login or register now to take the test right now!
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  loadContent(learnMoreContent);
  loadCSS(commonStylesheets, "./css/learn_more.css");
});

document.getElementById("login-link").addEventListener("click", () => {
  // Load the content for the "Login" page
  const loginContent = `
  <h1>Log in to Mental Health Monitor</h1>
  <p>Don't have an account? <a href="./register.html">Register</a> now!</p>
  <div class="row justify-content-md-center">
    <div class="col-lg-4 col-md-6 col-sm-8">
      <form class="login-form">
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
        <button type="submit" class="btn btn-primary disabled" id="login-button">Log in</button>
      </form>
    </div>
  </div>
    `;
  loadContent(loginContent);
  loadCSS(commonStylesheets, "./css/login.css");
});

document.getElementById("register-link").addEventListener("click", () => {
  // Load the content for the "Register" page
  const registerContent = `
  <h1>Register for Mental Health Monitor Now!</h1>
  <p>Already have an account? <a href="./login.html">Log in</a> here</p>
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
  loadContent(registerContent);
  loadCSS(commonStylesheets, "./css/register.css");

  const contentLoadedEvent = new Event("registerLoaded");
  document.dispatchEvent(contentLoadedEvent);
});

/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email formats, password strength, and check 
if the password and confirm password fields match. Before sending data to server*/

document.addEventListener("registerLoaded", function () {
  //console.log('DOMContentLoaded event fired');

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

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateAllFields();

    if (isValid) {
      //console.log("form submitted")
      registrationForm.submit();
    }
  });

  //validate username
  function validateUsername() {
    const usernameValue = usernameField.value;
    if (usernameValue.length < 3) {
      displayError(
        usernameField,
        "Username must be at least 3 characters long"
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
      displayError(emailField, "Enter a valid email address");
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
        "Password must be at least 6 characters long"
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
      displayError(confirmPasswordField, "Passwords must match");
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
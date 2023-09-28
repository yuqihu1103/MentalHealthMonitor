/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email formats, password strength, and check 
if the password and confirm password fields match. Before sending data to server*/

document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const confirmPasswordRequirement = document.getElementById('confirmPasswordRequirement');
    const errorContainer = document.getElementById('error-container');
    const registerButton = document.getElementById('register-button');

    usernameField.addEventListener('blur', validateUsername);
    emailField.addEventListener('blur', validateEmail);
    passwordField.addEventListener('blur', validatePassword);
    confirmPasswordField.addEventListener('blur', validateConfirmPassword);

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const isValid = validateAllFields();

        if (isValid) {
            registrationForm.submit();
        }
    });

    //validate username
    function validateUsername() {
        const usernameValue = usernameField.value;
        if (usernameValue.length < 3) {
            displayError(usernameField, 'Username must be at least 3 characters long');
        } else {
            clearError(usernameField);
        }
        validateAllFields();
    }

    //validate email
    function validateEmail() {
        const emailValue = emailField.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            displayError(emailField, 'Enter a valid email address');
        } else {
            clearError(emailField);
        }
        validateAllFields();
    }

    //validate password
    function validatePassword() {
        const passwordValue = passwordField.value;
        if (passwordValue.length < 6) {
            displayError(passwordField, 'Password must be at least 6 characters long');
        } else {
            clearError(passwordField);
        }
        validateAllFields();
    }

    //validate confirm password
    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordField.value;
        if (confirmPasswordValue !== passwordField.value) {
            displayError(confirmPasswordField, 'Passwords must match');
        } else {
            clearError(confirmPasswordField);
        }
        validateAllFields();
    }

    //validate all fields and enable/disable the register button
    function validateAllFields() {
        const isValid = usernameField.checkValidity() && emailField.checkValidity() &&
            passwordField.checkValidity() && confirmPasswordField.checkValidity();

        if (isValid) {
            registerButton.classList.remove('disabled');
        } else {
            registerButton.classList.add('disabled');
        }

        return isValid;
    }

    //display error messages under input fields
    function displayError(inputField, message) {
        clearError(inputField);

        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;

        const parent = inputField.parentElement;
        parent.appendChild(errorElement);
    }

    //clear error messages under input fields
    function clearError(inputField) {
        const parent = inputField.parentElement;
        const errorMessages = parent.getElementsByClassName('error-message');
        while (errorMessages.length > 0) {
            parent.removeChild(errorMessages[0]);
        }
    }
});


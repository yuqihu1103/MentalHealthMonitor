/*Client-side validation using JavaScript to ensure that users provide valid 
and complete information. Validate email formats, password strength, and check 
if the password and confirm password fields match. Before sending data to server*/

document.addEventListener('DOMContentLoaded', function () {
    //console.log('DOMContentLoaded event fired'); 

    const registrationForm = document.getElementById('registration-form');
    const usernameField = document.getElementById('username');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const confirmPasswordRequirement = document.getElementById('confirmPasswordRequirement');
    const errorContainer = document.getElementById('error-container');
    const registerButton = document.getElementById('register-button');

    usernameField.addEventListener('blur', validateAllFields);
    emailField.addEventListener('blur', validateAllFields);
    passwordField.addEventListener('blur', validateAllFields);
    confirmPasswordField.addEventListener('blur', validateAllFields);

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const isValid = validateAllFields();
    
        if (isValid) {
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: usernameField.value,
                        email: emailField.value,
                        password: passwordField.value,
                    })
                });
    
                if (response.ok) {
                    // Registration was successful, redirect to the login page
                    window.location.href = 'login.html';
                } else {
                    // Registration failed, display an error message
                    const data = await response.json();
                    if (data.error) {
                        displayError(errorContainer, data.error);
                    }
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
    });
    

    //validate username
    function validateUsername() {
        const usernameValue = usernameField.value;
        if (usernameValue.length < 3) {
            displayError(usernameField, 'Username must be at least 3 characters long');
            return false
        } else {
            clearError(usernameField);
            return true
        }
    }

    //validate email
    function validateEmail() {
        const emailValue = emailField.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            displayError(emailField, 'Enter a valid email address');
            return false
        } else {
            clearError(emailField);
            return true
        }
    }

    //validate password
    function validatePassword() {
        const passwordValue = passwordField.value;
        if (passwordValue.length < 6) {
            displayError(passwordField, 'Password must be at least 6 characters long');
            return false
        } else {
            clearError(passwordField);
            return true
        }
    }

    //validate confirm password
    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPasswordField.value;
        if (confirmPasswordValue !== passwordField.value) {
            displayError(confirmPasswordField, 'Passwords must match');
            return false
        } else {
            clearError(confirmPasswordField);
            return true
        }
    }

    //validate all fields and enable/disable the register button
    function validateAllFields() {
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        // Check overall form validity
        const isValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
        //console.log(isValid)
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


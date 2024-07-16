document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');
    const signupContainer = document.getElementById('signup-form');
    const loginContainer = document.getElementById('login-form');
    const profileContainer = document.getElementById('profile');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirm-password').value;

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then(response => {
            console.log("hehehe", response);
            if (!response.ok) {
                throw new Error('Username or Email already exists');
            }
            return response.json();
        })
        .then(data => {
            alert('Signup successful! Please log in.');
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            document.getElementById('login-username').value = data.username;
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let username = document.getElementById('login-username').value;
        let password = document.getElementById('login-password').value;


        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
        .then(data => {
            console.log(data, "ehe");
            loginContainer.style.display = 'none';
            profileContainer.style.display = 'block';
            document.getElementById('profile-username').innerText = data.user.username;
            document.getElementById('profile-email').innerText = data.user.email;
            document.getElementById('profile-password').innerText = password; // Displaying password for demonstration only; not recommended in practice
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});

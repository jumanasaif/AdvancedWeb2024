document.addEventListener('DOMContentLoaded', () => {
    // Admins 
    const adminList = [
      { image: "admin1.jpg", fullName: "Jumana Saif", username: "JumanaS", password: "Jumana123" },
      { image: "admin2.jpg", fullName: "Jullnar Haje", username: "JullnarH", password: "Jullnar123" }
    ];
  
    // Signup Form (for user registration)
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting and reloading the page
  
        // Get the input values from the form
        const fullName = document.getElementById('fullName').value.trim();
        const username = document.getElementById('signup-username').value.trim();
        const password = document.getElementById('signup-password').value.trim();
  
      
        if (!fullName) {
          alert('Please enter your full name.');
          return;
        }
        if (!username) {
          alert('Please enter a username.');
          return;
        }
        if (!password) {
          alert('Please enter a password.');
          return;
        }
  
        // Check if the username is already taken (ensure no duplicates between users and admins)
        const isUsernameTaken = adminList.some(admin => admin.username === username) ||
          JSON.parse(localStorage.getItem('userList'))?.some(user => user.username === username);
  
        if (isUsernameTaken) {
          alert('Username is already taken. Please choose another.');
          return;
        }
  
        // Create a new user object
        const newUser = {
          fullName: fullName,
          username: username,
          password: password
        };
  
        // Save the user data inside the userList array in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
        storedUsers.push(newUser);
        localStorage.setItem('userList', JSON.stringify(storedUsers));
  
        // Display success message
        alert('Sign Up Successful! 🎉');
        window.location.href = "/htmlFiles/1-login.html"; // Example redirection
      });

      console.log("User List:", userList);
    }
  
    // Login Form (for both Admin and User login)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting normally
  
        // Get input values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
  
        // Check if the user is an admin (predefined list)
        const admin = adminList.find(admin => admin.username === username && admin.password === password);
  
        if (admin) {
          // Successful admin login
          alert(`Welcome Admin: ${admin.fullName}`);
          console.log(`Admin ${admin.fullName} logged in successfully.`);
          window.location.href = "/htmlFiles/admin-dashboard.html"; // Example redirection
        } else {
          // Check if the user is a regular user (from localStorage)
          const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
          const user = storedUsers.find(user => user.username === username && user.password === password);
  
          if (user) {
            // Successful user login
            alert(`Welcome User: ${user.fullName}`);
            console.log(`User ${user.fullName} logged in successfully.`);
            window.location.href = "/htmlFiles/02-Signup.html"; // Example redirection
          } else {
            // Failed login
            alert("Invalid username or password. Please try again.");
          }
        }
      });
    }
  });
  
document.addEventListener('DOMContentLoaded', () => {
  // Admins
  const adminList = [
    { fullName: "Jumana Saif", username: "JumanaS", password: "Jumana123",image:"img1.png" },
    { fullName: "Jullnar Haje", username: "JullnarH", password: "Jullnar123",image:"img2.png" },
  ];
  localStorage.setItem("adminList", JSON.stringify(adminList)); // Save admin list to localStorage

  // Signup Form (for user registration)
  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting and reloading the page

      // Get the input values from the form
      const fullName = document.getElementById('fullName').value.trim();
      const username = document.getElementById('signup-username').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      // Validate input
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
  }

  // Handle login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      // Admin login
      const admin = adminList.find(admin => admin.username === username && admin.password === password);
      if (admin) {
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", username);
        alert(`Welcome Admin: ${admin.fullName}`);
        window.location.href = "/htmlFiles/AdminChat.html"; // Redirect to chat interface
        return;
      }

      // User login
      const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
      const user = storedUsers.find(user => user.username === username && user.password === password);
      if (user) {
        localStorage.setItem("role", "user");
        localStorage.setItem("username", username);
        alert(`Welcome User: ${user.fullName}`);
        window.location.href = "/htmlFiles/chat.html"; // Redirect to chat interface
      } else {
        alert("Invalid username or password.");
      }
    });
  }
});

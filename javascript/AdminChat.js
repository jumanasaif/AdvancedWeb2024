document.addEventListener('DOMContentLoaded', () => {
    const userListElement = document.getElementById('admin-list-items');
    const chatHeader = document.getElementById('chat-header');
    const chatWindow = document.getElementById('chat-window');
    const adminMessageInput = document.getElementById('admin-message');
    const sendMessageButton = document.getElementById('send-message');
    const chatBox = document.querySelector('.chat-box');
    const searchBar = document.getElementById('search-bar');
    
    const username = localStorage.getItem("adminUsername") || "admin";
    let currentUser = null;
    
    // Load user list from localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    
    // Populate user list in the interface
    const renderUsers = (users) => {
      userListElement.innerHTML = ""; // Clear the current list
      users.forEach(user => {
        const li = document.createElement('li');
        li.classList.add('user-item');
        li.setAttribute('data-username', user.username);
  
        const span = document.createElement('span');
        span.textContent = user.fullName;
  
        li.appendChild(span);
        userListElement.appendChild(li);
      });
    };
    
    // Initial render of all users
    renderUsers(userList);
    
    // User selection event to open chat
    userListElement.addEventListener('click', (e) => {
      const userElement = e.target.closest('li');
      if (userElement) {
        currentUser = userElement.getAttribute('data-username');
        const userName = userElement.querySelector('span').textContent;
  
        // Update chat header
        chatHeader.textContent = `Chat with: ${userName}`;
        chatWindow.innerHTML = ""; // Clear previous messages
  
        // Show the chat box
        chatBox.style.display = "block";
      }
    });
    
    // Search functionality
    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredUsers = userList.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm)
      );
      renderUsers(filteredUsers);
  
      // If there's only one result, automatically open the chat box
      if (filteredUsers.length === 1) {
        currentUser = filteredUsers[0].username;
        chatHeader.textContent = `Chat with: ${filteredUsers[0].fullName}`;
        chatWindow.innerHTML = ""; // Clear previous messages
        chatBox.style.display = "block";
      }
    });
  
    // Handle sending messages
    sendMessageButton.addEventListener('click', () => {
      const message = adminMessageInput.value.trim();
      if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add('admin-message');
        messageElement.textContent = message;
  
        chatWindow.appendChild(messageElement);
        adminMessageInput.value = ""; // Clear input field
      }
    });
  
    // Optional: Send message when pressing Enter key
    adminMessageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendMessageButton.click();
      }
    });
  });
  
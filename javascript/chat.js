document.addEventListener('DOMContentLoaded', () => {
    const adminListElement = document.getElementById('admin-list-items');
    const chatHeader = document.getElementById('chat-header');
    const chatWindow = document.getElementById('chat-window');
    const adminMessageInput = document.getElementById('admin-message');
    const sendMessageButton = document.getElementById('send-message');
    const chatBox = document.querySelector('.chat-box');
    const searchBar = document.getElementById('search-bar');

    const username = localStorage.getItem("username") || "user"; 
    const role = "user";
    let currentAdmin = null;

  
    // Load admin list from localStorage or use fallback for testing
    const adminList = JSON.parse(localStorage.getItem('adminList')) || [
      { username: "admin1", fullName: "Jumana Saif", image: "https://via.placeholder.com/40" },
      { username: "admin2", fullName: "Jullnar Haje", image: "https://via.placeholder.com/40" }
    ];
  
    // Populate admin list in the interface
    const renderAdmins = (admins) => {
      adminListElement.innerHTML = ""; // Clear the current list
      admins.forEach(admin => {
        const li = document.createElement('li');
        li.classList.add('admin-item');
        li.setAttribute('data-username', admin.username);
  
        const img = document.createElement('img');
        img.src = admin.image;
        img.alt = `${admin.fullName}'s Image`;
  
        const span = document.createElement('span');
        span.textContent = admin.fullName;
  
        li.appendChild(img);
        li.appendChild(span);
        adminListElement.appendChild(li);
      });
    };
  
    // Initial render of all admins
    renderAdmins(adminList);
  
    // Admin selection event
    adminListElement.addEventListener('click', (e) => {
      const userElement = e.target.closest('li');
      if (userElement) {
        currentAdmin = userElement.getAttribute('data-username');
        const adminName = userElement.querySelector('span').textContent;
  
        chatHeader.textContent = `Chat with: ${adminName}`;
        chatWindow.innerHTML = ""; // Clear previous messages
  
        // Show the chat box
        chatBox.style.display = "block";
      }
    });
  
    // Search functionality
    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredAdmins = adminList.filter(admin =>
        admin.fullName.toLowerCase().includes(searchTerm)
      );
      renderAdmins(filteredAdmins);
  
      // If there's only one result, automatically open the chat box
      if (filteredAdmins.length === 1) {
        currentAdmin = filteredAdmins[0].username;
        chatHeader.textContent = `Chat with: ${filteredAdmins[0].fullName}`;
        chatWindow.innerHTML = ""; // Clear previous messages
        chatBox.style.display = "block";
      }
    });

  });
  
document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const villageManagementBtn = document.querySelector("#village-management-btn");
  const overviewBtn = document.querySelector("#overview-btn");
  const chatBtn = document.querySelector("#chat-btn");
  const galleryBtn = document.querySelector("#gallery-btn");

  const villageManagementSection = document.querySelector("#village-management-section");
  const overviewSection = document.querySelector("#overview-section");
  const chatSection = document.querySelector("#chat-section");
  const gallerySection = document.querySelector("#gallery-section");

  // Helper function to show one section and hide the rest
  function showSection(sectionToShow) {
    // List of all sections
    const sections = [villageManagementSection, overviewSection, chatSection, gallerySection];
    
    // Hide all sections and then show the selected one
    sections.forEach(section => {
      section.classList.add("hidden"); // Add hidden class to hide sections
    });

    sectionToShow.classList.remove("hidden"); // Remove hidden class to show section
  }

  // Add event listeners to buttons
  villageManagementBtn.addEventListener("click", () => showSection(villageManagementSection));
  overviewBtn.addEventListener("click", () => showSection(overviewSection));
  chatBtn.addEventListener("click", () => showSection(chatSection));
  galleryBtn.addEventListener("click", () => showSection(gallerySection));
});

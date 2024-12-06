document.addEventListener("DOMContentLoaded", () => {
  // Admin Info Setup
  const adminInfo = JSON.parse(localStorage.getItem("loggedInAdmin"));

  if (adminInfo && adminInfo.image && adminInfo.fullName) {
    const avatar = document.getElementById("admin-avatar");
    const nameElement = document.getElementById("admin-name");

    avatar.src = `/images/${adminInfo.image}`;
    nameElement.textContent = adminInfo.fullName;
  } else {
    console.warn("No valid admin info found. Redirecting to login...");
    window.location.href = "/htmlFiles/1-login.html";
  }

  // Section Navigation
  const villageManagementBtn = document.querySelector("#village-management-btn");
  const overviewBtn = document.querySelector("#overview-btn");
  const chatBtn = document.querySelector("#chat-btn");
  const galleryBtn = document.querySelector("#gallery-btn");

  const villageManagementSection = document.querySelector("#village-management-section");
  const overviewSection = document.querySelector("#overview-section");
  const chatSection = document.querySelector("#chat-section");
  const gallerySection = document.querySelector("#gallery-section");

  function showSection(sectionToShow) {
    const sections = [
      villageManagementSection,
      overviewSection,
      chatSection,
      gallerySection,
    ];
    sections.forEach((section) => section.classList.add("hidden")); // Hide all sections
    sectionToShow.classList.remove("hidden"); // Show selected section
  }

  villageManagementBtn.addEventListener("click", () =>
    showSection(villageManagementSection)
  );
  overviewBtn.addEventListener("click", () => {
    window.location.href = "/htmlFiles/Main.html";
  });
  chatBtn.addEventListener("click", () => showSection(chatSection));
  galleryBtn.addEventListener("click", () => showSection(gallerySection));

  // Logout Button Logic
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("loggedInAdmin");
      window.location.href = "/htmlFiles/1-login.html";
    });
  }

  // Save Village List to Local Storage
  if (!localStorage.getItem("villageList")) {
    const defaultVillages = [
      {
        name: "Jabalia",
        region: "Gaza Strip",
        landArea: "4.5",
        latitude: 31.527,
        longitude: 34.483,
        image: "/images/jabalia.png",
        categories: ["Urban", "Coastal"],
        populationsize: 11.5,
        agedist: ["0-14: 30%", "15-64: 60%", "65+:10%"],
        genderratio: ["Male: 51%", "Female: 49%"],
        populationgrowthrate: ["2%"],
      },
      {
        name: "Beit Lahia",
        region: "Gaza Strip",
        landArea: "5.0",
        latitude: 31.55,
        longitude: 34.496,
        image: "/images/beit-lahia.png",
        categories: ["Agricultural", "Coastal"],
        populationsize: 11.5,
        agedist: ["0-14: 30%", "15-64: 60%", "65+:10%"],
        genderratio: ["Male: 51%", "Female: 49%"],
        populationgrowthrate: ["2%"],
      },
    ];
    localStorage.setItem("villageList", JSON.stringify(defaultVillages));
  }

  // localStorage.setItem("villageList", JSON.stringify(villageList));




  // Render Villages on the Page
  const villageListContainer = document.querySelector(".village-list");




  const prevButton = document.querySelector(".page-button.prev");
  const nextButton = document.querySelector(".page-button.next");

  let currentPage = 1;
  const villagesPerPage = 5;

  const savedVillages1 = JSON.parse(localStorage.getItem("villageList")) || [];
  
  // Calculate the number of pages
  const totalPages = Math.ceil(savedVillages1.length / villagesPerPage);

  function renderVillages(villages) {
    villageListContainer.innerHTML = ""; // Clear existing list
    villages.forEach((village, index) => {
      const villageCard = document.createElement("div");
      villageCard.classList.add("village-card");

      villageCard.innerHTML = `
        <span>${village.name} - ${village.region}</span>
        <div class="actions">
          <button class="view-btn">View</button>
          <button class="update-btn">Update Village</button>
          <button class="delete-btn">Delete Village</button>
          <button class="update-demographic-btn" data-index="${index}">Update Demographic Data</button>
        </div>
      `;

      // Add event listeners for buttons
      villageCard.querySelector(".view-btn").addEventListener("click", () => {
        handleViewVillage(village);
      });

      villageCard.querySelector(".update-btn").addEventListener("click", () => {
        handleUpdateVillage(village, index);
      });


      villageCard.querySelector(".delete-btn").addEventListener("click", () => {
        handleDeleteVillage(index);
      });


          villageCard.querySelector(".update-demographic-btn").addEventListener("click", () => {
            handleUpdatedemoVillage(village, index);});


     
      

      villageListContainer.appendChild(villageCard);
    });
  }


  
  
  const savedVillages = JSON.parse(localStorage.getItem("villageList")) || [];
  const originalVillages = [...savedVillages];
  renderVillages(savedVillages);




  

  


 
  const closeDemographicModal = document.getElementById(
    "close-demographic-modal"
  );
  const saveDemographicDataBtn = document.getElementById(
    "save-demographic-data"
  );

  



  // Search Villages
  const searchField = document.querySelector(".search-field");
  searchField.addEventListener("input", () => {
    const searchTerm = searchField.value.toLowerCase();
    if (searchTerm === "") {
      renderVillages(originalVillages);
    } else {
      const filteredVillages = originalVillages.filter((village) =>
        village.name.toLowerCase().includes(searchTerm)
      );
      renderVillages(filteredVillages);
    }
  });


  const updateDemographicModal = document.querySelector("#update-demographic-modal");
  document.querySelector(".update-demographic-btn").addEventListener("click", () => {
    updateDemographicModal.style.display = "flex"; // Ensure flex for centering
  });

 



  // Sort Villages
  const sortSelect = document.querySelector("select");
  sortSelect.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "alphapatical") {
      const sortedVillages = savedVillages.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      renderVillages(sortedVillages);
    } else if (selectedOption === "default") {
      renderVillages(originalVillages);
    }
  });

  // Add Village Modal
  const addNewVillageBtn = document.getElementById("add-new-village-btn");
  const modalOverlay = document.getElementById("add-new-village-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const submitVillageBtn = document.getElementById("submit-village");

  addNewVillageBtn.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  submitVillageBtn.addEventListener("click", () => {
    const villageName = document.getElementById("village-name").value.trim();
    const regionDistrict = document.getElementById("region-district").value.trim();
    const landArea = document.getElementById("land-area").value.trim();
    const latitude = document.getElementById("latitude").value.trim();
    const longitude = document.getElementById("longitude").value.trim();
    const categoriesInput = document.getElementById("categories").value;
  
    if (!villageName || !regionDistrict || !landArea || !latitude || !longitude || !categoriesInput) {
      alert("Please fill in all required fields!");
      return;
    }
  
    // Split categories correctly
    const categories = categoriesInput.split(",").map((tag) => tag.trim());
  
    const imageUpload = document.getElementById("image-upload").files[0];
    const imageUrl = imageUpload ? URL.createObjectURL(imageUpload) : "";
  
    const newVillage = {
      name: villageName,
      region: regionDistrict,
      landArea,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      image: imageUrl,
      categories, // Ensure categories are added
    };
  
    const updatedVillages = [...savedVillages, newVillage];
    localStorage.setItem("villageList", JSON.stringify(updatedVillages));
    renderVillages(updatedVillages);
  
    // Reset form fields and close the modal
    modalOverlay.style.display = "none";
    document.getElementById("village-name").value = "";
    document.getElementById("region-district").value = "";
    document.getElementById("land-area").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("categories").value = "";
    document.getElementById("image-upload").value = "";
  });
  
  
  
  
 


  
  // Handle Delete Village
  function handleDeleteVillage(index) {
    if (confirm("Are you sure you want to delete this village?")) {
      savedVillages.splice(index, 1); // Remove from saved villages
      originalVillages.splice(index,1); 
      localStorage.setItem("villageList", JSON.stringify(savedVillages));
      renderVillages(savedVillages);
    }
  }

    // Handle View Village Modal
    const viewVillageModalOverlay = document.getElementById("view-village-modal-overlay");
    const viewCloseModalBtn = document.getElementById("view-close-modal-btn");
  
    viewCloseModalBtn.addEventListener("click", () => {
      viewVillageModalOverlay.style.display = "none";
    });
  
    viewVillageModalOverlay.addEventListener("click", (e) => {
      if (e.target === viewVillageModalOverlay) {
        viewVillageModalOverlay.style.display = "none";
      }
    });
  
    function handleViewVillage(village) {
      // Populate modal with village data
      document.getElementById("view-village-name-detail").textContent = village.name;
      document.getElementById("view-village-region-detail").textContent = village.region;
      document.getElementById("view-village-area-detail").textContent = village.landArea;
      document.getElementById("view-village-latitude-detail").textContent = village.latitude;
      document.getElementById("view-village-longitude-detail").textContent = village.longitude;
      document.getElementById("view-village-tags-detail").textContent =
        village.categories.join(", ");
      document.getElementById("view-village-image-detail").src = village.image;
  
      // Show the modal
      viewVillageModalOverlay.style.display = "flex";
    }

  // Update Village Modal
  const updateVillageModal = document.getElementById("update-village-modal");
  const updateCloseModalBtn = document.getElementById("update-close-modal");
  const updateVillageBtn = document.getElementById("update-village");


  const updateVillademogeModal = document.getElementById("update-demographic-modal");
  const updateClosedemoModalBtn = document.getElementById("close-demographic-modal");
  const updateVillagedemoBtn = document.getElementById("save-demographic-data");


  let selectedVillageIndex = null; // To track the index of the selected village

  // Open the Update Modal with Pre-filled Data
  function handleUpdateVillage(village, index) {
    selectedVillageIndex = index; // Store the index of the village to update
    document.getElementById("update-village-name").value = village.name;
    document.getElementById("update-region-district").value = village.region;
    document.getElementById("update-land-area").value = village.landArea;
    document.getElementById("update-latitude").value = village.latitude;
    document.getElementById("update-longitude").value = village.longitude;

    updateVillageModal.style.display = "flex";
  }




  function handleUpdatedemoVillage(village, index) {
    selectedVillageIndex = index; // Store the index of the village to update
    document.getElementById("population-size").value = village.populationsize;
    document.getElementById("age-distribution").value = village.agedist;
    document.getElementById("gender-ratio").value = village.genderratio;
    document.getElementById("population-growth-rate").value = village.populationgrowthrate;
   

    updateVillademogeModal.style.display = "flex";
  }

  // Close Update Modal
  updateCloseModalBtn.addEventListener("click", () => {
    updateVillageModal.style.display = "none";
  });


  updateClosedemoModalBtn.addEventListener("click", () => {
    updateVillademogeModal.style.display = "none";
  });

  // Save Updated Village Data
  updateVillageBtn.addEventListener("click", () => {
    if (selectedVillageIndex === null) return; // Ensure a village is selected

    const updatedVillage = {
      ...savedVillages[selectedVillageIndex],
      name: document.getElementById("update-village-name").value.trim(),
      region: document.getElementById("update-region-district").value.trim(),
      landArea: document.getElementById("update-land-area").value.trim(),
      latitude: parseFloat(document.getElementById("update-latitude").value.trim()),
      longitude: parseFloat(document.getElementById("update-longitude").value.trim()),
    };

    savedVillages[selectedVillageIndex] = updatedVillage; // Update the list
    localStorage.setItem("villageList", JSON.stringify(savedVillages));
    renderVillages(savedVillages);

    updateVillageModal.style.display = "none";
    selectedVillageIndex = null;
  });



  updateVillagedemoBtn.addEventListener("click", () => {
    if (selectedVillageIndex === null) return; // Ensure a village is selected
  
    // Update demographic fields with the correct property names
    const updatedVillage = {
      ...savedVillages[selectedVillageIndex],
      populationsize: parseFloat(document.getElementById("population-size").value.trim(), 10), // Use 'populationsize' as per the original object
      agedist: document.getElementById("age-distribution").value
        .split(",")
        .map((range) => range.trim()), // Store as an array of age groups
      genderratio: document.getElementById("gender-ratio").value
        .split(",")
        .map((ratio) => ratio.trim()), // Store as an array of gender ratios
      populationgrowthrate: parseFloat(
        document.getElementById("population-growth-rate").value.trim()
      ), // Parse growth rate as a number
    };
  
    // Update the saved and original list
    savedVillages[selectedVillageIndex] = updatedVillage;
    localStorage.setItem("villageList", JSON.stringify(savedVillages)); // Save to localStorage
    renderVillages(savedVillages); // Re-render the village list
  
    updateVillademogeModal.style.display = "none"; // Hide the modal
    selectedVillageIndex = null; // Reset the selection
  });
  







  
});
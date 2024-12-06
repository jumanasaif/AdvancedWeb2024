  // Initialize the map
  var map = L.map('map').setView([31.5, 34.5], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Add example markers
  L.marker([31.5, 34.5]).addTo(map).bindPopup('Location 1').openPopup();
  L.marker([31.6, 34.6]).addTo(map).bindPopup('Location 2');
  L.marker([31.4, 34.4]).addTo(map).bindPopup('Location 3');

  // Retrieve village data from localStorage and update the count
  const villageList = JSON.parse(localStorage.getItem("villageList")) || [];
  const totalVillagesElement = document.getElementById("total-villages");
  totalVillagesElement.textContent = villageList.length;
  


  // Age Distribution Chart
 
const ageCtx = document.getElementById('ageChart').getContext('2d');
new Chart(ageCtx, {
type: 'pie',
data: {
  labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
  datasets: [{
    data: [25, 30, 20, 15, 10], // Update this data if required
    backgroundColor: ['#a64d79', '#4a90e2', '#d3a964', '#52b7b7', '#9370db'] // Adjusted colors
  }]
},
options: {
  plugins: {
    title: {
      display: true,
      text: 'Age Distribution',
      color: '#fff',
      font: {
        size: 16
      }
    },
    legend: {
      position: 'top',
      labels: {
        color: '#fff'
      }
    }
  }
}
});

// Gender Ratios Chart
const genderCtx = document.getElementById('genderChart').getContext('2d');
new Chart(genderCtx, {
type: 'pie',
data: {
  labels: ['Male', 'Female'],
  datasets: [{
    data: [55, 45], // Update this data if required
    backgroundColor: ['#4a90e2', '#a64d79'] // Adjusted colors
  }]
},
options: {
  plugins: {
    title: {
      display: true,
      text: 'Gender Ratios',
      color: '#fff',
      font: {
        size: 16
      }
    },
    legend: {
      position: 'top',
      labels: {
        color: '#fff'
      }
    }
  }
}
});

 // Population Chart
 const populationCtx = document.getElementById('populationChart').getContext('2d');
new Chart(populationCtx, {
  type: 'bar',
  data: {
    labels: ['Jabalia', 'Beit Lahia', 'Quds', 'Shejaiya', 'Hebron', 'Nablus', 'Ramallah', 'Beit Jala'], // City names
    datasets: [{
      label: 'Population',
      data: [50000, 30000, 20000, 40000, 150000, 250000, 100000, 15000], // Population data
      backgroundColor: 'rgba(52, 152, 219, 0.5)', // Bar color with transparency
      borderColor: '#3498db', // Border color
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Population Distribution for each City',
        color: '#fff',
        font: {
          size: 16
        }
      },
      legend: {
        display: false // Hide legend since only one dataset
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Population: ${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#fff'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#fff',
          callback: function(value) {
            return value.toLocaleString(); // Add commas to numbers
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Light gridlines
        }
      }
    }
  }
});
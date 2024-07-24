// item.js

// Import the data (if you're using modules, adjust accordingly)
const items = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 2" },
    { id: 4, title: "Item 4", description: "Description for Item 2" },
    { id: 5, title: "Item 5", description: "Description for Item 2" },
    { id: 6, title: "Item 6", description: "Description for Item 2" },
    { id: 7, title: "Item 7", description: "Description for Item 2" },
    { id: 8, title: "Item 8", description: "Description for Item 2" },
    { id: 9, title: "Item 9", description: "Description for Item 2" },
    // Add more items as needed
  ];
  
  // Function to get URL parameters
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Function to load item data
  function loadItemData() {
    const itemId = getUrlParameter('id');
    const item = items.find(i => i.id == itemId);
  
    if (item) {
      document.querySelector('.item-title').textContent = item.title;
      document.querySelector('.item-description').textContent = item.description;
    } else {
      document.querySelector('.item-title').textContent = 'Item not found';
      document.querySelector('.item-description').textContent = '';
    }
  }
  

  



  // Call the function to load item data
  window.onload = loadItemData;
  
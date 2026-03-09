const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

function performSearch(query) {
  const q = query.toLowerCase();
  
  return jsArrayData.filter(soyjak =>
    soyjak.toLowerCase().includes(q)
  );
}

function renderSearchResults(items) {
  searchResults.innerHTML = "";

  if (items.length === 0) {
    searchMessage.textContent = "No soyjaks found, loser >:] !";
    return;
  }

  searchMessage.textContent = `Congrats found ${items.length} soyjak(s)`;

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    searchResults.appendChild(li);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (!query) {
    searchMessage.textContent = "Please enter a search term";
    searchResults.innerHTML = "";
    return;
  }

  const results = performSearch(query);
  renderSearchResults(results);
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
// perform the actual lookup
function performSearch(query) {
  const q = query.toLowerCase();
  // require at least one character
  if (q.length === 0) {
    return [];
  }
  return jsArrayData.filter(soyjak =>
    soyjak.toLowerCase().includes(q)
  );
}

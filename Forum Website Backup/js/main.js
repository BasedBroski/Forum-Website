// Hamburger menu toggle functions
function showIconBar() {
  console.log('in show fn');
  const navigation = document.getElementById('navId');
  if (navigation) {
    console.log('showing navigation');
    navigation.classList.add('show');
  }
}

function hideIconBar() {
  console.log('in show fn  not');
  const navigation = document.getElementById('navId');
  if (navigation) {
    console.log('hiding navigation');
    navigation.classList.remove('show');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Handle search bar
  const searchButton = document.querySelector('.search-box button');
  if (searchButton) {
    searchButton.addEventListener('click', function (event) {
      event.preventDefault();
      const searchInput = document.querySelector('.search-box input');
      const searchQuery = searchInput?.value || '';
      console.log('Search for:', searchQuery);
      // TODO: Implement actual search functionality
      alert('Search for: ' + searchQuery);
    });
  }

  // Allow Enter key to search
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        const searchButton = document.querySelector('.search-box button');
        if (searchButton) {
          searchButton.click();
        }
      }
    });
  }

  // render profile page only when appropriate
  if (window.location.pathname.endsWith('profile.html')) {
    renderProfile();
  }
});



function renderProfile() {
  const stored = sessionStorage.getItem('profile');
  const profile = stored ? JSON.parse(stored) : {};
  const main = document.querySelector('main');
  if (!main) return;
  const pic = profile.pic || '';
  const name = profile.username || 'Anonymous';
  const desc = profile.desc || '';
  const twitterLink = profile.social && profile.social.twitter ? profile.social.twitter : '';
  const instaLink = profile.social && profile.social.instagram ? profile.social.instagram : '';

  main.innerHTML = `
    <div class="profile-card text-center">
      <img id="profilePicDisplay" src="${pic}" alt="Profile Picture" class="rounded-circle" style="width:150px;height:150px;" onerror="this.style.display='none'">
      <h2 id="profileName">${name}</h2>
      ${desc ? `<p id="profileDesc" class="mb-3">${desc}</p>` : ''}
      <div id="profileSocial">
        ${twitterLink ? `<p><a href="${twitterLink}" target="_blank">Twitter</a></p>` : ''}
        ${instaLink ? `<p><a href="${instaLink}" target="_blank">Instagram</a></p>` : ''}
      </div>
      <a href="profile-creator.html" class="btn btn-secondary">Edit Profile</a>
    </div>
  `;
}


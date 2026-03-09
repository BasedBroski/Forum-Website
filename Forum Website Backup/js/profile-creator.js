// profile-creator.js
// contains only the code required for the profile creation page (and its initialization)

if (window.location.pathname.endsWith('profile-creator.html')) {
  document.addEventListener('DOMContentLoaded', initProfileCreator);
}

function initProfileCreator() {
  const picInput = document.getElementById('profilePicInput');
  const picPreview = document.getElementById('profilePicPreview');
  const usernameInput = document.getElementById('profileUsername');
  const descInput = document.getElementById('profileDescription');
  const twitterInput = document.getElementById('socialTwitter');
  const instaInput = document.getElementById('socialInstagram');
  const saveBtn = document.getElementById('saveProfile');

  // load existing profile (or defaults from login)
  const stored = sessionStorage.getItem('profile');
  let profile = stored ? JSON.parse(stored) : {};
  if (!profile.username) {
    profile.username = sessionStorage.getItem('username') || '';
  }
  if (profile.username) {
    usernameInput.value = profile.username;
  }
  if (profile.desc) {
    descInput.value = profile.desc;
  }
  if (profile.pic) {
    picPreview.src = profile.pic;
  }
  if (profile.social) {
    twitterInput.value = profile.social.twitter || '';
    instaInput.value = profile.social.instagram || '';
  }

  picInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        picPreview.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  saveBtn.addEventListener('click', () => {
    profile = {
      username: usernameInput.value.trim(),
      desc: descInput.value.trim(),
      pic: picPreview.src || '',
      social: {
        twitter: twitterInput.value.trim(),
        instagram: instaInput.value.trim()
      }
    };
    sessionStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile saved');
    const dest = window.location.pathname.includes('/html/') ? 'profile.html' : 'html/profile.html';
    window.location.assign(dest);
  });
}

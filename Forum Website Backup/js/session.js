// session.js – shared session and authentication helpers

// check authentication flag stored in sessionStorage
function isAuthN() {
  return sessionStorage.getItem('isAuthN') === 'true';
}

// ensure toast container is present for feedback messages
function createToastContainer() {
  if (!document.getElementById('toast-container')) {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'position-fixed top-0 end-0 p-3';
    document.body.appendChild(div);
  }
}

function showLogoutToast() {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-success border-0 show';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        You have been logged out.
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// navigation helpers
function ensureAuthNav() {
  const navList = document.querySelector('.nav-list');
  if (!navList) return;

  // create login link if missing
  if (!document.getElementById('nav-login')) {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.id = 'nav-login';
    const loginHref = window.location.pathname.includes('/html/') ? 'login.html' : 'html/login.html';
    li.innerHTML = `<a class="nav-link" href="${loginHref}">Log In</a>`;
    navList.appendChild(li);
  }

  // create logout link
  if (!document.getElementById('nav-logout')) {
    const li = document.createElement('li');
    li.className = 'nav-item d-none';
    li.id = 'nav-logout';
    li.innerHTML = '<a class="nav-link" href="#" id="logout-link">Log Out</a>';
    navList.appendChild(li);
    li.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.clear();
      updateAuthUI();
      showLogoutToast();
    });
  }

  // create profile link
  if (!document.getElementById('nav-profile')) {
    const li = document.createElement('li');
    li.className = 'nav-item d-none';
    li.id = 'nav-profile';
    const profileHref = window.location.pathname.includes('/html/') ? 'profile.html' : 'html/profile.html';
    li.innerHTML = `<a class="nav-link" href="${profileHref}">Profile</a>`;
    navList.appendChild(li);
  }

  updateAuthUI();
}

function updateAuthUI() {
  const loggedIn = isAuthN();
  const loginLi = document.getElementById('nav-login');
  const logoutLi = document.getElementById('nav-logout');
  const profileLi = document.getElementById('nav-profile');
  const onLoginPage = window.location.pathname.endsWith('login.html');
  if (loginLi) loginLi.classList.toggle('d-none', loggedIn || onLoginPage);
  if (logoutLi) logoutLi.classList.toggle('d-none', !loggedIn);
  if (profileLi) profileLi.classList.toggle('d-none', !loggedIn);

  // right‑side summary
  if (loggedIn) {
    const name = sessionStorage.getItem('profile') ? JSON.parse(sessionStorage.getItem('profile')).username : (sessionStorage.getItem('username') || '');
    let rightUl = document.querySelector('.navbar-nav.right-items');
    if (!rightUl) {
      rightUl = document.createElement('ul');
      rightUl.className = 'navbar-nav ms-auto mb-2 mb-lg-0 right-items';
      const collapseDiv = document.querySelector('.navbar-collapse');
      if (collapseDiv) collapseDiv.appendChild(rightUl);
    }
    let profileLi = document.getElementById('nav-profile-summary');
    if (!profileLi) {
      profileLi = document.createElement('li');
      profileLi.id = 'nav-profile-summary';
      profileLi.className = 'nav-item d-flex align-items-center';
      rightUl.appendChild(profileLi);
    }
    const pic = sessionStorage.getItem('profile') ? JSON.parse(sessionStorage.getItem('profile')).pic : '';
    profileLi.innerHTML = `<a class="nav-link d-flex align-items-center" href="${window.location.pathname.includes('/html/') ? 'profile.html' : 'html/profile.html'}"><img src="${pic}" alt="pic" class="rounded-circle" style="width:24px;height:24px;${pic? '' : 'display:none;'}"> <span class="nav-username fw-bold fs-5 ms-1">${name}</span></a>`;
  }

  // hide sign-up when logged in
  const signupAnchor = document.querySelector('.nav-list a[href$="signup.html"]');
  if (signupAnchor && signupAnchor.parentElement) {
    signupAnchor.parentElement.classList.toggle('d-none', loggedIn);
  }

  // cleanup when logged out
  if (!loggedIn) {
    const summary = document.getElementById('nav-profile-summary');
    if (summary) summary.remove();
    const rightUl = document.querySelector('.navbar-nav.right-items');
    if (rightUl) rightUl.remove();
  }
}

// initialize on every page load
document.addEventListener('DOMContentLoaded', function () {
  createToastContainer();
  ensureAuthNav();
  updateAuthUI();
});

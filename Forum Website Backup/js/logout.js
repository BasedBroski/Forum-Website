// show login or logout btn, based on session state
// toast msg upon logout 

document.addEventListener('DOMContentLoaded', () => {

  const userGreeting = document.getElementById('userGreeting');
  const searchClass = document.getElementsByClassName('searchClass');
  userGreeting.textContent = '';

  const authStatus = isAuthN(); //resolve into boolean t/f  
  console.log('isAuthN?', authStatus);

  showSignInOut();

  // todo: refactor as f/n initSecretStuff. 
  if (authStatus === true) {
    userGreeting.textContent = `hello, ${sessionStorage.getItem('username')}`;

    Object.keys(searchClass).forEach(key => {
      searchClass[key].removeAttribute('disabled');
    });

    //load videos. 
    loadVideoContent();

  }


  document.getElementById('btnLogout').addEventListener('click', () => {
    showLogoutToast();
    sessionStorage.clear();
    console.log('isAuthN?', sessionStorage.getItem('isAuthN'));
    showSignInOut();
    userGreeting.textContent = '';

    Object.keys(searchClass).forEach(key => {
      searchClass[key].disabled = true;
      searchClass[key].value = '';
    });

    unloadVideoContent();
  });

});


function isAuthN() {
  return sessionStorage.getItem('isAuthN') === 'true';
}

function showSignInOut() {
  if (isAuthN()) {
    //show logout
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.classList.remove('d-none');

    //hide login
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.classList.add('d-none');
  }
  else if (!isAuthN()) {
    //hide logout
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.classList.add('d-none');

    //show login
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.classList.remove('d-none');
  }

}

// Show a Bootstrap 5 toast message for logout
function showLogoutToast() {
  // Create toast container if it doesn't exist
  const toastContainer = document.getElementById('toast-container');
  // Create toast element
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

  // Automatically remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}


// login.js - handles sign-in form submissions

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');
  if (!loginButton) return;

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();

    const username = document.getElementById('username')?.value.trim() || '';
    const password = document.getElementById('password')?.value || '';

    console.log('login attempt', username, password);

    // simple static password for demo
    if (password === 'soy' && username !== '') {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('isAuthN', 'true');
      console.log('authenticated', username);
      window.location.assign('../index.html');
    } else {
      sessionStorage.setItem('isAuthN', 'false');
      alert('Invalid username or password');
    }
  });
});



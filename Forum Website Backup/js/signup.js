// Handle signup form submission
document.addEventListener('DOMContentLoaded', function() {
  // Get the form
  const form = document.querySelector('form');

  if (!form) return;

  // Listen for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Basic validation
    if (!username || !password || !email) {
      alert('Please fill in all fields.');
      return;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Username already exists. Please choose a different one.');
      return;
    }

    // Create new user object
    const newUser = {
      username: username,
      password: password, // Note: In a real app, never store plain passwords!
      email: email
    };

    // Add to users array
    users.push(newUser);

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Success message
    alert('Sign up successful! You can now log in.');

    // Optionally, redirect to login page or clear form
    form.reset();
  });
});

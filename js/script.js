document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  fetch('register.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  })
  .then(res => res.text())
  .then(data => {
    const trimmedData = data.trim();
    alert(trimmedData); // Show popup
    if (trimmedData.toLowerCase().includes("success")) {
      // Redirect to login.html after successful registration
      window.location.href = "login.html";
    }
  })
  .catch(err => console.error('Register Error:', err));
});

 

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  fetch('login.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  })
  .then(res => res.text())
  .then(data => {
    const trimmedData = data.trim(); // Remove extra whitespace
    alert(trimmedData);              // Show the server response
    if (trimmedData.startsWith("Login successful")) {
      // Redirect to home.html after login success
      window.location.href = "home.html";
    }
  })
  .catch(err => console.error('Login Error:', err));
});



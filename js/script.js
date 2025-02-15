// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    alert(`Login Attempt:\nEmail: ${email}\nPassword: ${password}`);
    // Add your login logic here
  });
  
  // Registration Form Submission
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    alert(`Registration Attempt:\nName: ${name}\nEmail: ${email}\nPassword: ${password}`);
    // Add your registration logic here
  });
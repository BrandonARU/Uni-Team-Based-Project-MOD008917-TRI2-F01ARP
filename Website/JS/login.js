 function togglePassword() {
  const input = document.getElementById('loginPassword');
  const btn   = document.getElementById('loginToggleBtn');
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.textContent = isHidden ? 'Hide' : 'Show';
}

function handleLogin() {
  const email    = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  const emailErr = document.getElementById('loginEmailError');
  const passErr  = document.getElementById('loginPasswordError');

  let valid = true;

 
  emailErr.textContent = '';
  passErr.textContent  = '';
  email.classList.remove('error');
  password.classList.remove('error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailErr.textContent = 'Email is required.';
    email.classList.add('error');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    emailErr.textContent = 'Please enter a valid email.';
    email.classList.add('error');
    valid = false;
  }

  if (!password.value) {
    passErr.textContent = 'Password is required.';
    password.classList.add('error');
    valid = false;
  } else if (password.value.length < 6) {
    passErr.textContent = 'Password must be at least 6 characters.';
    password.classList.add('error');
    valid = false;
  }

  if (valid) {
    alert('Logging in...');
  }
}
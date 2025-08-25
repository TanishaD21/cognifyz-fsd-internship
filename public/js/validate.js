document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return; // Exit if not on contact page

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");
  const passwordEl = document.getElementById("password");
  const confirmPwdEl = document.getElementById("confirmPassword");

  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // 🔹 Password strength checker
  passwordEl.addEventListener("input", () => {
    const value = passwordEl.value;
    let strength = 0;

    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[@$!%*?&]/.test(value)) strength++;

    if (strength <= 2) {
      strengthBar.style.width = "33%";
      strengthBar.style.background = "red";
      strengthText.textContent = "Weak 🔴";
      strengthText.style.color = "red";
    } else if (strength <= 4) {
      strengthBar.style.width = "66%";
      strengthBar.style.background = "orange";
      strengthText.textContent = "Medium 🟠";
      strengthText.style.color = "orange";
    } else {
      strengthBar.style.width = "100%";
      strengthBar.style.background = "green";
      strengthText.textContent = "Strong 🟢";
      strengthText.style.color = "green";
    }
  });

  // 🔹 Form submit validation
  form.addEventListener("submit", (e) => {
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();
    const subject = subjectEl.value;
    const message = messageEl.value.trim();
    const pwd = passwordEl.value;
    const confirmPwd = confirmPwdEl.value;

    if (name.length < 3) {
      alert("Name must be at least 3 characters long.");
      e.preventDefault();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      e.preventDefault();
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits.");
      e.preventDefault();
      return;
    }

    if (!subject) {
      alert("Please select a subject.");
      e.preventDefault();
      return;
    }

    if (message.length < 10) {
      alert("Message must be at least 10 characters long.");
      e.preventDefault();
      return;
    }

    if (pwd !== confirmPwd) {
      alert("Passwords do not match!");
      e.preventDefault();
      return;
    }

    const strongPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!strongPwd.test(pwd)) {
      alert("Password must be 8+ chars with uppercase, lowercase, number, special char.");
      e.preventDefault();
      return;
    }
  });
});

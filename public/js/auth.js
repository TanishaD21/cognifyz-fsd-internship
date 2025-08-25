const authUrl = "/api/auth";

// ✅ Show feedback message
function showMessage(type, text) {
  const box = document.getElementById("messageBox");
  if (!box) return;

  box.style.display = "block";
  box.className = `alert alert-${type}`;
  box.textContent = text;

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

// 📌 Register
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("regName")?.value || "";
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      const res = await fetch(`${authUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showMessage("success", "✅ Registered successfully! You can now login.");
        regForm.reset();
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        showMessage("danger", "❌ " + (data.error || "Registration failed"));
      }
    } catch (err) {
      console.error(err);
      showMessage("danger", "Server error during registration");
    }
  });
}

// 📌 Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${authUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        // Save JWT in localStorage
        localStorage.setItem("token", data.token);

        showMessage("success", "✅ Login successful!");
        setTimeout(() => {
          window.location.href = "/items"; // redirect after login
        }, 1000);
      } else {
        showMessage("danger", "❌ " + (data.error || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      showMessage("danger", "Server error during login");
    }
  });
}

// 📌 Logout (called from navbar button)
function logout() {
  localStorage.removeItem("token");
  showMessage("success", "👋 Logged out successfully!");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
}

// 📌 Auto-attach JWT to fetch (global wrapper)
async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}

// Expose globally so api.js can use authFetch
window.authFetch = authFetch;
window.logout = logout;

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Intercept clicks on SPA links
  document.querySelectorAll(".spa-link").forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");
      navigateTo(url);
    });
  });

  // Handle navigation
  async function navigateTo(url) {
    try {
      const res = await fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } });
      const html = await res.text();

      // Replace only the body content (not layout)
      app.innerHTML = html;

      // Push state to history
      window.history.pushState({ url }, "", url);
    } catch (err) {
      console.error("Navigation error:", err);
    }
  }

  // Handle back/forward buttons
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.url) {
      navigateTo(e.state.url);
    }
  });
});

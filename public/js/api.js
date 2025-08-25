const apiUrl = "/api/items";

// 🔒 Helper: Get headers with JWT token
function getAuthHeaders() {
  const token = localStorage.getItem("token"); // token stored after login
  if (!token) {
    // No token → redirect to login
    window.location.href = "/login";
    return {};
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

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

// 🔧 Handle common API errors
async function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem("token"); // invalid token → clear
    showMessage("danger", "❌ Unauthorized! Please log in again.");
    setTimeout(() => (window.location.href = "/login"), 1500);
    return null;
  }
  return res.json();
}

// 📌 Fetch & return all items
async function fetchItems() {
  try {
    const res = await fetch(apiUrl, { headers: getAuthHeaders() });
    const data = await handleResponse(res);
    return data?.data || [];
  } catch (err) {
    console.error("❌ Fetch error:", err);
    showMessage("danger", "Server error while fetching items");
    return [];
  }
}

// 📌 Render items on UI
async function loadItems() {
  const items = await fetchItems();
  const list = document.getElementById("items-list");

  if (!list) return;
  if (items.length === 0) {
    list.innerHTML = `<li class="list-group-item text-muted">No items found</li>`;
    return;
  }

  list.innerHTML = items
    .map(
      (item) => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>${item.name}</strong> - ₹${item.price}
        <br/>
        <small>${item.description || "No description"}</small>
        <br/>
        <span style="color:${item.inStock ? "green" : "red"}">
          ${item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div>
        <button class="btn btn-warning btn-sm" 
          onclick="showEditForm('${item._id}', '${item.name}', '${item.description || ""}', '${item.price}', ${item.inStock})">
          Edit
        </button>
        <button class="btn btn-danger btn-sm" onclick="handleDelete('${item._id}')">
          Delete
        </button>
      </div>
    </li>`
    )
    .join("");
}

// 📌 Add new item
async function addItem(e) {
  e.preventDefault();

  const form = e.target;
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = document.getElementById("price").value;
  const inStock = document.getElementById("inStock").checked;

  if (!name || !price) {
    showMessage("warning", "⚠️ Name and Price are required!");
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, description, price, inStock }),
    });

    const result = await handleResponse(res);
    if (result?.success) {
      form.reset();
      loadItems();
      showMessage("success", "✅ Item added successfully!");
    }
  } catch (err) {
    console.error(err);
    showMessage("danger", "Server error while adding item");
  }
}

// 📌 Delete item
async function handleDelete(id) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const result = await handleResponse(res);
    if (result?.success) {
      loadItems();
      showMessage("success", "🗑️ Item deleted successfully!");
    }
  } catch (err) {
    console.error(err);
    showMessage("danger", "Server error while deleting item");
  }
}

// 📌 Show update form
function showEditForm(id, name, description, price, inStock) {
  const newName = prompt("Enter new name:", name);
  if (!newName) return;

  const newDescription = prompt("Enter new description:", description);
  const newPrice = prompt("Enter new price:", price);
  if (!newPrice) return;

  const newStock = confirm("Should item be In Stock? (OK = Yes, Cancel = No)");

  handleUpdate(id, {
    name: newName,
    description: newDescription,
    price: newPrice,
    inStock: newStock,
  });
}

// 📌 Update item
async function handleUpdate(id, updates) {
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });

    const result = await handleResponse(res);
    if (result?.success) {
      loadItems();
      showMessage("success", "✏️ Item updated successfully!");
    }
  } catch (err) {
    console.error(err);
    showMessage("danger", "Server error while updating item");
  }
}

// 🚀 Load items when page loads
window.addEventListener("DOMContentLoaded", loadItems);

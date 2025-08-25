const apiUrl = "/api/items";

// Show feedback message
function showMessage(type, text) {
  const box = document.getElementById("messageBox");
  box.style.display = "block";
  box.className = `alert alert-${type}`;
  box.textContent = text;

  // Auto-hide after 3 seconds
  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}

// Fetch & return all items
async function fetchItems() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data.data;
}

// Render items on UI
async function loadItems() {
  const items = await fetchItems();
  const list = document.getElementById("items-list");

  list.innerHTML = items.map(item => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>${item.name}</strong> - ₹${item.price}
        <br/>
        <small>${item.description || "No description"}</small>
        <br/>
        <span style="color:${item.inStock ? 'green' : 'red'}">
          ${item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div>
        <button class="btn btn-warning btn-sm" onclick="showEditForm('${item._id}', '${item.name}', '${item.description || ''}', '${item.price}', ${item.inStock})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="handleDelete('${item._id}')">Delete</button>
      </div>
    </li>
  `).join('');
}

// Add new item
async function addItem(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const inStock = document.getElementById("inStock").checked;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, inStock }),
  });

  const result = await res.json();
  if (result.success) {
    document.getElementById("item-form").reset();
    loadItems();
    showMessage("success", "✅ Item added successfully!");
  } else {
    showMessage("danger", "❌ " + result.error);
  }
}

// Delete item
async function handleDelete(id) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  const result = await res.json();
  if (result.success) {
    loadItems();
    showMessage("success", "🗑️ Item deleted successfully!");
  } else {
    showMessage("danger", "❌ " + result.error);
  }
}

// Show update form
function showEditForm(id, name, description, price, inStock) {
  const newName = prompt("Enter new name:", name);
  const newDescription = prompt("Enter new description:", description);
  const newPrice = prompt("Enter new price:", price);
  const newStock = confirm("Should item be In Stock? (OK = Yes, Cancel = No)");

  if (newName && newPrice) {
    handleUpdate(id, {
      name: newName,
      description: newDescription,
      price: newPrice,
      inStock: newStock,
    });
  }
}

// Update item
async function handleUpdate(id, updates) {
  const res = await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const result = await res.json();
  if (result.success) {
    loadItems();
    showMessage("success", "✏️ Item updated successfully!");
  } else {
    showMessage("danger", "❌ " + result.error);
  }
}

// Load items when page loads
window.onload = loadItems;

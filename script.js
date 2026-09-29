// Eingabefelder
const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");
const unitInput = document.getElementById("unitInput");

// Button
const addBtn = document.getElementById("addBtn");

// Tabelle
const shoppingTable = document.getElementById("shoppingTable").querySelector("tbody");

// Lokale Datenbank (LocalStorage)
let items = JSON.parse(localStorage.getItem("items") || "[]");

// Seite laden → Tabelle anzeigen
renderTable();

// Hinzufügen
addBtn.addEventListener("click", addItem);

function addItem() {
  const item = itemInput.value.trim();
  const amount = amountInput.value.trim();
  const unit = unitInput.value;

  if (item === "" || amount === "") return;

  const newItem = {
    id: crypto.randomUUID(),
    item,
    amount,
    unit,
    createdAt: Date.now(),
    deletedAt: null,
    status: "offen"
  };

  items.push(newItem);
  save();
  renderTable();

  itemInput.value = "";
  amountInput.value = "";
}

// Tabelle anzeigen
function renderTable() {
  shoppingTable.innerHTML = "";

  items
    .filter(i => i.status === "offen")
    .forEach(i => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${i.item}</td>
        <td>${i.amount} ${i.unit}</td>
        <td><button class="deleteBtn">❌</button></td>
      `;

      row.querySelector(".deleteBtn").addEventListener("click", () => deleteItem(i.id));

      shoppingTable.appendChild(row);
    });
}

// Löschen = gekauft
function deleteItem(id) {
  const item = items.find(i => i.id === id);
  item.status = "gekauft";
  item.deletedAt = Date.now();
  save();
  renderTable();
}

// Speichern
function save() {
  localStorage.setItem("items", JSON.stringify(items));
}

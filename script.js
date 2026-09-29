// Eingabefelder
const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");

// Button
const addBtn = document.getElementById("addBtn");

// Tabelle
const shoppingTable = document.getElementById("shoppingTable").querySelector("tbody");

// Lokale Datenbank (LocalStorage)
let items = JSON.parse(localStorage.getItem("items") || "[]");

// Beim Laden der Seite alles anzeigen
renderTable();

// Hinzufügen-Button aktivieren
addBtn.addEventListener("click", addItem);

// Funktion: Eintrag hinzufügen
function addItem() {
  const item = itemInput.value.trim();
  const amount = amountInput.value.trim();

  if (item === "" || amount === "") return;

  const newItem = {
    id: crypto.randomUUID(),
    item,
    amount,
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

// Funktion: Tabelle neu rendern
function renderTable() {
  shoppingTable.innerHTML = "";

  items
    .filter(i => i.status === "offen")
    .forEach(i => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${i.item}</td>
        <td>${i.amount}</td>
        <td><button class="deleteBtn">❌</button></td>
      `;

      row.querySelector(".deleteBtn").addEventListener("click", () => deleteItem(i.id));

      shoppingTable.appendChild(row);
    });
}

// Funktion: Artikel löschen
function deleteItem(id) {
  const item = items.find(i => i.id === id);
  item.status = "gelöscht";
  item.deletedAt = Date.now();
  save();
  renderTable();
}

// Speichern in LocalStorage
function save() {
  localStorage.setItem("items", JSON.stringify(items));
}

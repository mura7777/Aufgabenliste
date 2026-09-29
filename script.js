// Eingabefelder
const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");

// Button
const addBtn = document.getElementById("addBtn");

// Tabelle
const shoppingTable = document.getElementById("shoppingTable").querySelector("tbody");

// Hinzufügen-Button aktivieren
addBtn.addEventListener("click", addItem);

// Funktion: Eintrag hinzufügen
function addItem() {
  const item = itemInput.value.trim();
  const amount = amountInput.value.trim();

  if (item === "" || amount === "") return;

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${item}</td>
    <td>${amount}</td>
    <td><button class="deleteBtn">❌</button></td>
  `;

  row.querySelector(".deleteBtn").addEventListener("click", () => row.remove());

  shoppingTable.appendChild(row);

  itemInput.value = "";
  amountInput.value = "";
}

// Filter nach Einkaufsdatum
const filterDate = document.getElementById("filterDate");

filterDate.addEventListener("change", () => {
  const selected = filterDate.value;
  const rows = document.querySelectorAll("#shoppingTable tbody tr");

  rows.forEach(row => {
    // Du kannst später hier Datum-Logik einbauen,
    // aktuell filtert es nichts, weil Items kein Datum haben.
    row.style.display = "";
  });
});

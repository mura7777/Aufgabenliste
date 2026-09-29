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
  const date = dateInput.value;

  if (item === "" || amount === "" || date === "") return;

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${item}</td>
    <td>${amount}</td>
    <td>${date}</td>
    <td><button class="deleteBtn">❌</button></td>
  `;

  row.querySelector(".deleteBtn").addEventListener("click", () => row.remove());

  shoppingTable.appendChild(row);

  itemInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

// Filter nach Datum
const filterDate = document.getElementById("filterDate");

filterDate.addEventListener("change", () => {
  const selected = filterDate.value;
  const rows = document.querySelectorAll("#shoppingTable tbody tr");

  rows.forEach(row => {
    const rowDate = row.children[2].textContent;
    row.style.display = rowDate === selected ? "" : "none";
  });
});

// Eingabefelder
const itemInput = document.getElementById("itemInput");
const amountInput = document.getElementById("amountInput");
const unitInput = document.getElementById("unitInput");

// Button
const addBtn = document.getElementById("addBtn");

// Tabelle
const shoppingTable = document.getElementById("shoppingTable").querySelector("tbody");

// Lokale Datenbank
let items = JSON.parse(localStorage.getItem("items") || "[]");

// Seite laden
renderTable();
updateAIBubble();

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
  updateAIBubble();

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
  updateAIBubble();
}

// Speichern
function save() {
  localStorage.setItem("items", JSON.stringify(items));
}

// KI-Bubble
function updateAIBubble() {
  const bubble = document.getElementById("aiBubble");

  const total = items.length;
  const bought = items.filter(i => i.status === "gekauft").length;
  const open = items.filter(i => i.status === "offen").length;

  bubble.textContent =
    `👋 Hey! Ich habe deine Liste analysiert.  
    Insgesamt verwaltest du ${total} Artikel.  
    ${open} sind noch offen, ${bought} wurden bereits gekauft.  
    Ich kann dir später eine Monatsanalyse erstellen!`;
}

// Burger-Menü
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden");
});

function renderArchive() {
  const archiveTable = document.getElementById("archiveTable").querySelector("tbody");
  archiveTable.innerHTML = "";

  items
    .filter(i => i.status === "gekauft")
    .forEach(i => {
      const row = document.createElement("tr");

      const date = new Date(i.deletedAt).toLocaleDateString("de-DE");

      row.innerHTML = `
        <td>${i.item}</td>
        <td>${i.amount} ${i.unit}</td>
        <td>${date}</td>
      `;

      archiveTable.appendChild(row);
    });
}
function renderAnalyse() {
  const analyse = document.getElementById("analyseContent");

  const total = items.length;
  const bought = items.filter(i => i.status === "gekauft").length;
  const open = items.filter(i => i.status === "offen").length;

  const perMonth = {};
  items.forEach(i => {
    const month = new Date(i.createdAt).toLocaleString("de-DE", { month: "long", year: "numeric" });
    perMonth[month] = (perMonth[month] || 0) + 1;
  });

  let monthStats = "";
  for (const m in perMonth) {
    monthStats += `<li>${m}: ${perMonth[m]} Artikel</li>`;
  }

  analyse.innerHTML = `
    <p><strong>Gesamt:</strong> ${total} Artikel</p>
    <p><strong>Offen:</strong> ${open}</p>
    <p><strong>Gekauft:</strong> ${bought}</p>

    <h3>📅 Artikel pro Monat</h3>
    <ul>${monthStats}</ul>
  `;
}
/*Menü‑Steuerung*/

document.getElementById("navAnalyse").addEventListener("click", () => {
  hideAllPanels();
  document.getElementById("analysePanel").classList.remove("hidden");
  renderAnalyse();
});
/*Panels sauber ein‑/ausblenden*/
const month = new Date(i.createdAt).toLocaleString("de-DE", { month: "long", year: "numeric" });
perMonth[month] = (perMonth[month] || 0) + 1;

document.getElementById("navHome").addEventListener("click", () => {
  hideAllPanels();
});
function hideAllPanels() {
  document.getElementById("archivePanel").classList.add("hidden");
  document.getElementById("analysePanel").classList.add("hidden");
}

// Menü-Klicks
document.getElementById("navHome").addEventListener("click", () => {
  hideAllPanels();
});

document.getElementById("navArchive").addEventListener("click", () => {
  hideAllPanels();
  document.getElementById("archivePanel").classList.remove("hidden");
  renderArchive();
});

document.getElementById("navAnalyse").addEventListener("click", () => {
  hideAllPanels();
  document.getElementById("analysePanel").classList.remove("hidden");
  renderAnalyse();
});

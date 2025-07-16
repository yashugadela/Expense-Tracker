let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

function addExpense() {
  const name = document.getElementById("name").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!name || !amount || !category || !date) {
    alert("Please fill in all fields.");
    return;
  }

  if (editId !== null) {
    expenses[editId] = { name, amount, category, date };
    editId = null;
    document.getElementById("addBtn").innerText = "Add Expense";
  } else {
    expenses.push({ name, amount, category, date });
  }

  saveAndRender();
  resetForm();
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("date").value = "";
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  const table = document.getElementById("expenseTable");
  const filter = document.getElementById("filterCategory").value;
  table.innerHTML = "";

  let total = 0;

  expenses.forEach((exp, index) => {
    if (filter !== "All" && exp.category !== filter) return;

    const row = table.insertRow();
    row.innerHTML = `
      <td>${exp.name}</td>
      <td>₹${exp.amount.toFixed(2)}</td>
      <td>${exp.category}</td>
      <td>${exp.date}</td>
      <td>
        <button class="edit" onclick="editExpense(${index})">Edit</button>
        <button class="delete" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    total += exp.amount;
  });

  document.getElementById("totalAmount").innerText = total.toFixed(2);
}

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById("name").value = exp.name;
  document.getElementById("amount").value = exp.amount;
  document.getElementById("category").value = exp.category;
  document.getElementById("date").value = exp.date;
  editId = index;
  document.getElementById("addBtn").innerText = "Update Expense";
}

function deleteExpense(index) {
  // No popup confirmation; directly delete
  expenses.splice(index, 1);
  saveAndRender();
}

renderExpenses();

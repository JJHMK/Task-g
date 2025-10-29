document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const timestampInput = document.getElementById("timestamp");
  const tableBody = document.getElementById("dataTableBody");

  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    birth: document.getElementById("birthError"),
    terms: document.getElementById("termsError")
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    // Fill timestamp automatically
    const now = new Date();
    timestampInput.value = now.toLocaleString();

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birthdate = form.birthdate.value;
    const termsChecked = form.terms.checked;

    let valid = true;

    // --- Custom validation rules ---
    // Full name: at least 2 words, each ≥ 2 characters
    const nameParts = fullname.split(" ").filter(p => p.length > 0);
    if (nameParts.length < 2 || nameParts.some(p => p.length < 2)) {
      showError("name", "Please enter your full name (first and last).");
      valid = false;
    }

    // Email: must include "@" and "."
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }

    // Phone: Finnish pattern +358 followed by 7–12 digits
    if (!/^\+358\d{7,12}$/.test(phone)) {
      showError("phone", "Phone must start with +358 and contain 7–12 digits.");
      valid = false;
    }

    // Birth date: not in the future, must be at least 13 years old
    if (!birthdate) {
      showError("birth", "Please enter your birth date.");
      valid = false;
    } else {
      const birth = new Date(birthdate);
      const today = new Date();
      const age = today.getFullYear() - birth.getFullYear();
      if (birth > today) {
        showError("birth", "Birth date cannot be in the future.");
        valid = false;
      } else if (age < 13) {
        showError("birth", "You must be at least 13 years old.");
        valid = false;
      }
    }

    // Terms must be accepted
    if (!termsChecked) {
      showError("terms", "You must accept the terms before submitting.");
      valid = false;
    }

    // --- If all valid, append to table ---
    if (valid) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${timestampInput.value}</td>
        <td>${fullname}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${birthdate}</td>
      `;
      tableBody.appendChild(row);
      form.reset();
    }
  });

  function showError(field, message) {
    errors[field].textContent = message;
  }

  function clearErrors() {
    Object.values(errors).forEach(e => e.textContent = "");
  }
});

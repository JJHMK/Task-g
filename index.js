document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  const clearBtn = document.getElementById('clearBtn');
  const tableBody = document.getElementById('tableBody');
  const errorBox = document.getElementById('errorMsg');
  
  // Inputs
  const timestampInput = document.getElementById('timestamp');
  const nameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const dobInput = document.getElementById('birthdate');
  const termsInput = document.getElementById('terms');

  // Helper: Set current timestamp
  const setTimestamp = () => {
    const now = new Date();
    // Format: YYYY-MM-DD HH:MM:SS
    timestampInput.value = now.toLocaleString('fi-FI');
  };

  // Set timestamp initially on load
  setTimestamp();

  submitBtn.addEventListener('click', () => {
    // Reset errors
    errorBox.style.display = 'none';
    errorBox.innerHTML = '';
    let errors = [];

    // Get values
    const timestamp = timestampInput.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const dob = dobInput.value;
    const terms = termsInput.checked;

    // --- Validation Logic ---

    // 1. Name validation
    if (name.length < 2) {
      errors.push("Name must be at least 2 characters long.");
    }

    // 2. Email validation (Simple Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }

    // 3. Phone validation (Only numbers, spaces, +, - allowed)
    const phoneRegex = /^[0-9\s\-\+]{5,}$/;
    if (!phoneRegex.test(phone)) {
      errors.push("Phone number allows only digits, spaces, '-' or '+' and must be valid.");
    }

    // 4. Date validation
    if (!dob) {
      errors.push("Please select your birth date.");
    } else {
        // Optional: Check if date is in the future
        if (new Date(dob) > new Date()) {
            errors.push("Birth date cannot be in the future.");
        }
    }

    // 5. Terms validation
    if (!terms) {
      errors.push("You must accept the terms and conditions.");
    }

    // --- Check for errors ---
    if (errors.length > 0) {
      errorBox.innerHTML = errors.join('<br>');
      errorBox.style.display = 'block';
      return; // Stop execution here
    }

    // --- Success: Add Row to Table ---
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${dob}</td>
    `;
    tableBody.appendChild(row);

    // --- Cleanup ---
    // Clear form inputs
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    dobInput.value = '';
    termsInput.checked = false;
    
    // Update timestamp for the next entry
    setTimestamp();
  });

  clearBtn.addEventListener('click', () => {
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    dobInput.value = '';
    termsInput.checked = false;
    errorBox.style.display = 'none';
    setTimestamp();
  });
});
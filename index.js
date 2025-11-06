document.addEventListener('DOMContentLoaded', () => {
  const addRowBtn = document.getElementById('addRow');
  const clearBtn = document.getElementById('clear');
  const tableBody = document.getElementById('tableBody');
  const nameInput = document.getElementById('name');
  const groupInput = document.getElementById('group');
  const courseInput = document.getElementById('course');
  const tueCheckbox = document.getElementById('tue');
  const thuCheckbox = document.getElementById('thu');
  const errorMsg = document.getElementById('errorMsg');

  addRowBtn.addEventListener('click', () => {
    errorMsg.textContent = '';

    const name = nameInput.value.trim();
    const group = groupInput.value.trim();
    const course = courseInput.value.trim();
    const tue = tueCheckbox.checked ? '✅' : '❌';
    const fri = thuCheckbox.checked ? '✅' : '❌';

    // Validation
    if (!name) {
      errorMsg.textContent = 'Please enter your name.';
      return;
    }
    if (!group) {
      errorMsg.textContent = 'Please enter your group number.';
      return;
    }
    if (!course || course.length < 3) {
      errorMsg.textContent = 'Course name must be at least 3 characters long.';
      return;
    }
    if (!tueCheckbox.checked && !thuCheckbox.checked) {
      errorMsg.textContent = 'Please select at least one day.';
      return;
    }

    // Add row
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course}</td>
      <td>${tue}</td>
      <td>${fri}</td>
    `;
    tableBody.appendChild(row);

    // Clear course & checkboxes
    courseInput.value = '';
    tueCheckbox.checked = false;
    thuCheckbox.checked = false;
  });

  clearBtn.addEventListener('click', () => {
    courseInput.value = '';
    tueCheckbox.checked = false;
    thuCheckbox.checked = false;
    errorMsg.textContent = '';
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const attackSection = document.getElementById('attack-section');
    const addAttackButton = document.getElementById('add-attack');

    // Function to add new attack row
    addAttackButton.addEventListener('click', function() {
        const newAttackRow = document.createElement('div');
        newAttackRow.classList.add('attack-row');
        newAttackRow.innerHTML = `
            <div class="row">
                <div class="col">
                    <input type="text" placeholder="name" class  id="attack-name" name="attack-name[]">
                </div>
                <div class="col">
                    <input type="number" placeholder="bonus" id="atk-bonus" name="atk-bonus[]">
                </div>
                <div class="col">
                    <input type="text" placeholder="damage/type" id="damage-type" name="damage-type[]">
                </div>
                <button type="button" class="remove-attack">  -  </button>
            </div>
        `;
        attackSection.appendChild(newAttackRow);

        // Add event listener to remove button
        newAttackRow.querySelector('.remove-attack').addEventListener('click', function() {
            newAttackRow.remove();
        });
    });

    // Event listener to remove the initial attack row if remove button is clicked
    document.querySelectorAll('.remove-attack').forEach(button => {
        button.addEventListener('click', function() {
            button.parentElement.parentElement.remove();
        });
    });

    // Wrapper for dynamic rows
    const rowsWrapper = document.getElementById('rowsWrapper');
    const addButton = document.getElementById('addButton');

    // Function to create a new dynamic row (RRow)
    function createNewRow() {
        const RRow = document.createElement('div');
        RRow.className = 'rrow';  // Updated class name

        // Create text field
        const textField = document.createElement('input');
        textField.type = 'text';
        textField.className = 'textField';
        textField.placeholder = 'Resource name. . .';
        RRow.appendChild(textField);

        // Create checkbox container
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';

        // Create 10 checkboxes
        for (let i = 1; i <= 10; i++) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `cb${i}`;
            checkboxContainer.appendChild(checkbox);
        }
        RRow.appendChild(checkboxContainer);

        // Create remove button for RRow
        const removeButton = document.createElement('button');
        removeButton.className = 'removeButton';
        removeButton.textContent = ' - ';
        removeButton.addEventListener('click', function() {
            RRow.remove();  // Remove the entire RRow when clicked
        });
        RRow.appendChild(removeButton);

        // Append the new RRow to the wrapper
        rowsWrapper.appendChild(RRow);

        // Apply event listeners for the new checkboxes
        addCheckboxListeners(checkboxContainer);
    }

    // Add event listeners to checkboxes for chaining logic
    function addCheckboxListeners(checkboxContainer) {
        const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    for (let i = 0; i <= index; i++) {
                        checkboxes[i].checked = true;
                    }
                } else {
                    for (let i = index + 1; i < checkboxes.length; i++) {
                        checkboxes[i].checked = false;
                    }
                }
            });
        });
    }

    // Initialize by creating the first RRow
    createNewRow();

    // Add more RRows when the "Add More" button is clicked
    addButton.addEventListener('click', createNewRow);
});

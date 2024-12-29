const scriptURL = 'https://script.google.com/macros/s/AKfycbyKNA-M2hD05wNDRSmMH70TmK35nEmI4y-2gyyjNRNd0OEOAl6dWJaDlOYdvS0CBgSPSw/exec'
const form = document.forms['vote-form']

// Define the required number of options for each position
const requiredSelections = {
  "catchers in section 1": 3, // Users must select 3 options for catcher (Question 1)
  "first baseman in section 2": 1,
  "infielders in section 3": 8,
  "utility players in section 4": 2,
  "outfielders in section 5": 6,
  "left-handed pitchers in section 6": 5,
  "right-handed pitchers in section 7": 9
};

// Populate player information
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  const playerName = checkbox.value;
  const player = players.find(p => p.name === playerName);
  if (player) {
    const playerInfoDiv = checkbox.parentElement.querySelector('.player-info');
    playerInfoDiv.innerHTML = `
      <h3>${player.year} | ${player.ht} | ${player.hometown}</h3>
      <p><b>Major:</b> ${player.major}</p>
      <p><b>Favorite food:</b> ${player.food}</p>
      <p><b>Interests:</b> ${player.interests}</p>
      <p><b>Fun fact:</b> ${player.funfact}</p>
    `;
  }
});

// Function to update checkbox opacity based on selection limits
function updateCheckboxOpacity(position) {
  const checkboxes = document.querySelectorAll(`input[data-position="${position}"]`);
  const required = requiredSelections[position];
  const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

  checkboxes.forEach(cb => {
    if (selectedCount === required && !cb.checked) {
      cb.parentElement.style.opacity = '0.5'; // Lower opacity for unchecked boxes
      cb.disabled = true; // Optional: Disable unchecked boxes
    } else {
      cb.parentElement.style.opacity = '1'; // Reset opacity
      cb.disabled = false; // Re-enable boxes
    }
  });
}

// Add event listener to all checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const position = checkbox.getAttribute('data-position');
    updateCheckboxOpacity(position); // Update opacity whenever a checkbox is checked/unchecked
  });
});

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Collect all invalid positions
  const invalidPositions = [];

  for (const [position, required] of Object.entries(requiredSelections)) {
    const selectedOptions = document.querySelectorAll(`input[data-position="${position}"]:checked`);
    if (selectedOptions.length !== required) {
      invalidPositions.push(`${required} ${position.replace('position', '')}`);
    }
  }

  if (invalidPositions.length > 0) {
    // Display a single error message listing all invalid positions
    alert(`In order to submit, you must select exactly\n\n${invalidPositions.join('\n')}\n\nPlease ensure you have selected the correct number of players for each section.`);
  } else {
    // Submit the form if all validations pass
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then((response) => alert("Your ballot has been cast. Thanks for participating!"))
      .then(() => { window.location.reload(); })
      .catch((error) => console.error('Error!', error.message));
  }
});
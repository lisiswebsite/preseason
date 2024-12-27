const scriptURL = 'https://script.google.com/macros/s/AKfycbyKNA-M2hD05wNDRSmMH70TmK35nEmI4y-2gyyjNRNd0OEOAl6dWJaDlOYdvS0CBgSPSw/exec'
const form = document.forms['vote-form']

// Define the required number of options for each position
const requiredSelections = {
  position1: 3, // Users must select 3 options for position 1
  position2: 1,
  position3: 8,
  position4: 2,
  position5: 6,
  position6: 5,
  position7: 9
};

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Check selections for each position
  let allValid = true;

  for (const [position, required] of Object.entries(requiredSelections)) {
    const selectedOptions = document.querySelectorAll(`input[data-position="${position}"]:checked`);
    if (selectedOptions.length !== required) {
      alert(`Please select exactly ${required} option(s) for ${position}.`);
      allValid = false;
      break;
    }
  }

  if (allValid) {
    // Submit the form if all validations pass
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then((response) => alert("Thank you! Form is submitted"))
      .then(() => { window.location.reload(); })
      .catch((error) => console.error('Error!', error.message));
  }
});
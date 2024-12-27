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

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Check selections for each position
  let allValid = true;

  for (const [position, required] of Object.entries(requiredSelections)) {
    const selectedOptions = document.querySelectorAll(`input[data-position="${position}"]:checked`);
    if (selectedOptions.length !== required) {
      alert(`Please select exactly ${required} ${position}.`);
      allValid = false;
      break;
    }
  }

  if (allValid) {
    // Submit the form if all validations pass
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then((response) => alert("Your ballot has been cast. Thanks for participating!"))
      .then(() => { window.location.reload(); })
      .catch((error) => console.error('Error!', error.message));
  }
});
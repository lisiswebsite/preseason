const scriptURL = 'https://script.google.com/macros/s/AKfycbyKNA-M2hD05wNDRSmMH70TmK35nEmI4y-2gyyjNRNd0OEOAl6dWJaDlOYdvS0CBgSPSw/exec'

const form = document.forms['vote-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
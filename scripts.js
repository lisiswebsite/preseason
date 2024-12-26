document.getElementById('quizForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    let valid = true;
    let errorMessages = [];
    const questions = [
      { name: 'q1', required: 3 },
      { name: 'q2', required: 1 },
      { name: 'q3', required: 8 },
      { name: 'q4', required: 2 },
      { name: 'q5', required: 6 },
      { name: 'q6', required: 5 },
      { name: 'q7', required: 9 }
    ];
  
    // Validate the form
    questions.forEach(question => {
      const selectedOptions = document.querySelectorAll(`input[name="${question.name}"]:checked`).length;
      if (selectedOptions !== question.required) {
        valid = false;
        errorMessages.push(`Please select exactly ${question.required} options for question ${question.name.slice(1)}`);
      }
    });
  
    if (!valid) {
      alert(errorMessages.join('\n'));
      return;
    }
  
    // Collect form data
    const formData = {};
    questions.forEach(question => {
      formData[question.name] = Array.from(document.querySelectorAll(`input[name="${question.name}"]:checked`))
        .map(input => input.value)
        .join(', ');
    });
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyJQAINK5BJ0zJ-e7G9i7yIFojXe7eR2q_B_Xm_iaCT92V8szu5egNaQFIDBiadRf4/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      if (result.status === "success") {
        alert('Form submitted successfully!');
      } else {
        throw new Error(result.message || 'Unknown error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  });
  
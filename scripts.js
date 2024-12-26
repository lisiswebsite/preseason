document.getElementById('quizForm').addEventListener('submit', function(event) {
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

    const formData = {};

    questions.forEach(question => {
        const selectedOptions = Array.from(document.querySelectorAll(`input[name="${question.name}"]:checked`)).map(input => input.value);
        if (selectedOptions.length !== question.required) {
            valid = false;
            errorMessages.push(`Please select exactly ${question.required} options for question ${question.name.slice(1)}`);
        }
        formData[question.name] = selectedOptions;
    });

    if (!valid) {
        alert(errorMessages.join('\n'));
    } else {
        fetch('https://script.google.com/macros/s/AKfycbzmwuH2dvD1_zeNqiJ0v_wOhBGxPX7mHPpzD1FCn3m5IOzDIz91jUYNFfJ8PSMN0ieu/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'Success') {
                alert('Your responses have been recorded!');
                document.getElementById('quizForm').reset();
            } else {
                alert('There was an error recording your responses. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem submitting your responses.');
        });
    }
});

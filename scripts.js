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

    questions.forEach(question => {
        const selectedOptions = document.querySelectorAll(`input[name="${question.name}"]:checked`).length;
        if (selectedOptions !== question.required) {
            valid = false;
            errorMessages.push(`Please select exactly ${question.required} options for question ${question.name.slice(1)}`);
        }
    });

    if (!valid) {
        alert(errorMessages.join('\n'));
    } else {
        alert('Form submitted successfully!');
        // Submit the form
        document.getElementById('quizForm').submit();
    }
});
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
        const formData = new FormData(document.getElementById('quizForm'));
        const data = {};
        formData.forEach((value, key) => {
            if (!data[key]) {
                data[key] = [];
            }
            data[key].push(value);
        });

        fetch('https://script.google.com/macros/s/AKfycbwla3SwrI3hFDpApFbqHyGwNfV2P6SiHqKViWhalwZiEjlpUCDcylYRE3tse7N3n1Va/exec', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                alert('Form submitted successfully!');
            } else {
                alert('There was an error submitting the form.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    }
});
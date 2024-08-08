// Define an array of questions with options, correct answer index, and image path
const questions = [
    {
        question: "Blind, Deaf & dumb come under which category?",
        options: ["Physically handicapped", "Mentally handicapped", "Socially handicapped", "More than one of the above"],
        correct: 0,
        image: "image1.jpg" // Ensure this path is correct
    },
    {
        question: "Student- Centric Classroom is meant for",
        options: ["engaging the entire class", "recalling the previous knowledge", "addressing individual differences ", "reducing teacher-oriented lectures"],
        correct: 2,
        image: "image2.jpg" // Ensure this path is correct
    },
    {
        question: "In which level of teaching, the learner gets an opportunity to discriminate at length between positive and negative exemplars of concepts?",
        options: ["Understanding level", "Reflective level", "Autonomous development level", "Memory levels"],
        correct: 0,
        image: "image2.jpg"
    },
    {
        question: "Employment of classroom technology needs clarity with regard to: (A) Pedagogical strategies (B) Course content (C) Technological skills (D) Evaluation methods (E) Institutional policies",
        options: ["B, C and D only", "A, D and E only ", "A, B and C only", "C, D and E only"],
        correct: 2,
        image: "image2.jpg"
    },
    {
        question: "'I believe I can solve this problem,' Mariam declared. 'I have successfully tackled similar problems in the past.' Mariam is demonstrating which of the following?",
        options: ["Low self-efficacy", "High levels of empathy ", "High self-esteem ", "High self-efficacy"],
        correct: 3,
        image: "image2.jpg"
    },
    {
        question: "Learning objectives mean",
        options: ["concise outcomes", "intended learning outcomes ", "learning experience ", "academic achievement"],
        correct: 1,
        image: "image2.jpg"
    },
    {
        question: "Which of the following are the most influential factors of learning? (A) Government policy (B) Motivation (C) Aptitude (D) Interest (E) Physical facilities",
        options: ["A, B and C only", "B, C and D only", "C, D and E only ", "A, B and E only"],
        correct: 1,
        image: "image2.jpg"
    },
    {
        question: " Identify the correct sequence of the cycle of self-regulated learning. (A) Setting Goals (B) Monitoring Performance (C) Implementing Strategies (D) Evaluating Outcomes (E) Planning", 
        options: ["E, A, C, B, D ", "A, B, C, D, E ", "D, B, A, E, C ", "E, C, B, A, D"],
        correct: 0,
        image: "image2.jpg"
    },
    {
        question: "What should be the main objective of teaching?",
        options: ["Prepare students to excel in the examinations", "To dictate good notes ", "To enhance thinking power of students ", "Provide required information related to the subject"],
        correct: 2,
        image: "image2.jpg"
    },
    {
        question: "A teacher gives a lot of positive and negative examples in his/her presentations in the classroom. This will be related to which level teaching?",
        options: ["Autonomous development level", "Memory level ", "Reflective level", "Understanding level "],
        correct: 3,
        image: "image2.jpg"
    },
    {
        question: "What does the Play Way method develop in students?",
        options: ["Cognitive, Social and Psychological development", "Cognitive, Emotional and Physical development ", "Physical and Cognitive development ", "Emotional, Psychological and Social development"],
        correct: 1,
        image: "image2.jpg"
    },
    {
        question: "Which one of the following is an indicative of the quality of teaching?",
        options: ["Standard of questions raised by students in the classroom","Period of maintaining peace in the classroom", "Standard of answers replied by students in the classroom", "Pass percentage of the students"],
        correct: 0,
        image: "image2.jpg"
    },
    // Add more questions up to 10
    // ...
];

let currentQuestion = 0; // Track the current question index
let score = 0; // Track the user's score
const maxScorePerQuestion = 20; // Each question is worth 20 marks
const validPassword = 'id'; // Set a valid password for the quiz

// Candidate information
let candidateName = '';
let candidateEmail = '';

// Load the first question when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
    document.body.classList.add('login-page');
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password === validPassword) {
        candidateName = name;
        candidateEmail = email;
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';

        document.body.classList.remove('login-page');
        document.body.classList.add('quiz-page');
        
        loadQuestion();
    } else {
        alert('Invalid password. Please try again.');
    }
}

// Function to load a question
function loadQuestion() {
    const q = questions[currentQuestion]; // Get the current question object
    document.getElementById('question-image').src = q.image; // Set the image source
    document.getElementById('question-text').textContent = q.question; // Set the question text
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options
    q.options.forEach((option, index) => {
        // Create a button for each option
        const button = document.createElement('button');
        button.textContent = option; // Set button text to the option
        button.onclick = () => submitAnswer(index); // Set the click handler
        optionsContainer.appendChild(button); // Add the button to the options container
    });
}

// Function to handle answer submission
function submitAnswer(index) {
    const q = questions[currentQuestion]; // Get the current question object
    const isCorrect = index === q.correct; // Check if the answer is correct
    playSound(isCorrect ? 'ascent-braam-magma-brass-d-cinematic-trailer-sound-effect-222269.mp3' : 'buzzer-or-wrong-answer-20582.mp3'); // Play correct or wrong sound
    if (isCorrect) score += maxScorePerQuestion; // Increment score if correct
    currentQuestion++; // Move to the next question
    if (currentQuestion < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        finishQuiz(); // Finish the quiz if no more questions
    }
}

// Function to play a sound
function playSound(file) {
    const audio = new Audio(file); // Create an audio object
    audio.play(); // Play the audio
}

// Function to finish the quiz
function finishQuiz() {
    // Calculate the percentage score
    const totalPossibleScore = questions.length * maxScorePerQuestion;
    const percentageScore = (score / totalPossibleScore) * 100;
    
    // Display the percentage score as feedback
    const feedbackText = `Finished Assessment. You scored ${percentageScore.toFixed(2)}%.`;
    document.getElementById('feedback-text').textContent = feedbackText;
    document.getElementById('feedback-container').style.display = 'block';

    // Send an email with the result (placeholder for email sending functionality)
    console.log(`Name: ${candidateName}`);
    console.log(`Email: ${candidateEmail}`);
    console.log(`Score: ${percentageScore.toFixed(2)}%`);
}

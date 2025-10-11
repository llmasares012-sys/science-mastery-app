const SHEET_URL = 'YOUR_CURRENT_SHEET_URL_HERE';
const quizData = [
  { question: 'What planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars' },
  { question: 'What gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide' }
];

let current = 0, score = 0, timer, timeLeft = 60;
let answers = new Array(quizData.length).fill(null);

const nameInput = document.getElementById('studentName');
const emailInput = document.getElementById('studentEmail');
const startBtn = document.getElementById('startBtn');
const quizArea = document.getElementById('quizArea');
const quizContainer = document.getElementById('quizContainer');
const nextBtn = document.getElementById('nextBtn');
const timerDisplay = document.getElementById('timer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progress');
const resultArea = document.getElementById('resultArea');
const resultSummary = document.getElementById('resultSummary');
const restartBtn = document.getElementById('restartBtn');

startBtn.onclick = () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  if (!name || !email.endsWith('@gmail.com')) {
    document.getElementById('startStatus').textContent = 'Please enter a valid name and Gmail address.';
    return;
  }
  document.getElementById('intro').classList.add('hidden');
  quizArea.classList.remove('hidden');
  loadQuestion();
};

function loadQuestion() {
  if (current >= quizData.length) {
    const unanswered = answers.findIndex(a => a === null);
    if (unanswered !== -1) { current = unanswered; return loadQuestion(); }
    return finishQuiz();
  }
  const q = quizData[current];
  quizContainer.innerHTML = `<div class='question'><b>Q${current + 1}:</b> ${q.question}</div>` +
    q.options.map(opt => `<label><input type='radio' name='opt' value='${opt}'> ${opt}</label>`).join('');
  nextBtn.disabled = true;
  timeLeft = 60;
  updateTimer();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  document.querySelectorAll('input[name="opt"]').forEach(el => el.onchange = () => nextBtn.disabled = false);
}

function updateTimer() {
  timerDisplay.textContent = `⏱️ ${timeLeft}s remaining`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    answers[current] = null;
    current++;
    loadQuestion();
  }
  timeLeft--;
}

nextBtn.onclick = () => {
  const selected = document.querySelector('input[name="opt"]:checked');
  if (selected) {
    answers[current] = selected.value;
    if (selected.value === quizData[current].answer) score++;
  }
  current++;
  updateProgress();
  loadQuestion();
};

function updateProgress() {
  const answered = answers.filter(a => a !== null).length;
  progressText.textContent = `Answered ${answered}/${quizData.length}`;
  progressFill.style.width = (answered / quizData.length * 100) + '%';
}

function finishQuiz() {
  clearInterval(timer);
  quizArea.classList.add('hidden');
  resultArea.classList.remove('hidden');
  resultSummary.innerHTML = `<p>Score: ${score}/${quizData.length}</p>`;
  sendResults();
}

function sendResults() {
  const payload = { name: nameInput.value, email: emailInput.value, score, answers };
  fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
}

restartBtn.onclick = () => location.reload();
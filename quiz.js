/* quiz.js - Science Mastery App
progressEl.textContent = `Question ${currentIndex+1} of ${questions.length}`;
nextBtn.disabled = true;


const radios = quizContainer.querySelectorAll(`input[name="q${currentIndex}"]`);
radios.forEach(r => r.addEventListener('change', () => { nextBtn.disabled = false; }));


remainingTime = timePerQuestion;
updateTimerDisplay();
timer = setInterval(onTick, 1000);
}


function onTick(){
remainingTime--;
updateTimerDisplay();
if(remainingTime <= 0){
clearInterval(timer);
const sel = document.querySelector(`input[name="q${currentIndex}"]:checked`);
if(sel){
answers[currentIndex] = Number(sel.value);
proceedToNext();
} else {
showToast('Time ran out — you must answer this question. Timer restarted.');
remainingTime = timePerQuestion;
updateTimerDisplay();
timer = setInterval(onTick, 1000);
}
}
}


function updateTimerDisplay(){ timerEl.textContent = `Time left: ${remainingTime}s`; }


function onNext(){
const sel = document.querySelector(`input[name="q${currentIndex}"]:checked`);
if(sel){ answers[currentIndex] = Number(sel.value); } else { showToast('Please select an option before proceeding.'); return; }
proceedToNext();
}


function proceedToNext(){
clearInterval(timer);
currentIndex++;
if(currentIndex < questions.length){ showQuestion(); } else { finishQuiz(); }
}


function finishQuiz(){
clearInterval(timer);
quizArea.classList.add('hidden');
timerEl.textContent = '';
nextBtn.disabled = true;


let score = 0;
let details = '';
questions.forEach((q, i) => {
const userAns = answers[i];
const correct = q.answer;
if(userAns === correct) score++;
const userText = (userAns === null || userAns === -1) ? '<em>No answer</em>' : escapeHtml(q.choices[userAns]);
const correctText = escapeHtml(q.choices[correct]);
const lineClass = (userAns === correct) ? 'correct' : 'wrong';
details += `<div style="margin-bottom:8px"><b>Q${i+1}.</b> ${escapeHtml(q.text)}<br>
<span class="${lineClass}">${userAns === correct ? '✅ Correct' : '❌ Incorrect'}</span>
<div>Your answer: ${userText}</div>
<div>Correct answer: ${correctText}</div>
</div>`;
});


const outHtml = `<p><strong>${escapeHtml(studentName)}</strong>, you scored <strong>${score}</strong> out of ${questions.length}.</p>` + details;
resultSummary.innerHTML = outHtml;
resultArea.classList.remove('hidden');


try {
const payload = { name: studentName, email: studentEmail, score, total: questions.length, answers, timestamp: new Date().toISOString() };
fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(()=>{});
} catch(e){ }
}


/* helpers */
function showToast(msg){ toast.textContent = msg; toast.classList.remove('hidden'); setTimeout(()=>{ toast.classList.add('hidden'); }, 3500); }
function clearToast(){ toast.classList.add('hidden'); toast.textContent = ''; }
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

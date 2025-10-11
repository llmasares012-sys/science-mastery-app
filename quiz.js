/* quiz-updated.js - Science Mastery App (features added)
   - 60-second timer per question
   - Re-ask unanswered questions after the last one
   - Progress bar updates for every question
   - Name and Gmail required
   - Sends results to provided Google Sheets endpoint
*/

// Configuration
const SHEET_URL = "https://script.google.com/macros/s/AKfycbyHBf3TgrhGQSLSAmWsZO25MhIkzEXX6BJkWirwuhYdROulGhTeMH-mWEYqRIMR28x7/exec";
const timePerQuestion = 60; // seconds

/* ---------- QUESTIONS (60 items) ---------- */
const questions = [
  { text: "Who proposed the planetary model of the atom?", choices:["Thomson","Rutherford","Bohr","Dalton"], answer:1 },
  { text: "What major improvement did Bohr introduce to Rutherford’s model?", choices:["Electrons move randomly around the nucleus.","Electrons occupy specific energy levels.","Atoms are indivisible.","The nucleus contains electrons."], answer:1 },
  { text: "Rutherford’s model could not explain:", choices:["The existence of the nucleus","The charge of electrons","The stability of atoms","The discovery of protons"], answer:2 },
  { text: "In Bohr’s model, what happens when an electron jumps to a higher energy level?", choices:["It absorbs energy","It emits energy","It becomes neutral","It splits the atom"], answer:0 },
  { text: "According to Bohr, energy levels are:", choices:["Random and continuous","Fixed and quantized","Constant and variable","Based on neutron count"], answer:1 },
  { text: "The light emitted by excited hydrogen atoms provides evidence for:", choices:["Continuous energy levels","Quantized energy levels","Random electron paths","Proton movement"], answer:1 },
  { text: "Bohr’s model applies best to:", choices:["Multielectron atoms","Hydrogen atom","Carbon atom","Helium atom"], answer:1 },
  { text: "The nucleus was first discovered by:", choices:["Bohr","Rutherford","Thomson","Chadwick"], answer:1 },
  { text: "In Bohr’s model, the closer an electron is to the nucleus, the:", choices:["Higher the energy","Lower the energy","Faster the electron","Greater the radius"], answer:1 },
  { text: "Bohr’s theory introduced the concept of:", choices:["Electron clouds","Energy quantization","Neutron discovery","Isotopes"], answer:1 },
  { text: "Ionic bonds are formed through:", choices:["Sharing of electrons","Transfer of electrons","Overlapping of orbitals","Nuclear fusion"], answer:1 },
  { text: "Covalent bonds are formed when atoms:", choices:["Transfer electrons","Share electrons","Lose neutrons","Gain protons"], answer:1 },
  { text: "The bond between sodium and chlorine is:", choices:["Covalent","Metallic","Ionic","Hydrogen"], answer:2 },
  { text: "Which pair of elements is most likely to form a covalent bond?", choices:["Sodium and chlorine","Hydrogen and oxygen","Magnesium and chlorine","Sodium and fluorine"], answer:1 },
  { text: "Which property is typical of ionic compounds?", choices:["Low melting point","Poor electrical conductivity when molten","High melting point","Soft and flexible"], answer:2 },
  { text: "Which property is typical of covalent compounds?", choices:["High melting point","Good conductor of electricity","Usually gaseous or liquid at room temperature","Formed between metal and nonmetal"], answer:2 },
  { text: "Ionic compounds form between:", choices:["Two nonmetals","Metal and nonmetal","Two metals","Noble gases"], answer:1 },
  { text: "Covalent bonds form between:", choices:["Metals","Nonmetals","Metalloids","Ions"], answer:1 },
  { text: "When an atom loses an electron, it becomes:", choices:["Cation","Anion","Isotope","Radical"], answer:0 },
  { text: "When an atom gains an electron, it becomes:", choices:["Cation","Anion","Molecule","Nucleus"], answer:1 },
  { text: "Which compound has the highest melting point?", choices:["NaCl","H₂O","CO₂","CH₄"], answer:0 },
  { text: "Which compound conducts electricity when dissolved in water?", choices:["CO₂","NaCl","H₂O","CH₄"], answer:1 },
  { text: "Covalent compounds are generally:", choices:["Brittle solids","Hard and crystalline","Poor conductors","Good conductors"], answer:2 },
  { text: "Ionic compounds dissolve in:", choices:["Nonpolar solvents","Polar solvents","Oils","Gasoline"], answer:1 },
  { text: "A compound that has low melting point and poor conductivity is likely:", choices:["Ionic","Covalent","Metallic","Organic"], answer:1 },
  { text: "NaCl is an example of:", choices:["Polar covalent","Ionic compound","Nonpolar covalent","Organic"], answer:1 },
  { text: "Covalent compounds tend to:", choices:["Dissolve in water","Dissolve in organic solvents","Conduct electricity","Be metallic"], answer:1 },
  { text: "Hardness and brittleness are properties of:", choices:["Covalent compounds","Ionic compounds","Metallic compounds","Gaseous molecules"], answer:1 },
  { text: "Electrical conductivity in metals is due to:", choices:["Free electrons","Shared electrons","Ions in solution","Fixed lattice"], answer:0 },
  { text: "Which compound is polar?", choices:["CO₂","CH₄","H₂O","N₂"], answer:2 },
  { text: "An atom becomes positively charged when it:", choices:["Gains protons","Loses electrons","Gains electrons","Loses neutrons"], answer:1 },
  { text: "An atom becomes negatively charged when it:", choices:["Gains electrons","Loses electrons","Gains protons","Gains neutrons"], answer:0 },
  { text: "What are ions?", choices:["Neutral atoms","Atoms with unequal numbers of protons and electrons","Radioactive atoms","Molecules"], answer:1 },
  { text: "Which atom forms a +2 ion?", choices:["Oxygen","Magnesium","Fluorine","Nitrogen"], answer:1 },
  { text: "Which element tends to form a -1 ion?", choices:["Sodium","Fluorine","Magnesium","Aluminum"], answer:1 },
  { text: "The charge of an ion depends on:", choices:["Number of protons lost","Number of electrons lost or gained","Number of neutrons gained","Mass number"], answer:1 },
  { text: "When Na reacts with Cl, Na becomes:", choices:["Na⁺","Na⁻","Cl⁺","Neutral"], answer:0 },
  { text: "In ionic compounds, metals tend to:", choices:["Gain electrons","Lose electrons","Share electrons","Stay neutral"], answer:1 },
  { text: "Nonmetals tend to:", choices:["Lose electrons","Gain electrons","Stay neutral","Form metallic bonds"], answer:1 },
  { text: "Which best describes anions?", choices:["Positively charged","Negatively charged","Neutral","Metallic"], answer:1 },
  { text: "How many valence electrons does carbon have?", choices:["2","4","6","8"], answer:1 },
  { text: "Carbon can form up to how many covalent bonds?", choices:["2","3","4","5"], answer:2 },
  { text: "Carbon forms stable compounds because:", choices:["It can gain 4 electrons","It can share 4 electrons","It has a full shell","It loses 2 electrons"], answer:1 },
  { text: "The ability of carbon to form chains is called:", choices:["Polymerization","Isomerism","Catenation","Bonding"], answer:2 },
  { text: "The simplest organic compound is:", choices:["Methane","Ethane","Ethanol","Butane"], answer:0 },
  { text: "Carbon atoms can form:", choices:["Only single bonds","Single, double, and triple bonds","Only double bonds","Only ionic bonds"], answer:1 },
  { text: "The property that allows carbon to form many compounds is:", choices:["Electronegativity","Catenation","Ionization","Polarization"], answer:1 },
  { text: "Organic compounds primarily contain:", choices:["Carbon and hydrogen","Carbon and sodium","Carbon and oxygen only","Metals"], answer:0 },
  { text: "Carbon compounds that contain only hydrogen and carbon are called:", choices:["Alcohols","Hydrocarbons","Esters","Ketones"], answer:1 },
  { text: "The carbon atom is versatile due to its:", choices:["High mass","Small size and four valence electrons","Ionic bonding","Metallic nature"], answer:1 },
  { text: "Alcohols contain which functional group?", choices:["–COOH","–OH","–CHO","–NH₂"], answer:1 },
  { text: "Which organic compound is used as fuel?", choices:["Methane","Glucose","Acetic acid","Propanol"], answer:0 },
  { text: "Which compound is a carboxylic acid?", choices:["CH₃OH","CH₃COOH","CH₄","C₂H₆"], answer:1 },
  { text: "Esters are commonly used in:", choices:["Fuels","Perfumes","Plastics","Medicines"], answer:1 },
  { text: "Which compound is an aldehyde?", choices:["CH₃CHO","CH₃OH","CH₃COOH","CH₃CH₂NH₂"], answer:0 },
  { text: "Amines are organic compounds that contain:", choices:["Oxygen","Nitrogen","Sulfur","Phosphorus"], answer:1 },
  { text: "Which compound is used as a solvent?", choices:["Ethanol","Acetic acid","Methane","Propane"], answer:0 },
  { text: "Organic compounds in plastics are usually:", choices:["Alkanes","Polymers","Esters","Ketones"], answer:1 },
  { text: "Glucose is an example of:", choices:["Carbohydrate","Lipid","Protein","Hydrocarbon"], answer:0 },
  { text: "Which class of compounds makes up body fats?", choices:["Carbohydrates","Proteins","Lipids","Alcohols"], answer:2 }
];

/* ---------- STATE ---------- */
let currentIndex = 0;
let answers = Array(questions.length).fill(null); // store selected indices (0..3)
let timer = null;
let remainingTime = timePerQuestion;
let studentName = "";
let studentEmail = "";
let unansweredQueue = []; // indices of questions unanswered due to timeout
let passStage = 'initial'; // 'initial' or 'retry'
let order = [...Array(questions.length).keys()]; // order of indices to ask

/* ---------- UI refs ---------- */
const introEl = document.getElementById('intro');
const startBtn = document.getElementById('startBtn');
const startStatus = document.getElementById('startStatus');
const quizArea = document.getElementById('quizArea');
const quizContainer = document.getElementById('quizContainer');
const timerEl = document.getElementById('timer');
const nextBtn = document.getElementById('nextBtn');
const toast = document.getElementById('toast');
const progressEl = document.getElementById('progress');
const resultArea = document.getElementById('resultArea');
const resultSummary = document.getElementById('resultSummary');
const progressBar = document.getElementById('progressBar');

/* ---------- Events ---------- */
startBtn.addEventListener('click', onStart);
nextBtn.addEventListener('click', onNext);

/* ---------- Functions ---------- */
function onStart(){
  const nameInput = document.getElementById('studentName').value.trim();
  const emailInput = document.getElementById('studentEmail').value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if(!nameInput){ startStatus.textContent = 'Please enter your name.'; return; }
  if(!emailRegex.test(emailInput)){ startStatus.textContent = 'Please enter a valid Gmail address (must end with @gmail.com).'; return; }

  studentName = nameInput;
  studentEmail = emailInput;

  introEl.classList.add('hidden');
  quizArea.classList.remove('hidden');
  resultArea.classList.add('hidden');

  // reset state
  currentIndex = 0;
  answers = Array(questions.length).fill(null);
  unansweredQueue = [];
  passStage = 'initial';
  order = [...Array(questions.length).keys()];

  showQuestion();
}

function showQuestion(){
  clearToast();
  clearInterval(timer);

  if(currentIndex >= order.length){
    // finished this pass
    if(passStage === 'initial' && unansweredQueue.length > 0){
      // start retry pass
      passStage = 'retry';
      order = Array.from(new Set(unansweredQueue));
      unansweredQueue = [];
      currentIndex = 0;
    } else {
      // completed all
      finishQuiz();
      return;
    }
  }

  const qIndex = order[currentIndex];
  const q = questions[qIndex];

  quizContainer.innerHTML = '';
  const qWrap = document.createElement('div');
  qWrap.className = 'question';
  qWrap.innerHTML = `<p><strong>Q${qIndex+1}.</strong> ${escapeHtml(q.text)}</p>`;

  const optsDiv = document.createElement('div');
  optsDiv.className = 'options';
  q.choices.forEach((c, j) => {
    const id = `q${qIndex}_opt${j}`;
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="q${qIndex}" value="${j}" id="${id}"> ${escapeHtml(c)}`;
    optsDiv.appendChild(label);
  });
  qWrap.appendChild(optsDiv);
  quizContainer.appendChild(qWrap);

  // progress text and bar: count answered so far
  updateProgressUI();

  // Next disabled until selection
  nextBtn.disabled = true;

  const radios = quizContainer.querySelectorAll(`input[name="q${qIndex}"]`);
  radios.forEach(r => r.addEventListener('change', () => { nextBtn.disabled = false; }));

  // start timer for this question
  remainingTime = timePerQuestion;
  updateTimerDisplay();
  timer = setInterval(() => onTick(qIndex), 1000);
}

function onTick(qIndex){
  remainingTime--;
  updateTimerDisplay();
  if(remainingTime <= 0){
    clearInterval(timer);
    const sel = document.querySelector(`input[name="q${qIndex}"]:checked`);
    if(sel){
      // user answered exactly as timer expired
      answers[qIndex] = Number(sel.value);
      moveNext();
    } else {
      // mark unanswered for retry
      if(!unansweredQueue.includes(qIndex)) unansweredQueue.push(qIndex);
      showToast('Time ran out — this question will be re-asked later.');
      moveNext();
    }
  }
}

function updateTimerDisplay(){ timerEl.textContent = `Time left: ${remainingTime}s`; }

function onNext(){
  const qIndex = order[currentIndex];
  const sel = document.querySelector(`input[name="q${qIndex}"]:checked`);
  if(sel){ answers[qIndex] = Number(sel.value); } else { showToast('Please select an option before proceeding.'); return; }
  moveNext();
}

function moveNext(){
  clearInterval(timer);
  currentIndex++;
  showQuestion();
}

function updateProgressUI(){
  const answeredCount = answers.filter(a => a !== null).length;
  const pct = Math.round((answeredCount / questions.length) * 100);
  progressEl.textContent = `${answeredCount} / ${questions.length} answered`;
  if(progressBar) progressBar.style.width = `${pct}%`;
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

  const outHtml = `<p><strong>${escapeHtml(studentName)}</strong>, you scored <strong>${score}</strong> out of ${questions.length} (${Math.round((score/questions.length)*100)}%).</p>` + details;
  resultSummary.innerHTML = outHtml;
  resultArea.classList.remove('hidden');

  // send to Google Sheets endpoint (best-effort)
  const payload = {
    name: studentName,
    email: studentEmail,
    score,
    total: questions.length,
    percentage: Math.round((score/questions.length)*100),
    answers,
    timestamp: new Date().toISOString()
  };

  // Use no-cors; the endpoint should accept POST JSON
  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(() => { /* ignore network errors */ });
}

/* helpers */
function showToast(msg){ toast.textContent = msg; toast.classList.remove('hidden'); setTimeout(()=>{ toast.classList.add('hidden'); }, 3500); }
function clearToast(){ toast.classList.add('hidden'); toast.textContent = ''; }
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }


/* helpers */
function showToast(msg){ toast.textContent = msg; toast.classList.remove('hidden'); setTimeout(()=>{ toast.classList.add('hidden'); }, 3500); }
function clearToast(){ toast.classList.add('hidden'); toast.textContent = ''; }
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

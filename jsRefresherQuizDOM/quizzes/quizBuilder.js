// quizzes/quizBuilder.js
// Reusable quiz builder that renders a full DOM quiz UI into a provided container.
// Module contract:
//   export function buildQuiz({ container, setStatus, log, title, questions })
// Returns a Promise that resolves to a result object when the quiz completes.

// Important: the builder does not fetch questions; it expects the questions array
// to be provided by the caller (main.js). This keeps the builder generic.

export function buildQuiz({ container, setStatus = () => {}, log = () => {}, title = 'Quiz', questions = [] }) {
  // Clear container and set initial status
  container.innerHTML = '';
  setStatus(`${title}: preparing questions...`);
  log(`${title}: builder started with ${questions.length} questions`);

  // Create UI elements
  const header = document.createElement('div');
  header.className = 'quiz-header';

  const h = document.createElement('h2');
  h.className = 'quiz-title';
  h.textContent = title;

  const endBtn = document.createElement('button');
  endBtn.textContent = 'End Quiz';
  endBtn.className = 'small';

  header.appendChild(h);
  header.appendChild(endBtn);

  const list = document.createElement('div');
  list.className = 'question-list';

  const inputRow = document.createElement('div');
  inputRow.className = 'controls-row';

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.placeholder = 'Type your answer here (case-sensitive)';
  inputEl.autocomplete = 'off';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.className = 'small';

  inputRow.appendChild(inputEl);
  inputRow.appendChild(submitBtn);

  // Create question display area inside the container
  const questionArea = document.createElement('div');
  questionArea.id = 'current-question';
  questionArea.className = 'current-question';
  questionArea.setAttribute('aria-live', 'polite');

  container.appendChild(header);
  container.appendChild(list);
  container.appendChild(questionArea);
  container.appendChild(inputRow);

  // Ensure container is visible in the page
  const host = document.getElementById('quiz-container');
  if (host && host !== container) {
    host.innerHTML = '';
    host.appendChild(container);
  } else if (!host) {
    // if no #quiz-container exists, append to body (fallback)
    document.body.appendChild(container);
  }

  // Internal state
  let index = 0;
  let correct = 0;
  let endedByUser = false;

  // Helper to escape user content for safe insertion into innerHTML
  function escapeHtml(s) {
    return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function appendHistoryItem(q, given, wasCorrect) {
    const item = document.createElement('div');
    item.className = 'question-item';

    const promptP = document.createElement('div');
    promptP.className = 'question-prompt';
    promptP.textContent = `Q${q.id}: ${q.prompt}`;

    const meta = document.createElement('div');
    meta.className = 'question-meta';
    meta.innerHTML = `Your answer: <strong class="${wasCorrect ? 'correct' : 'incorrect'}">${escapeHtml(given)}</strong> — Expected: <strong>${escapeHtml(q.answer)}</strong>`;

    const explain = document.createElement('div');
    explain.className = 'question-meta';
    explain.textContent = q.explanation ?? '';

    item.appendChild(promptP);
    item.appendChild(meta);
    item.appendChild(explain);

    list.appendChild(item);
  }

  function renderQuestion() {
    const q = questions[index];
    
    inputEl.value = '';
    inputEl.focus();
    setStatus(`${title} — Question ${index + 1} of ${questions.length}`);
    
    if (questionArea && q) {
      questionArea.textContent = `Q${q.id}: ${q.prompt}`;
      questionArea.style.display = 'block';
    }
  }

  async function handleSubmit() {
    if (endedByUser) return;

    const q = questions[index];
    if (!q) return;

    const reply = inputEl.value ?? '';
    const normalized = reply.trim();

    const isCorrect = normalized === q.answer;

    appendHistoryItem(q, normalized, isCorrect);
    log(`${title} Q${q.id} answer: "${normalized}" — ${isCorrect ? 'correct' : 'incorrect'}`);

    if (isCorrect) correct++;
    
    // Auto-scroll to bottom after each answer
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);

    index += 1;
    if (index >= questions.length || endedByUser) {
      const scorePct = Math.round((correct / questions.length) * 100);
      setStatus(`${title} finished: ${correct}/${questions.length} (${scorePct}%)`);
      log(`${title} complete. Score: ${correct}/${questions.length} (${scorePct}%)`);

      submitBtn.removeEventListener('click', handleSubmit);
      inputEl.removeEventListener('keydown', onKeyDown);
      endBtn.removeEventListener('click', onEnd);

      // Hide question area and append done message
      if (questionArea) {
        questionArea.style.display = 'none';
      }
      
      const done = document.createElement('div');
      done.className = 'question-meta';
      done.textContent = `Quiz complete. Score: ${correct}/${questions.length} (${scorePct}%).`;
      list.appendChild(done);

      // Resolve result object
      return { quiz: title, correct, total: questions.length, score: scorePct, cancelled: !!endedByUser };
    } else {
      renderQuestion();
      // return nothing now; caller will wait on returned promise below
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  function onEnd() {
    endedByUser = true;
    setStatus(`${title}: ended by user`);
    if (questionArea) {
      questionArea.style.display = 'none';
    }
  }

  // Wire events
  submitBtn.addEventListener('click', handleSubmit);
  inputEl.addEventListener('keydown', onKeyDown);
  endBtn.addEventListener('click', onEnd);

  // Start UI
  renderQuestion();

  // Return a promise that resolves when quiz finishes; poll state.
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (index >= questions.length || endedByUser) {
        clearInterval(interval);
        const scorePct = Math.round((correct / questions.length) * 100);
        resolve({ quiz: title, correct, total: questions.length, score: scorePct, cancelled: !!endedByUser });
      }
    }, 120);
  });
}
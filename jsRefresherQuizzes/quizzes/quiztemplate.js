// quizzes/quiz1-import-export.js
// Quiz module for "Imports & Exports"
// Export an async function named startQuiz so main.js can import and run it.

/*
  Module contract:
  export async function startQuiz(helpers = {}) { ... }
  OR
  export default async function startQuiz(helpers = {}) { ... }

  helpers: { setStatus, log } - optional functions passed from main.js
*/

export async function startQuiz(helpers = {}) {
  const { setStatus = () => {}, log = () => {} } = helpers;

  setStatus('Quiz1: preparing questions...');
  log('Quiz1 started: Imports & Exports');

  // Questions array: array of objects
  const questions = [
    {
      id: 1,
      prompt: 'Fill the keyword used before a declaration to make it a named export:',
      answer: 'export',
      explanation: 'Use export before declarations: export let apiKey = "..."'
    },
    // duplicate or add more questions here...
  ];

  let correct = 0;
  for (const q of questions) {
    setStatus(`Question ${q.id} of ${questions.length}`);
    // Use prompt() for simplicity; consider replacing with DOM inputs later
    const reply = prompt(`Q${q.id}: ${q.prompt}`);
    if (reply === null) { // user cancelled
      setStatus('Quiz cancelled by user.');
      log('User cancelled the quiz.');
      return { cancelled: true, correct, total: questions.length };
    }
    if (reply.trim() === q.answer) {
      alert('Correct! ' + q.explanation);
      correct++;
    } else {
      alert(`Incorrect. Expected "${q.answer}". ${q.explanation}`);
    }
    log(`Q${q.id} answer: ${reply}`);
  }

  const scorePct = Math.round((correct / questions.length) * 100);
  setStatus(`Completed quiz: ${scorePct}%`);
  log(`Quiz1 finished. Score: ${correct}/${questions.length} (${scorePct}%)`);

  // Return result for main.js to render/store
  return { quiz: 'imports-exports', correct, total: questions.length, score: scorePct };
}
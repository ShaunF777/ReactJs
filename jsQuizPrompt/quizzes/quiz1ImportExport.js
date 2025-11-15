// quizzes/quiz1-import-export.js
// Quiz module for "Imports & Exports"
// Export an async function named startQuiz so main.js can import and run it.

/*
  Module contract: main.js calls this function and passes UI helper functions
  helpers parameter receives: { setStatus, log } from main.js
  These are the actual functions that update the page status and console output
*/

export async function startQuiz(helpers = {}) {
  // Destructuring: extract setStatus and log from helpers object
  // If helpers is empty, use dummy functions () => {} as fallbacks
  const { setStatus = () => {}, log = () => {} } = helpers;
/**This extracts setStatus and log from the helpers object that main.js passed in. If helpers is empty, it uses dummy functions () => {} as fallbacks.
The flow: main.js calls: start({ setStatus, log }) - sends functions TO the quiz
Quiz receives: helpers = { setStatus, log } - gets the functions FROM main.js
Quiz extracts: const { setStatus, log } = helpers - unpacks them for use */
  setStatus('Quiz1: preparing questions...');
  log('Quiz1 started: Imports & Exports');

  // Questions array: array of objects
  const questions = [
    {
    id: 1,
    prompt:
      'To make a named variable or function available to other files you put a keyword before its declaration. Fill the single word keyword (example: "let", "const" are NOT correct):',
    answer: 'export',
    explanation:
      'Named exports use the export keyword before a declaration, e.g. export let apiKey = "..." ;'
  },
  {
    id: 2,
    prompt:
      'To export a single default value from a file you use two words. Fill the two-word phrase exactly (lowercase, space separated):',
    answer: 'export default',
    explanation:
      'Default exports use export default value;. Only one default per file.'
  },
  {
    id: 3,
    prompt:
      'When importing named exports you put the exported names inside these two characters. Type the two-character string (no spaces):',
    answer: '{}',
    explanation:
      'Named imports use curly braces: import { apiKey } from "./util.js";'
  },
  {
    id: 4,
    prompt:
      'When importing a default export you do NOT use the characters from question 3. You import the default using a single identifier. Type the single word that is used in example: import ____ from "./util.js"; (the correct reply is the placeholder word used in the import statement):',
    answer: 'apiKey',
    explanation:
      'Default imports are written like: import apiKey from "./util.js"; You may name it anything.'
  },
  {
    id: 5,
    prompt:
      'To import every named export from a module into one object you use this pattern: import * as ____ from "./util.js"; Fill the single identifier used as the aggregated object:',
    answer: 'utils',
    explanation:
      'import * as utils from "./util.js"; then access exports as utils.apiKey; default is utils.default.'
  },
  {
    id: 6,
    prompt:
      'To rename an imported binding when importing a named export you use a two-letter keyword between the original name and the local name. Type that keyword (lowercase):',
    answer: 'as',
    explanation:
      'Use import { abc as content } from "./util.js"; to alias abc to content locally.'
  },
  {
    id: 7,
    prompt:
      'In vanilla browser JavaScript you must include this attribute on the script tag to enable import/export. Fill the attribute value (exact string):',
    answer: 'module',
    explanation:
      'Use <script type="module" src="app.js"></script> so the browser treats the script as an ES module.'
  },
  {
    id: 8,
    prompt:
      'When importing from a plain .js file in vanilla JavaScript you typically must include this part of the path that is sometimes omitted in React builds. Fill the extension including the dot (example: .ts is NOT correct):',
    answer: '.js',
    explanation:
      'In vanilla JS you normally import with the extension: import { foo } from "./util.js"; build tools often let React omit it.'
  },
  {
    id: 9,
    prompt:
      'A single file can export both a default and multiple named exports. Type the word that must be unique (single allowed per file) when exporting the main export (one word):',
    answer: 'default',
    explanation:
      'Only one default export is allowed per file; named exports can be many.'
  }
  ];

  let correct = 0; // Track number of correct answers
  
  // Loop through each question object in the questions array
  for (const q of questions) {
    // Update page status to show current question progress
    setStatus(`Question ${q.id} of ${questions.length}`);
    
    // Show browser prompt dialog with the question text
    const reply = prompt(`Q${q.id}: ${q.prompt}`);
    
    // Check if user clicked Cancel (prompt returns null)
    if (reply === null) {
      setStatus('Quiz cancelled by user.');
      log('User cancelled the quiz.');
      return { cancelled: true, correct, total: questions.length };
    }
    
    // Compare user's answer (trimmed) with correct answer
    if (reply.trim() === q.answer) {
      alert('Correct! ' + q.explanation);
      correct++; // Increment score
    } else {
      alert(`Incorrect. Expected "${q.answer}". ${q.explanation}`);
    }
    
    // Log the user's answer to the console output
    log(`Q${q.id} answer: ${reply}`);
  }

  const scorePct = Math.round((correct / questions.length) * 100);
  setStatus(`Completed quiz: ${scorePct}%`);
  log(`Quiz1 finished. Score: ${correct}/${questions.length} (${scorePct}%)`);

  // Return result for main.js to render/store
  return { quiz: 'imports-exports', correct, total: questions.length, score: scorePct };
}

/**The for loop breakdown:
for (const q of questions) - loops through each question object
prompt() shows a browser dialog and waits for user input
reply === null means user clicked Cancel
reply.trim() === q.answer compares user's answer (with whitespace removed)
correct++ increments the score counter
log() records the answer to the console output
The quiz module uses the functions main.js gave it to update the page while running! */
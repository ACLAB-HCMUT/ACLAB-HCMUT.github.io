// Interactive credential prompt.
//
// The password is NEVER echoed, stored, logged, or read from CLI args / env.
// - Interactive TTY: hidden character-by-character input (works on Windows
//   PowerShell, macOS, Linux).
// - Non-TTY (piped stdin): reads lines in order — for automation/bootstrap and
//   review pipelines only. Still never written anywhere.
//
// Username is not secret; it defaults to "aclab" and may be overridden with
// `--user <name>`.

import readline from 'node:readline';
import {DEFAULT_USERNAME} from './format.mjs';

export function getUsernameFromArgs(argv = process.argv) {
  const i = argv.indexOf('--user');
  if (i !== -1 && argv[i + 1]) return argv[i + 1];
  return DEFAULT_USERNAME;
}

function readHiddenLine(promptText) {
  return new Promise((resolve, reject) => {
    const {stdin, stdout} = process;
    stdout.write(promptText);
    let value = '';
    const onData = (chunk) => {
      const s = chunk.toString('utf8');
      for (const ch of s) {
        if (ch === '\n' || ch === '\r') {
          cleanup();
          stdout.write('\n');
          return resolve(value);
        }
        if (ch === '') {
          // Ctrl-C
          cleanup();
          stdout.write('\n');
          return reject(new Error('Aborted.'));
        }
        if (ch === '' || ch === '\b') {
          value = value.slice(0, -1);
        } else {
          value += ch;
        }
      }
    };
    const cleanup = () => {
      stdin.removeListener('data', onData);
      if (stdin.isTTY) stdin.setRawMode(false);
      stdin.pause();
    };
    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.on('data', onData);
  });
}

// Buffered reader for non-TTY (piped) stdin — one resolved line at a time.
let pipedLines = null;
let pipedIdx = 0;
function readPipedLine() {
  return new Promise((resolve) => {
    if (pipedLines) return resolve(pipedLines[pipedIdx++] ?? '');
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => (data += c));
    process.stdin.on('end', () => {
      pipedLines = data.split(/\r?\n/);
      resolve(pipedLines[pipedIdx++] ?? '');
    });
    process.stdin.resume();
  });
}

async function hidden(promptText) {
  if (process.stdin.isTTY) return readHiddenLine(promptText);
  return readPipedLine();
}

/** Prompt for the password once. */
export async function askPassword(label = 'Enter documentation password: ') {
  const pw = await hidden(label);
  if (!pw) throw new Error('No password provided.');
  return pw;
}

/** Prompt for the password twice and require a match (used before encrypting). */
export async function askPasswordConfirmed() {
  const pw = await askPassword('Enter documentation password: ');
  const confirm = await hidden('Confirm documentation password: ');
  if (pw !== confirm) throw new Error('Passwords do not match.');
  return pw;
}

/** Yes/no confirmation (visible). Defaults to no. */
export function askYesNo(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`${question} [y/N] `, (a) => {
      rl.close();
      resolve(/^y(es)?$/i.test(a.trim()));
    });
  });
}

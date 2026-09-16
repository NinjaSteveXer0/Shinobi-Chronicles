#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const apiKey = process.env.OPENAI_API_KEY || '';
const model = process.env.OPENAI_REVIEW_MODEL || 'gpt-5.6-luna';
const base = process.env.SC_REVIEW_BASE || '';
const head = process.env.SC_REVIEW_HEAD || '';
const maxDiffChars = Number.parseInt(process.env.SC_REVIEW_MAX_DIFF_CHARS || '90000', 10);
const outputPath = process.env.SC_REVIEW_OUTPUT || 'sc-ai-review.md';

function fail(message) {
  console.error(`[sc-ai-review] ${message}`);
  process.exit(1);
}

if (!apiKey) fail('OPENAI_API_KEY is not available to this workflow.');
if (!/^[0-9a-f]{40}$/i.test(base)) fail(`Invalid or unresolved SC_REVIEW_BASE: ${base || '(empty)'}`);
if (!/^[0-9a-f]{40}$/i.test(head)) fail(`Invalid or unresolved SC_REVIEW_HEAD: ${head || '(empty)'}`);
if (!Number.isFinite(maxDiffChars) || maxDiffChars < 10000 || maxDiffChars > 250000) {
  fail('SC_REVIEW_MAX_DIFF_CHARS must be between 10000 and 250000.');
}

function git(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function readIfExists(file, maxChars = 14000) {
  if (!fs.existsSync(file)) return '';
  const text = fs.readFileSync(file, 'utf8');
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[AUTHORITY EXCERPT TRUNCATED AFTER ${maxChars} CHARACTERS]`;
}

function extractResponseText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if ((content?.type === 'output_text' || content?.type === 'text') && typeof content.text === 'string') {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join('\n').trim();
}

function safeApiError(data, status) {
  const message = data?.error?.message || data?.message || `HTTP ${status}`;
  const code = data?.error?.code || data?.error?.type || 'unknown_error';
  return `${message} [${code}]`;
}

let changedFiles;
let fullDiff;
try {
  changedFiles = git(['diff', '--name-only', base, head]).trim().split('\n').filter(Boolean);
  fullDiff = git(['diff', '--no-ext-diff', '--unified=35', base, head, '--']);
} catch (error) {
  fail(`Could not build git diff for ${base}..${head}: ${error.message}`);
}

if (changedFiles.length === 0) {
  fail(`No changed files found between ${base} and ${head}.`);
}

const diffTruncated = fullDiff.length > maxDiffChars;
const diff = diffTruncated
  ? `${fullDiff.slice(0, maxDiffChars)}\n\n[DIFF TRUNCATED AFTER ${maxDiffChars} CHARACTERS]`
  : fullDiff;

const authorityCandidates = [
  'Documentation/Coordination/SC_AI_Architecture_and_Contract_Reviewer_v1_2026-09-16.md',
  'Documentation/Coordination/Coding_Runtime_Durable_Checkpoint_Timeout_Recovery_and_Legacy_Code_Retirement_Protocol_2026-09-15.md',
  'Documentation/Coordination/Coding_Runtime_Context_Health_Soft_Rotation_and_GitHub_Recoverable_Handoff_Protocol_2026-09-16.md',
];

const storyTouched = changedFiles.some((file) =>
  file.startsWith('runtime/') ||
  file.startsWith('game') ||
  file.includes('Story') ||
  file.includes('Origin') ||
  file.includes('Battle')
);

if (storyTouched) {
  authorityCandidates.push(
    'Documentation/Coordination/Neutral Story Decision Realisation Runtime Contract 2026-09-14.md',
    'Documentation/Coordination/Neutral Story Factual Resolver Provider and Stable Outcome Selection Contract 2026-09-15.md',
    'Documentation/Coordination/Participant First Story Autonomy Runtime Ordering and Battle Boundary Contract 2026-09-15.md'
  );
}

const authoritySections = [];
for (const file of authorityCandidates) {
  const excerpt = readIfExists(file, file.includes('SC_AI_Architecture') ? 22000 : 10000);
  if (excerpt) {
    authoritySections.push(`\n--- AUTHORITY: ${file} ---\n${excerpt}`);
  }
}

const SYSTEM_INSTRUCTIONS = `You are the Shinobi Chronicles Architecture & Contract Reviewer.

Your role is REVIEW ONLY. You do not author new game semantics, fill authority gaps, or pretend that uncertain behavior is closed.

Use only the supplied diff and durable authority excerpts. If they are insufficient, say AUTHORITY GAP / NEEDS OWNER REVIEW.

Prioritize production-critical findings over generic style commentary. Look specifically for:
- a new override/patch layer where an existing canonical owner should be changed;
- superseded code remaining actively loaded without a documented compatibility reason;
- duplicated semantic ownership;
- Story/UI wording being treated as resolver authority;
- presentation code manufacturing semantic state;
- Battle victory being collapsed into death, custody, Story success, reward, Promotion, ownership or progression;
- ownership/assignment/deployment collapse;
- PL/Rank/Acquisition being collapsed into Progression;
- factual result reroll or non-idempotent history;
- participant presence being collapsed into command/ownership;
- validation claims exceeding their actual evidence level;
- secrets/API credentials being exposed.

Do not call a normal temporary guard or compatibility shim a defect merely because it exists. Flag it when the diff extends it without an explicit retirement condition or creates competing ownership.

Return concise Markdown in exactly this top-level structure:
VERDICT: PASS | WARNING | BLOCKING_CONTRADICTION

## ARCHITECTURE
## SEMANTIC CONTRACT
## VALIDATION CLAIMS
## LEGACY / LAYERING
## SECURITY / SECRET HANDLING
## RECOMMENDED ACTION
## EVIDENCE

For EVIDENCE, cite changed repository paths and concrete changed behavior. Do not invent line numbers you cannot see. If the diff was truncated, explicitly state that review coverage is partial.`;

const packet = `REPOSITORY: NinjaSteveXer0/Shinobi-Chronicles
BASE SHA: ${base}
HEAD SHA: ${head}
MODEL REQUESTED: ${model}
DIFF TRUNCATED: ${diffTruncated ? 'YES' : 'NO'}

CHANGED FILES (${changedFiles.length}):
${changedFiles.map((file) => `- ${file}`).join('\n')}

DURABLE AUTHORITY EXCERPTS:
${authoritySections.length ? authoritySections.join('\n') : '[No optional authority excerpts found beyond the embedded review instructions.]'}

--- GIT DIFF ---
${diff}`;

console.log(`[sc-ai-review] Reviewing ${changedFiles.length} changed file(s).`);
console.log(`[sc-ai-review] Base: ${base}`);
console.log(`[sc-ai-review] Head: ${head}`);
console.log(`[sc-ai-review] Model: ${model}`);
console.log(`[sc-ai-review] Diff chars supplied: ${diff.length}${diffTruncated ? ' (TRUNCATED)' : ''}`);

let response;
try {
  response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions: SYSTEM_INSTRUCTIONS,
      input: packet,
      max_output_tokens: 2800,
    }),
  });
} catch (error) {
  fail(`OpenAI request failed before a response was received: ${error.message}`);
}

let data;
try {
  data = await response.json();
} catch {
  fail(`OpenAI returned a non-JSON response with HTTP ${response.status}.`);
}

if (!response.ok) {
  fail(`OpenAI API rejected the review request: ${safeApiError(data, response.status)}`);
}

const review = extractResponseText(data);
if (!review) {
  fail('OpenAI response contained no readable output_text.');
}

const usage = data?.usage
  ? `Input tokens: ${data.usage.input_tokens ?? 'unknown'} | Output tokens: ${data.usage.output_tokens ?? 'unknown'} | Total: ${data.usage.total_tokens ?? 'unknown'}`
  : 'Token usage not reported by API response.';

const rendered = `# SC AI Architecture & Contract Review\n\n` +
  `**Base:** \`${base}\`  \n` +
  `**Head:** \`${head}\`  \n` +
  `**Model:** \`${model}\`  \n` +
  `**Diff truncated:** ${diffTruncated ? 'YES — partial review coverage' : 'NO'}  \n` +
  `**Usage:** ${usage}\n\n` +
  `> Advisory evidence only. This review does not replace SC/CE specialist authority and does not establish browser/Golden status.\n\n` +
  `${review}\n`;

fs.writeFileSync(outputPath, rendered, 'utf8');
console.log(`[sc-ai-review] Review written to ${outputPath}`);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  fs.appendFileSync(summaryPath, `${rendered}\n`, 'utf8');
  console.log('[sc-ai-review] Review appended to GitHub job summary.');
}
